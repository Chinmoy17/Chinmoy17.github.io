# Adding External Tools to AgentFlow

> **Developer Guide** | Last Updated: January 21, 2026

This guide explains how to integrate external deployed web services (like AI Breakthrough Hub, BAGenie, etc.) into AgentFlow as selectable tools.

---

## Overview

AgentFlow uses a **"Service Vendoring"** pattern where external services are:
1. Proxied through AgentFlow's backend API
2. Exposed as selectable tools in the UI
3. Managed through the LangGraph requirement analysis workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AGENTFLOW ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                │
│   │  External   │    │  External   │    │  External   │                │
│   │  Service A  │    │  Service B  │    │  Service C  │                │
│   │ (AI Break-  │    │ (BAGenie)   │    │  (Future)   │                │
│   │  through)   │    │             │    │             │                │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘                │
│          │                  │                  │                        │
│          └──────────────────┼──────────────────┘                        │
│                             │                                           │
│                             ▼                                           │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                  AGENTFLOW BACKEND (FastAPI)                     │  │
│   │  ┌─────────────────────────────────────────────────────────┐    │  │
│   │  │              app/api/external_tools.py                   │    │  │
│   │  │         (Proxy endpoints for all external services)      │    │  │
│   │  └─────────────────────────────────────────────────────────┘    │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                             │                                           │
│                             ▼                                           │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                     AGENTFLOW FRONTEND                          │  │
│   │                  (Unified Tool Selection UI)                    │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## The 8-Point Checklist

When adding any new external tool, you must touch **8 specific locations**. Missing any one breaks the flow.

| # | File | What to Add |
|---|------|-------------|
| 1 | `app/core/capabilities_config.py` | Capability definition in `CAPABILITIES` dict |
| 2 | `app/core/capabilities_config.py` | QuestionOption in `USER_MODE_QUESTIONS` |
| 3 | `app/api/external_tools.py` | Proxy endpoint(s) for the external service |
| 4 | `main.py` | Router import & registration (if new file) |
| 5 | `app/services/langgraph_requirement_agent.py` | Tool in `discover_tools()` list |
| 6 | `app/services/langgraph_requirement_agent.py` | Entry in `component_map` dict |
| 7 | `frontend/src/pages/DynamicAppPage.tsx` | State variables for the tool |
| 8 | `frontend/src/pages/DynamicAppPage.tsx` | Case in `renderSidePanelContent()` |

---

## Visual Flow: Tool Selection Pipeline

```
┌─────────────────┐
│   User opens    │
│   AgentFlow     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Start Wizard   │
│ (User/Dev Mode) │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LangGraph Workflow                            │
│  ┌─────────┐   ┌─────────────┐   ┌─────────────────┐           │
│  │ Discover│──▶│ Collect Info│──▶│ Analyze & Select│           │
│  │  Tools  │   │  (Q&A)      │   │     Tools       │           │
│  └─────────┘   └─────────────┘   └────────┬────────┘           │
│       ▲                                    │                    │
│       │                                    ▼                    │
│  ┌────┴────────────────────────────────────────────┐           │
│  │           discover_tools() function              │           │
│  │  Returns: [{id, name, category, description}]    │           │
│  │  ⚠️ Tool MUST be listed here to appear!          │           │
│  └──────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                Component Map Lookup                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  component_map = {                                        │   │
│  │    "tool_id": {"name": "...", "icon": "...", "label": ""}│   │
│  │  }                                                        │   │
│  │  ⚠️ Tool MUST be here for header button to appear!        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Rendering                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  renderSidePanelContent() switch-case                     │   │
│  │  case 'your_tool': return <YourToolPanel />               │   │
│  │  ⚠️ Tool MUST have a case for UI to render!               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Tool appears   │
│  in header bar  │
│  User clicks →  │
│  Side panel UI  │
└─────────────────┘
```

---

## Detailed Implementation Steps

### Step 1: Define Capability (`capabilities_config.py`)

Add your tool to the `CAPABILITIES` dictionary:

