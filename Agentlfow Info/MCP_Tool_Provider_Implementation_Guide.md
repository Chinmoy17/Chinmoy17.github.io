# MCP Tool Provider Implementation Guide

**Date:** January 7, 2026  
**Purpose:** Enable LLMs to dynamically discover and use backend services as "rentable tools"  
**Concept:** Tool Rental Marketplace - LLMs discover capabilities at runtime without hard-coding

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Implementation](#core-implementation)
3. [Wrapping Existing Services](#wrapping-existing-services)
4. [Integrating with Chat/LLM](#integrating-with-chatllm)
5. [Testing](#testing)
6. [Future Extensions](#future-extensions)

---

## Architecture Overview

### The Problem We're Solving

Traditional approach:
- LLM needs web search → Hard-code Serper API call
- LLM needs email → Hard-code EmailService call
- LLM needs database → Hard-code DB queries
- **Result:** Tight coupling, no flexibility

MCP Tool Provider approach:
- LLM asks "what tools are available?" → Discovers `web_search`, `send_email`, `query_database`
- LLM needs capability → Calls generic tool endpoint
- Backend routes to appropriate service
- **Result:** Loose coupling, dynamic capabilities

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    LLM (GPT-4, Claude, etc)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              GET /api/v1/mcp/tools/list                     │
│              Returns: [web_search, send_email, ...]         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              POST /api/v1/mcp/tools/call                    │
│              Body: {tool_name, arguments}                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   MCPToolProvider                           │
│  - Maintains tool registry                                  │
│  - Routes tool calls to services                            │
│  - Returns standardized responses                           │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬──────────────┐
         ▼               ▼               ▼              ▼
    SerperService   EmailService   RAGService   CustomService
```

---

## Core Implementation

### Step 1: Create MCPToolProvider Service

**File:** `app/services/mcp_tool_provider.py`

```python
"""
MCP Tool Provider - Exposes backend services as discoverable tools
"""
from typing import Dict, List, Any, Optional
from app.core.logging import get_logger
from app.services.serper_service import SerperService
from app.services.email_service import EmailService
from app.templates.rag_sharepoint import SharePointRAGService
# Add other services as needed

logger = get_logger()


class MCPToolProvider:
    """
    Central registry and router for MCP tools.
    Each backend service is wrapped as a discoverable tool.
    """
    
    def __init__(self):
        """Initialize tool provider with service instances."""
        self.serper_service = SerperService()
        self.email_service = EmailService()
        self.rag_service = None  # Lazy load
        # Add other services here
        
        logger.info("MCP Tool Provider initialized")
    
    def list_available_tools(self) -> List[Dict[str, Any]]:
        """
        Return list of all available tools with their schemas.
        This is what the LLM calls to discover capabilities.
        """
        return [
            {
                "name": "web_search",
                "description": "Search the web using Google Search. Use this when you need current information, facts, or context that may not be in the document database.",
                "category": "external_api",
                "provider": "Serper API (cloud)",
                "parameters": {
                    "query": {
                        "type": "string",
                        "description": "The search query",
                        "required": True
                    },
                    "num_results": {
                        "type": "integer",
                        "description": "Number of results to return (1-10)",
                        "required": False,
                        "default": 5
                    }
                },
                "examples": [
                    "What is the current stock price of Microsoft?",
                    "Latest news about artificial intelligence",
                    "Who won the 2024 Nobel Prize in Physics?"
                ]
            },
            # Add more tools here following the same pattern
        ]
    
    async def call_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """
        Route tool call to appropriate service.
        
        Args:
            tool_name: Name of the tool to call
            arguments: Tool-specific parameters
            
        Returns:
            Standardized response with success, result, error fields
        """
        try:
            if tool_name == "web_search":
                return await self._call_web_search(arguments)
            # Add elif blocks for other tools
            else:
                return {
                    "success": False,
                    "error": f"Unknown tool: {tool_name}",
                    "available_tools": [t["name"] for t in self.list_available_tools()]
                }
                
        except Exception as e:
            logger.error(f"Error calling tool {tool_name}: {e}")
            return {
                "success": False,
                "error": str(e),
                "tool": tool_name
            }
    
    async def _call_web_search(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Execute web search via Serper API."""
        query = args.get("query")
        num_results = args.get("num_results", 5)
        
        if not query:
            return {"success": False, "error": "Missing required parameter: query"}
        
        result = await self.serper_service.search(query=query, num_results=num_results)
        
        if "error" in result:
            return {"success": False, "error": result["error"]}
        
        # Format response
        return {
            "success": True,
            "tool": "web_search",
            "provider": "Serper API (cloud)",
            "query": query,
            "results": [
                {
                    "title": item.get("title"),
                    "snippet": item.get("snippet"),
                    "link": item.get("link"),
                    "position": item.get("position")
                }
                for item in result.get("organic", [])[:num_results]
            ]
        }
    
    def get_tool_schema(self, tool_name: str) -> Optional[Dict[str, Any]]:
        """Get detailed schema for a specific tool."""
        tools = self.list_available_tools()
        return next((t for t in tools if t["name"] == tool_name), None)
```

### Step 2: Create API Endpoints

**File:** `app/api/mcp_routes.py` (add these endpoints)

```python
"""MCP Tool Provider API Endpoints"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from app.core.auth import verify_token
from app.services.mcp_tool_provider import MCPToolProvider

router = APIRouter()

# Singleton instance
_tool_provider: Optional[MCPToolProvider] = None

def get_tool_provider() -> MCPToolProvider:
    """Get or create tool provider instance."""
    global _tool_provider
    if _tool_provider is None:
        _tool_provider = MCPToolProvider()
    return _tool_provider


class ToolCallRequest(BaseModel):
    """Request to call a tool."""
    tool_name: str = Field(..., description="Name of the tool to call")
    arguments: Dict[str, Any] = Field(..., description="Tool arguments")


class ToolCallResponse(BaseModel):
    """Response from tool call."""
    success: bool
    tool: Optional[str] = None
    provider: Optional[str] = None
    result: Optional[Any] = None
    error: Optional[str] = None


@router.get("/tools/list")
async def list_tools(token: str = Depends(verify_token)):
    """
    List all available MCP tools.
    LLMs call this to discover capabilities.
    """
    provider = get_tool_provider()
    tools = provider.list_available_tools()
    
    return {
        "success": True,
        "count": len(tools),
        "tools": tools,
        "concept": "Dynamic tool discovery - rent tools as needed without hard-coding"
    }


@router.post("/tools/call", response_model=ToolCallResponse)
async def call_tool(
    request: ToolCallRequest,
    token: str = Depends(verify_token)
):
    """
    Execute a tool by name with provided arguments.
    This is the core "tool rental" endpoint.
    """
    provider = get_tool_provider()
    result = await provider.call_tool(request.tool_name, request.arguments)
    
    return result


@router.get("/tools/{tool_name}")
async def get_tool_info(
    tool_name: str,
    token: str = Depends(verify_token)
):
    """Get detailed information about a specific tool."""
    provider = get_tool_provider()
    schema = provider.get_tool_schema(tool_name)
    
    if not schema:
        raise HTTPException(status_code=404, detail=f"Tool not found: {tool_name}")
    
    return {
        "success": True,
        "tool": schema
    }
```

### Step 3: Mount Routes in main.py

**File:** `main.py`

```python
# Import the router
from app.api import mcp_routes

# Mount the router (add this with other router mounts)
app.include_router(mcp_routes.router, prefix=f"{settings.api_prefix}/mcp", tags=["MCP Tools"])
```

---

## Wrapping Existing Services

### Pattern for Adding Any Service

```python
# In MCPToolProvider class:

# 1. Add service instance in __init__
def __init__(self):
    self.your_service = YourService()

# 2. Add tool definition in list_available_tools
{
    "name": "your_tool_name",
    "description": "What this tool does",
    "category": "internal_service",
    "provider": "YourService (backend)",
    "parameters": {
        "param1": {
            "type": "string",
            "description": "Description",
            "required": True
        }
    },
    "examples": ["Example usage 1", "Example usage 2"]
}

# 3. Add routing in call_tool
if tool_name == "your_tool_name":
    return await self._call_your_tool(arguments)

# 4. Implement the handler method
async def _call_your_tool(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Execute your tool."""
    try:
        result = await self.your_service.some_method(**args)
        return {
            "success": True,
            "tool": "your_tool_name",
            "provider": "YourService",
            "result": result
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

### Example 1: Email Service

```python
# In list_available_tools(), add:
{
    "name": "send_email",
    "description": "Send an email using the configured email service. Use when user requests to send emails or notifications.",
    "category": "internal_service",
    "provider": "EmailService (backend)",
    "parameters": {
        "to": {
            "type": "string",
            "description": "Recipient email address",
            "required": True
        },
        "subject": {
            "type": "string",
            "description": "Email subject line",
            "required": True
        },
        "body": {
            "type": "string",
            "description": "Email body content (HTML supported)",
            "required": True
        },
        "cc": {
            "type": "array",
            "description": "CC recipients (optional)",
            "required": False
        }
    },
    "examples": [
        "Send an email to john@example.com about meeting tomorrow",
        "Email the weekly report to team@company.com"
    ]
}

# Add handler:
async def _call_send_email(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Send email via EmailService."""
    required = ["to", "subject", "body"]
    for field in required:
        if field not in args:
            return {"success": False, "error": f"Missing required field: {field}"}
    
    try:
        # Assuming EmailService has a send method
        result = await self.email_service.send(
            to=args["to"],
            subject=args["subject"],
            body=args["body"],
            cc=args.get("cc", [])
        )
        
        return {
            "success": True,
            "tool": "send_email",
            "provider": "EmailService",
            "result": {
                "message_id": result.get("message_id"),
                "status": "sent"
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Add routing:
elif tool_name == "send_email":
    return await self._call_send_email(arguments)
```

### Example 2: SharePoint RAG Service

```python
# In list_available_tools(), add:
{
    "name": "query_documents",
    "description": "Search internal SharePoint documents using AI-powered RAG. Use when user asks about company documents, policies, or internal knowledge.",
    "category": "internal_service",
    "provider": "SharePointRAGService (backend)",
    "parameters": {
        "question": {
            "type": "string",
            "description": "The question to answer from documents",
            "required": True
        },
        "k": {
            "type": "integer",
            "description": "Number of document chunks to retrieve",
            "required": False,
            "default": 5
        }
    },
    "examples": [
        "What is our company's vacation policy?",
        "Find information about project specifications",
        "What does the HR handbook say about remote work?"
    ]
}

# Add handler:
async def _call_query_documents(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Query SharePoint documents via RAG."""
    question = args.get("question")
    k = args.get("k", 5)
    
    if not question:
        return {"success": False, "error": "Missing required parameter: question"}
    
    try:
        # Lazy load RAG service
        if self.rag_service is None:
            from app.templates.rag_sharepoint import SharePointRAGService
            self.rag_service = SharePointRAGService()
        
        result = self.rag_service.query(question=question, k=k)
        
        return {
            "success": True,
            "tool": "query_documents",
            "provider": "SharePointRAGService",
            "result": {
                "answer": result.get("answer"),
                "sources": result.get("sources", []),
                "num_chunks": len(result.get("sources", []))
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Add routing:
elif tool_name == "query_documents":
    return await self._call_query_documents(arguments)
```

### Example 3: DSPy Optimization Service

```python
# In list_available_tools(), add:
{
    "name": "optimize_prompt",
    "description": "Optimize prompts using DSPy and GEPA. Use when you need to improve prompt quality or fine-tune AI responses.",
    "category": "internal_service",
    "provider": "DSPyService (backend)",
    "parameters": {
        "prompt": {
            "type": "string",
            "description": "The prompt to optimize",
            "required": True
        },
        "task_type": {
            "type": "string",
            "description": "Type of task (rag, summarization, classification)",
            "required": False,
            "default": "rag"
        }
    },
    "examples": [
        "Optimize this prompt for better responses",
        "Improve the quality of this summarization prompt"
    ]
}

# Add handler:
async def _call_optimize_prompt(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Optimize prompt using DSPy."""
    prompt = args.get("prompt")
    task_type = args.get("task_type", "rag")
    
    if not prompt:
        return {"success": False, "error": "Missing required parameter: prompt"}
    
    try:
        # Assuming DSPyService has optimize method
        from app.services.dspy_service import DSPyService
        dspy_service = DSPyService()
        
        result = await dspy_service.optimize_prompt(
            prompt=prompt,
            task_type=task_type
        )
        
        return {
            "success": True,
            "tool": "optimize_prompt",
            "provider": "DSPyService",
            "result": {
                "optimized_prompt": result.get("optimized_prompt"),
                "improvements": result.get("improvements", [])
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Add routing:
elif tool_name == "optimize_prompt":
    return await self._call_optimize_prompt(arguments)
```

### Example 4: Workflow Service (If Re-enabled)

```python
# In list_available_tools(), add:
{
    "name": "execute_workflow",
    "description": "Execute a predefined workflow or automation. Use for multi-step business processes.",
    "category": "internal_service",
    "provider": "WorkflowService (backend)",
    "parameters": {
        "workflow_name": {
            "type": "string",
            "description": "Name of the workflow to execute",
            "required": True
        },
        "inputs": {
            "type": "object",
            "description": "Workflow input parameters",
            "required": False
        }
    },
    "examples": [
        "Execute the monthly report workflow",
        "Run the customer onboarding process"
    ]
}

# Add handler:
async def _call_execute_workflow(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Execute workflow."""
    workflow_name = args.get("workflow_name")
    inputs = args.get("inputs", {})
    
    if not workflow_name:
        return {"success": False, "error": "Missing required parameter: workflow_name"}
    
    try:
        from app.services.workflow_service import WorkflowService
        workflow_service = WorkflowService()
        
        result = await workflow_service.execute(
            name=workflow_name,
            inputs=inputs
        )
        
        return {
            "success": True,
            "tool": "execute_workflow",
            "provider": "WorkflowService",
            "result": result
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Add routing:
elif tool_name == "execute_workflow":
    return await self._call_execute_workflow(arguments)
```

---

## Integrating with Chat/LLM

### Method 1: Simple Function Calling (GPT-4)

**File:** `app/services/chat_orchestrator.py`

```python
async def chat_with_tools(self, message: str, conversation_id: str) -> Dict[str, Any]:
    """
    Chat with tool discovery and calling capabilities.
    """
    from app.services.mcp_tool_provider import MCPToolProvider
    
    tool_provider = MCPToolProvider()
    
    # Get available tools
    available_tools = tool_provider.list_available_tools()
    
    # Convert to OpenAI function format
    functions = [
        {
            "name": tool["name"],
            "description": tool["description"],
            "parameters": {
                "type": "object",
                "properties": tool["parameters"],
                "required": [k for k, v in tool["parameters"].items() if v.get("required")]
            }
        }
        for tool in available_tools
    ]
    
    # Call GPT-4 with functions
    response = await self.azure_openai.chat.completions.create(
        model=settings.azure_openai_deployment,
        messages=[
            {"role": "system", "content": "You are a helpful assistant with access to various tools. Use them when appropriate."},
            {"role": "user", "content": message}
        ],
        functions=functions,
        function_call="auto"
    )
    
    # Check if function was called
    if response.choices[0].message.function_call:
        function_name = response.choices[0].message.function_call.name
        function_args = json.loads(response.choices[0].message.function_call.arguments)
        
        # Execute the tool
        tool_result = await tool_provider.call_tool(function_name, function_args)
        
        # Send result back to GPT for final answer
        final_response = await self.azure_openai.chat.completions.create(
            model=settings.azure_openai_deployment,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message},
                {"role": "function", "name": function_name, "content": json.dumps(tool_result)}
            ]
        )
        
        return {
            "answer": final_response.choices[0].message.content,
            "tool_used": function_name,
            "tool_result": tool_result
        }
    else:
        return {
            "answer": response.choices[0].message.content,
            "tool_used": None
        }
```

### Method 2: Manual Tool Discovery (Any LLM)

```python
async def chat_with_manual_tools(self, message: str) -> Dict[str, Any]:
    """
    Chat with manual tool discovery - works with any LLM.
    """
    from app.services.mcp_tool_provider import MCPToolProvider
    
    tool_provider = MCPToolProvider()
    available_tools = tool_provider.list_available_tools()
    
    # Create tools description for prompt
    tools_desc = "\n".join([
        f"- {tool['name']}: {tool['description']}"
        for tool in available_tools
    ])
    
    # First pass: Ask LLM if it needs tools
    system_prompt = f"""You are a helpful assistant with access to these tools:

{tools_desc}

If you need to use a tool to answer the user's question, respond with:
TOOL_CALL: tool_name
ARGUMENTS: {{"arg1": "value1", "arg2": "value2"}}

Otherwise, answer directly."""
    
    response = await self.llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": message}
    ])
    
    # Check if LLM wants to call a tool
    if "TOOL_CALL:" in response.content:
        # Parse tool call
        lines = response.content.split("\n")
        tool_name = lines[0].replace("TOOL_CALL:", "").strip()
        args_json = lines[1].replace("ARGUMENTS:", "").strip()
        arguments = json.loads(args_json)
        
        # Execute tool
        tool_result = await tool_provider.call_tool(tool_name, arguments)
        
        # Get final answer with tool results
        final_prompt = f"""Using the tool results below, answer the user's question.

User Question: {message}

Tool Used: {tool_name}
Tool Results: {json.dumps(tool_result, indent=2)}

Answer:"""
        
        final_response = await self.llm.invoke(final_prompt)
        
        return {
            "answer": final_response.content,
            "tool_used": tool_name,
            "tool_result": tool_result
        }
    else:
        return {
            "answer": response.content,
            "tool_used": None
        }
```

### Method 3: RAG with Auto Web Search (Already Implemented!)

This is what you just built - when web search toggle is enabled, it automatically uses the web_search tool.

---

## Testing

### Test 1: List Available Tools

```powershell
# Verify tools are discoverable
curl http://localhost:8000/api/v1/mcp/tools/list
```

Expected response:
```json
{
  "success": true,
  "count": 4,
  "tools": [
    {"name": "web_search", ...},
    {"name": "send_email", ...},
    {"name": "query_documents", ...},
    {"name": "optimize_prompt", ...}
  ]
}
```

### Test 2: Call Web Search Tool

```powershell
$body = @{
    tool_name = "web_search"
    arguments = @{
        query = "latest AI news 2026"
        num_results = 3
    }
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/v1/mcp/tools/call" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing
```

### Test 3: Call Email Tool

```powershell
$body = @{
    tool_name = "send_email"
    arguments = @{
        to = "test@example.com"
        subject = "Test from MCP"
        body = "This email was sent via MCP tool!"
    }
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/v1/mcp/tools/call" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing
```

### Test 4: Query Documents Tool

```powershell
$body = @{
    tool_name = "query_documents"
    arguments = @{
        question = "What are our company policies?"
        k = 5
    }
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/v1/mcp/tools/call" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing
```

---

## Future Extensions

### Database Query Tool

```python
{
    "name": "query_database",
    "description": "Execute SQL queries against the database. Use for data retrieval and analysis.",
    "category": "database",
    "provider": "DatabaseService (backend)",
    "parameters": {
        "query": {
            "type": "string",
            "description": "SQL query to execute (SELECT only)",
            "required": True
        },
        "limit": {
            "type": "integer",
            "description": "Maximum rows to return",
            "required": False,
            "default": 100
        }
    },
    "security": {
        "read_only": True,
        "sanitize_input": True,
        "allowed_tables": ["users", "orders", "products"]
    }
}

async def _call_query_database(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Execute read-only database query."""
    query = args.get("query", "").strip()
    limit = args.get("limit", 100)
    
    # Security: Only allow SELECT
    if not query.upper().startswith("SELECT"):
        return {"success": False, "error": "Only SELECT queries allowed"}
    
    try:
        # Use your database service
        results = await self.db_service.execute_query(query, limit=limit)
        
        return {
            "success": True,
            "tool": "query_database",
            "result": {
                "rows": results,
                "count": len(results)
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

### File Operations Tool

```python
{
    "name": "read_file",
    "description": "Read contents of a file from the server. Use when user asks about file contents.",
    "category": "file_system",
    "provider": "FileService (backend)",
    "parameters": {
        "path": {
            "type": "string",
            "description": "Relative path to file",
            "required": True
        },
        "encoding": {
            "type": "string",
            "description": "File encoding",
            "required": False,
            "default": "utf-8"
        }
    },
    "security": {
        "allowed_directories": ["/data", "/uploads"],
        "max_file_size": "10MB"
    }
}

async def _call_read_file(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Read file contents with security checks."""
    import os
    from pathlib import Path
    
    path = args.get("path")
    encoding = args.get("encoding", "utf-8")
    
    # Security: Prevent path traversal
    if ".." in path or path.startswith("/"):
        return {"success": False, "error": "Invalid path"}
    
    # Security: Restrict to allowed directories
    full_path = Path(settings.data_directory) / path
    
    try:
        content = full_path.read_text(encoding=encoding)
        
        return {
            "success": True,
            "tool": "read_file",
            "result": {
                "content": content,
                "size": len(content),
                "path": str(path)
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

### Azure Operations Tool

```python
{
    "name": "create_azure_resource",
    "description": "Create Azure resources programmatically. Use when user wants to deploy or create Azure services.",
    "category": "cloud",
    "provider": "AzureService (backend)",
    "parameters": {
        "resource_type": {
            "type": "string",
            "description": "Type of resource (webapp, storage, database)",
            "required": True
        },
        "name": {
            "type": "string",
            "description": "Resource name",
            "required": True
        },
        "configuration": {
            "type": "object",
            "description": "Resource-specific configuration",
            "required": False
        }
    },
    "security": {
        "requires_approval": True,
        "allowed_resource_types": ["webapp", "storage"]
    }
}

async def _call_create_azure_resource(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Create Azure resource with approval workflow."""
    resource_type = args.get("resource_type")
    name = args.get("name")
    config = args.get("configuration", {})
    
    # Validation
    allowed_types = ["webapp", "storage"]
    if resource_type not in allowed_types:
        return {"success": False, "error": f"Resource type must be one of: {allowed_types}"}
    
    try:
        # This would integrate with Azure SDK
        from azure.mgmt.resource import ResourceManagementClient
        
        # Request approval first (implement approval workflow)
        approval = await self.request_approval(
            action="create_azure_resource",
            details={"type": resource_type, "name": name}
        )
        
        if not approval["approved"]:
            return {"success": False, "error": "Approval required but not granted"}
        
        # Create resource
        result = await self.azure_service.create_resource(
            resource_type=resource_type,
            name=name,
            config=config
        )
        
        return {
            "success": True,
            "tool": "create_azure_resource",
            "result": {
                "resource_id": result["id"],
                "status": "created",
                "url": result.get("url")
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

### Custom Business Logic Tool

```python
{
    "name": "calculate_discount",
    "description": "Calculate customer discount based on business rules. Use when determining pricing.",
    "category": "business_logic",
    "provider": "DiscountService (backend)",
    "parameters": {
        "customer_id": {
            "type": "string",
            "description": "Customer identifier",
            "required": True
        },
        "product_id": {
            "type": "string",
            "description": "Product identifier",
            "required": True
        },
        "quantity": {
            "type": "integer",
            "description": "Quantity ordered",
            "required": True
        }
    }
}

async def _call_calculate_discount(self, args: Dict[str, Any]) -> Dict[str, Any]:
    """Calculate discount using business rules."""
    try:
        customer_id = args["customer_id"]
        product_id = args["product_id"]
        quantity = args["quantity"]
        
        # Your custom business logic
        discount = await self.discount_service.calculate(
            customer_id=customer_id,
            product_id=product_id,
            quantity=quantity
        )
        
        return {
            "success": True,
            "tool": "calculate_discount",
            "result": {
                "discount_percent": discount["percent"],
                "discount_amount": discount["amount"],
                "final_price": discount["final_price"],
                "reason": discount["reason"]
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

---

## Best Practices

### 1. Security

- **Validate all inputs** - Never trust tool arguments
- **Implement authentication** - Verify tokens for all tool calls
- **Use rate limiting** - Prevent abuse of expensive tools
- **Add approval workflows** - For destructive/costly operations
- **Sanitize outputs** - Don't leak sensitive data

### 2. Error Handling

- **Return consistent format** - Always include `success`, `error` fields
- **Log all errors** - Use logger for debugging
- **Graceful degradation** - Provide fallbacks when tools fail
- **Descriptive errors** - Help LLM understand what went wrong

### 3. Performance

- **Lazy load services** - Don't initialize until needed
- **Use async/await** - Don't block on I/O
- **Cache results** - When appropriate
- **Set timeouts** - Don't let tools hang indefinitely

### 4. Documentation

- **Clear descriptions** - Help LLM choose right tool
- **Provide examples** - Show typical use cases
- **Document parameters** - Explain each field
- **Version your tools** - Track changes over time

---

## Summary

You now have a complete **Tool Rental Marketplace** architecture where:

1. ✅ Backend services are wrapped as discoverable MCP tools
2. ✅ LLMs can dynamically discover available capabilities
3. ✅ Tools are called through a standardized interface
4. ✅ New services can be added without changing LLM code

**Key Files to Create/Modify:**
- `app/services/mcp_tool_provider.py` - Core tool registry and router
- `app/api/mcp_routes.py` - REST API endpoints
- `main.py` - Mount the routes
- `app/services/chat_orchestrator.py` - Integrate with LLM

**The Power:** Add ANY Python function as a tool and your LLM can use it!

---

**Next Steps:**
1. Copy this guide to your stable branch
2. Implement MCPToolProvider step by step
3. Add one tool at a time (start with web_search)
4. Test each tool individually
5. Integrate with chat when ready

Good luck! 🚀