```python
CAPABILITIES = {
    # ... existing capabilities ...
    
    "ai_breakthrough": {
        "id": "ai_breakthrough",
        "name": "AI Breakthrough News",
        "description": "Scrapes and emails latest AI news from top sources",
        "category": "external_service",
        "enabled": True,
        "requires_auth": False,
        "config": {
            "base_url": "https://ai-breakthrough-hub.azurewebsites.net",
            "endpoints": {
                "trigger": "/api/orchestrator/trigger-now"
            }
        }
    }
}
```

### Step 2: Add User Mode Question Option (`capabilities_config.py`)

Find the relevant question in `USER_MODE_QUESTIONS` and add an option:

```python
USER_MODE_QUESTIONS = [
    {
        "id": "tools",
        "question": "Which tools would help with your task?",
        "options": [
            # ... existing options ...
            QuestionOption(
                id="ai_breakthrough",
                label="AI Breakthrough News",
                description="Get curated AI news delivered to your email",
                icon="📰",
                maps_to_capability="ai_breakthrough"
            )
        ]
    }
]
```

### Step 3: Create API Proxy Endpoint (`external_tools.py`)

Add endpoints to proxy requests to the external service:

```python
from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter()

@router.post("/ai-breakthrough/trigger")
async def trigger_ai_breakthrough(send_email: bool = True):
    """Proxy to AI Breakthrough Hub trigger endpoint"""
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            response = await client.post(
                "https://ai-breakthrough-hub.azurewebsites.net/api/orchestrator/trigger-now",
                json={"send_email": send_email}
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"External service error: {str(e)}")
```

### Step 4: Register Router (`main.py`)

If you created a new router file, register it:

```python
from app.api import external_tools

# In the app setup section:
app.include_router(
    external_tools.router, 
    prefix=f"{settings.api_prefix}/external", 
    tags=["External Tools"]
)
```

### Step 5: Add to Tool Discovery (`langgraph_requirement_agent.py`)

Add your tool to the `discover_tools()` function's hardcoded list:

```python
def discover_tools(state: RequirementState) -> RequirementState:
    tools = [
        # ... existing tools ...
        {
            "id": "ai_breakthrough",
            "name": "AI Breakthrough News",
            "category": "External Services",
            "description": "Scrapes latest AI news from top sources and can email summaries"
        }
    ]
    return {"available_tools": tools}
```

### Step 6: Add to Component Map (`langgraph_requirement_agent.py`)

Add your tool to the `component_map` dictionary in `tool_selection()`:

```python
component_map = {
    # ... existing mappings ...
    "ai_breakthrough": {"name": "AIBreakthrough", "icon": "📰", "label": "AI News"},
}
```

### Step 7: Add Frontend State (`DynamicAppPage.tsx`)

Add state variables for your tool's UI:

```typescript
// State for AI Breakthrough
const [triggeringAINews, setTriggeringAINews] = useState(false);
const [aiNewsResult, setAINewsResult] = useState<any>(null);
```

### Step 8: Add Panel Render Case (`DynamicAppPage.tsx`)

Add a case to `renderSidePanelContent()`:

```typescript
case 'ai_breakthrough':
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">📰 AI Breakthrough News</h3>
      <p className="text-gray-600 mb-4">
        Trigger AI news scraping and receive a curated summary via email.
      </p>
      <button
        onClick={async () => {
          setTriggeringAINews(true);
          try {
            const response = await fetch('/api/v1/external/ai-breakthrough/trigger', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ send_email: true })
            });
            const result = await response.json();
            setAINewsResult(result);
          } catch (error) {
            setAINewsResult({ error: 'Failed to trigger AI news' });
          } finally {
            setTriggeringAINews(false);
          }
        }}
        disabled={triggeringAINews}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {triggeringAINews ? 'Processing...' : 'Trigger AI News Scrape'}
      </button>
      {aiNewsResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <pre className="text-sm">{JSON.stringify(aiNewsResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
```

---

## File Reference Quick-Look

| File Path | Purpose |
|-----------|---------|
| `app/core/capabilities_config.py` | Central registry of all tool capabilities |
| `app/api/external_tools.py` | Proxy endpoints for external services |
| `main.py` | FastAPI app setup & router registration |
| `app/services/langgraph_requirement_agent.py` | LangGraph workflow & tool discovery |
| `frontend/src/pages/DynamicAppPage.tsx` | Main UI component with tool panels |

---

## Template: Adding a New External Service

Use this template when adding any new external service:

### 1. Gather Service Info

```yaml
Service Name: [Your Service Name]
Base URL: https://your-service.azurewebsites.net
Endpoints:
  - POST /api/endpoint1 - Description
  - GET /api/endpoint2 - Description
Authentication: [None / API Key / OAuth]
```

### 2. Capability Definition

```python
"your_service_id": {
    "id": "your_service_id",
    "name": "Your Service Display Name",
    "description": "What it does in one sentence",
    "category": "external_service",
    "enabled": True,
    "requires_auth": False,
    "config": {
        "base_url": "https://your-service.azurewebsites.net",
        "endpoints": {
            "main": "/api/main-endpoint"
        }
    }
}
```

### 3. Tool Discovery Entry

```python
{
    "id": "your_service_id",
    "name": "Your Service Display Name",
    "category": "External Services",
    "description": "Brief description for the AI to understand when to suggest this tool"
}
```

### 4. Component Map Entry

```python
"your_service_id": {"name": "YourServiceComponent", "icon": "🔧", "label": "Short Label"}
```

---

## Common Issues & Debugging

### Tool Not Appearing in "Available Tools" Grid

**Cause:** Missing from `discover_tools()` list  
**Fix:** Add tool definition to the hardcoded list in `discover_tools()`

### Tool Selected But No Button in Header

**Cause:** Missing from `component_map`  
**Fix:** Add entry to `component_map` with name, icon, and label

### Tool Button Appears But No Side Panel

**Cause:** Missing case in `renderSidePanelContent()`  
**Fix:** Add a case statement for your tool's ID

### Tool Always Marked as "Optional"

**Cause:** LLM override in `tool_selection()` ignoring User Mode selections  
**Fix:** Ensure User Mode selections bypass LLM and use "recommended" priority

### API Call Returns 404

**Cause:** Router not registered or wrong prefix  
**Fix:** Check `main.py` for router registration with correct prefix

### External Service Timeout

**Cause:** Default httpx timeout too short  
**Fix:** Increase timeout in httpx.AsyncClient (e.g., `timeout=60.0`)

---

## Testing Checklist

Before deploying a new tool integration:

- [ ] Tool appears in Available Tools grid during wizard
- [ ] Selecting tool in User Mode adds it to selected tools
- [ ] Tool shows "recommended" priority (not "optional")
- [ ] Header button appears after wizard completion
- [ ] Clicking button opens side panel with correct UI
- [ ] API endpoint works (test with curl/Postman first)
- [ ] External service responds correctly
- [ ] Error handling displays user-friendly messages
- [ ] Loading states work correctly

---

## Deployment

After implementing and testing locally:

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build Docker Image:**
   ```bash
   docker build -t agentflowbm.azurecr.io/agentflow:latest .
   ```

3. **Push to ACR:**
   ```bash
   docker push agentflowbm.azurecr.io/agentflow:latest
   ```

4. **Deploy to Azure:**
   ```bash
   az webapp restart --name agentflowbm --resource-group agentflowbm
   ```

---

## Example: AI Breakthrough Hub Integration

The AI Breakthrough Hub was the first external service integrated using this pattern. Reference files:

- **External Service URL:** `https://ai-breakthrough-hub.azurewebsites.net`
- **Trigger Endpoint:** `POST /api/orchestrator/trigger-now`
- **Request Body:** `{"send_email": true}`
- **Tool ID:** `ai_breakthrough`
- **Icon:** 📰
- **Label:** "AI News"

This integration serves as the canonical example for adding future external services.

---

## Summary

Adding an external tool to AgentFlow requires touching 8 specific locations across 5 files. The key insight is that AgentFlow acts as a **unified UI layer** that proxies requests to external services, making it easy to add new capabilities without modifying the external services themselves.

Follow the checklist, use the templates, and test thoroughly before deployment.
