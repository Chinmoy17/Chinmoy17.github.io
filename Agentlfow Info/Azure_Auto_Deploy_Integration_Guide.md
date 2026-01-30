# Azure Auto-Deploy Integration Guide

**Build an AI App with One-Click Azure Deployment from Scratch**

This guide shows you how to build an AI application similar to AgentFlow with automatic Azure Container Apps deployment capability - starting from zero, no cloning required.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Required Azure Resources](#required-azure-resources)
4. [Credentials & Environment Variables](#credentials--environment-variables)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
7. [Docker Configuration](#docker-configuration)
8. [Testing & Deployment](#testing--deployment)
9. [Production Considerations](#production-considerations)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Web Application                      │
│  ┌──────────────┐              ┌──────────────┐            │
│  │   Frontend   │  API Calls   │   Backend    │            │
│  │  (React/Vue) │─────────────▶│  (FastAPI)   │            │
│  │              │              │              │            │
│  │  [Deploy     │              │  /deploy     │            │
│  │   Button]    │              │   endpoint   │            │
│  └──────────────┘              └──────┬───────┘            │
│                                        │                     │
└────────────────────────────────────────┼─────────────────────┘
                                         │
                                         ▼
                            ┌────────────────────────┐
                            │  Azure SDK             │
                            │  ContainerAppsClient   │
                            └────────┬───────────────┘
                                     │
                                     ▼
              ┌──────────────────────────────────────────┐
              │         Azure Cloud                      │
              │  ┌────────────────────────────────┐     │
              │  │  Container Registry (ACR)      │     │
              │  │  your-app:latest               │     │
              │  └────────────┬───────────────────┘     │
              │               │                          │
              │               ▼                          │
              │  ┌────────────────────────────────┐     │
              │  │  Container Apps Environment    │     │
              │  │  ┌──────────────────────────┐  │     │
              │  │  │ New Container Instance   │  │     │
              │  │  │ https://demo-xxx.azurecontainerapps.io │
              │  │  └──────────────────────────┘  │     │
              │  └────────────────────────────────┘     │
              └──────────────────────────────────────────┘
```

**What happens when user clicks "Deploy to Azure":**
1. Frontend sends POST request to `/api/v1/deployment/deploy`
2. Backend generates unique demo ID and app name
3. Backend calls Azure SDK to create Container App
4. Azure pulls your Docker image from ACR
5. Azure starts container with injected secrets
6. Backend returns public URL: `https://demo-xxx.azurecontainerapps.io`
7. User can access their personal demo instance

---

## ✅ Prerequisites

### Local Development Environment

```bash
# Required software
- Python 3.11+
- Node.js 18+
- Docker Desktop
- Azure CLI
- Git
```

### Install Azure CLI

```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'

# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Azure Account Setup

```bash
# Login to Azure
az login

# Set subscription (if you have multiple)
az account set --subscription "YOUR_SUBSCRIPTION_NAME"

# Verify
az account show
```

---

## 🔧 Required Azure Resources

### 1. Create Resource Group

```bash
az group create \
  --name agentflow-demos-rg \
  --location eastus
```

### 2. Create Container Registry (ACR)

```bash
# Create registry
az acr create \
  --resource-group agentflow-demos-rg \
  --name myappdemosacr \
  --sku Basic \
  --admin-enabled true

# Get admin password (save this!)
az acr credential show --name myappdemosacr
```

**Save Output:**
```
Username: myappdemosacr
Password: <SAVE_THIS_PASSWORD>  # This is your ACR_PASSWORD
Registry: myappdemosacr.azurecr.io
```

### 3. Create Container Apps Environment

```bash
az containerapp env create \
  --name myapp-demos-env \
  --resource-group agentflow-demos-rg \
  --location eastus
```

### 4. Create Azure OpenAI Resource

```bash
# Create Azure OpenAI
az cognitiveservices account create \
  --name myapp-openai \
  --resource-group agentflow-demos-rg \
  --kind OpenAI \
  --sku S0 \
  --location eastus2

# Get endpoint and key
az cognitiveservices account show \
  --name myapp-openai \
  --resource-group agentflow-demos-rg \
  --query properties.endpoint

az cognitiveservices account keys list \
  --name myapp-openai \
  --resource-group agentflow-demos-rg
```

### 5. Deploy GPT-4 Model

```bash
az cognitiveservices account deployment create \
  --name myapp-openai \
  --resource-group agentflow-demos-rg \
  --deployment-name gpt-4 \
  --model-name gpt-4 \
  --model-version "0613" \
  --model-format OpenAI \
  --sku-capacity 10 \
  --sku-name "Standard"
```

### 6. Get Azure Subscription ID

```bash
az account show --query id --output tsv
# Output: a7326595-a9d7-4633-9643-8c6828d7f97f
```

---

## 🔑 Credentials & Environment Variables

Create a `.env` file in your project root with these values:

### **Required Credentials (Copy & Fill)**

```bash
# ============================================
# CORE AI SERVICE (REQUIRED)
# ============================================
AZURE_OPENAI_ENDPOINT=https://myapp-openai.openai.azure.com/
AZURE_OPENAI_API_KEY=<GET_FROM_STEP_4_ABOVE>
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
AZURE_OPENAI_API_VERSION=2025-01-01-preview

# ============================================
# AUTHENTICATION (REQUIRED)
# ============================================
# Generate with: openssl rand -hex 32
SECRET_KEY=<GENERATE_RANDOM_32_CHAR_HEX>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# ============================================
# AZURE DEPLOYMENT CONFIGURATION (REQUIRED)
# ============================================
AZURE_SUBSCRIPTION_ID=<FROM_STEP_6_ABOVE>
AZURE_RESOURCE_GROUP=agentflow-demos-rg
AZURE_CONTAINER_REGISTRY=myappdemosacr.azurecr.io
AZURE_CONTAINER_ENV_NAME=myapp-demos-env
AZURE_BASE_IMAGE=myapp-base:latest
ACR_PASSWORD=<FROM_STEP_2_ABOVE>

# ============================================
# APPLICATION SETTINGS
# ============================================
ENVIRONMENT=production
APP_NAME=myapp-demo
DISABLE_SSO=true  # Set false if you have SSO service

# ============================================
# OPTIONAL: EMAIL SERVICE
# ============================================
EMAIL_SERVICE_URL=https://your-email-function.azurewebsites.net/api/mailservice
EMAIL_SERVICE_KEY=<YOUR_AZURE_FUNCTION_KEY>

# ============================================
# OPTIONAL: SHAREPOINT RAG
# ============================================
SHAREPOINT_TENANT_ID=<YOUR_AZURE_AD_TENANT_ID>
SHAREPOINT_CLIENT_ID=<YOUR_APP_CLIENT_ID>
SHAREPOINT_CLIENT_SECRET=<YOUR_APP_SECRET>
SHAREPOINT_SITE_URL=https://yourcompany.sharepoint.com/sites/YourSite

# Embedding service for RAG
EMBED_ENDPOINT=https://myapp-openai.openai.azure.com/
EMBED_API_KEY=<SAME_AS_AZURE_OPENAI_API_KEY>
EMBED_DEPLOYMENT=text-embedding-3-large
EMBED_MODEL=text-embedding-3-large
EMBED_DIMENSIONS=3072

# ============================================
# OPTIONAL: WEB SEARCH (Serper API)
# ============================================
SERPER_API_KEY=<GET_FROM_SERPER.DEV>
```

### **How to Get Each Credential**

| Credential | How to Get |
|------------|------------|
| `AZURE_SUBSCRIPTION_ID` | `az account show --query id -o tsv` |
| `AZURE_OPENAI_ENDPOINT` | Azure Portal → OpenAI Resource → Endpoint |
| `AZURE_OPENAI_API_KEY` | Azure Portal → OpenAI Resource → Keys |
| `ACR_PASSWORD` | `az acr credential show --name myappdemosacr` |
| `SECRET_KEY` | `openssl rand -hex 32` or `python -c "import secrets; print(secrets.token_hex(32))"` |
| `EMAIL_SERVICE_KEY` | Azure Portal → Function App → Function Keys |
| `SHAREPOINT_TENANT_ID` | Azure Portal → Azure AD → Overview |
| `SHAREPOINT_CLIENT_ID` | Azure Portal → App Registrations → Your App → Application ID |
| `SHAREPOINT_CLIENT_SECRET` | Azure Portal → App Registrations → Your App → Certificates & Secrets |
| `SERPER_API_KEY` | Sign up at https://serper.dev |

---

## 💻 Backend Implementation

### 1. Project Structure

Create this folder structure:

```
myapp/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── deployment.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── deployment_service.py
│   └── core/
│       ├── __init__.py
│       ├── config.py
│       └── auth.py
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── pages/
│   │       └── DeployPage.tsx
│   └── package.json
├── Dockerfile
├── requirements.txt
├── .env
└── README.md
```

### 2. Install Dependencies

**requirements.txt:**
```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
azure-mgmt-appcontainers==3.1.0
azure-identity==1.15.0
openai==1.12.0
pydantic==2.6.0
python-jose[cryptography]==3.3.0
python-multipart==0.0.9
```

Install:
```bash
pip install -r requirements.txt
```

### 3. Configuration (app/core/config.py)

```python
from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional

class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # Azure OpenAI
    azure_openai_endpoint: str = Field(..., alias="AZURE_OPENAI_ENDPOINT")
    azure_openai_api_key: str = Field(..., alias="AZURE_OPENAI_API_KEY")
    azure_openai_deployment_name: str = Field(..., alias="AZURE_OPENAI_DEPLOYMENT_NAME")
    azure_openai_api_version: str = Field(default="2025-01-01-preview", alias="AZURE_OPENAI_API_VERSION")
    
    # Authentication
    secret_key: str = Field(..., alias="SECRET_KEY")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")
    
    # Azure Deployment
    azure_subscription_id: str = Field(..., alias="AZURE_SUBSCRIPTION_ID")
    azure_resource_group: str = Field(..., alias="AZURE_RESOURCE_GROUP")
    azure_container_registry: str = Field(..., alias="AZURE_CONTAINER_REGISTRY")
    azure_container_env_name: str = Field(..., alias="AZURE_CONTAINER_ENV_NAME")
    azure_base_image: str = Field(..., alias="AZURE_BASE_IMAGE")
    acr_password: str = Field(..., alias="ACR_PASSWORD")
    
    # App settings
    environment: str = Field(default="development", alias="ENVIRONMENT")
    app_name: str = Field(default="myapp-demo", alias="APP_NAME")
    disable_sso: bool = Field(default=True, alias="DISABLE_SSO")
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": False,
        "populate_by_name": True
    }

settings = Settings()
```

### 4. Deployment Service (app/services/deployment_service.py)

```python
"""Azure Container Apps Deployment Service"""
import os
import secrets
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
from azure.mgmt.appcontainers import ContainerAppsAPIClient
from azure.identity import DefaultAzureCredential

from app.core.config import settings


class DeploymentService:
    """Handle Azure Container Apps deployment."""
    
    def __init__(self):
        self.subscription_id = settings.azure_subscription_id
        self.resource_group = settings.azure_resource_group
        self.container_env_name = settings.azure_container_env_name
        self.container_registry = settings.azure_container_registry
        self.base_image = settings.azure_base_image
        self._client = None
        self.active_demos: Dict[str, Dict] = {}
    
    def _get_client(self):
        """Get or create Azure Container Apps client."""
        if self._client is None:
            credential = DefaultAzureCredential()
            self._client = ContainerAppsAPIClient(
                credential=credential,
                subscription_id=self.subscription_id
            )
        return self._client
    
    def _generate_demo_id(self, user_id: str) -> str:
        """Generate unique demo identifier."""
        sanitized = user_id.split('@')[0].replace('.', '-').lower()[:10]
        timestamp = datetime.utcnow().strftime("%m%d%H%M")
        random_suffix = secrets.token_hex(2)
        return f"{sanitized}-{timestamp}-{random_suffix}"
    
    def _generate_app_name(self, demo_id: str) -> str:
        """Generate Container App name (DNS-compatible)."""
        app_name = f"demo-{demo_id}"[:32].rstrip('-')
        return app_name
    
    def _prepare_environment_variables(self) -> List[Dict[str, Any]]:
        """Prepare environment variables for container."""
        return [
            {"name": "ENVIRONMENT", "value": "demo"},
            {"name": "DISABLE_SSO", "value": "true"},
            {"name": "AZURE_OPENAI_ENDPOINT", "value": settings.azure_openai_endpoint},
            {"name": "AZURE_OPENAI_API_KEY", "secretRef": "azure-openai-key"},
            {"name": "AZURE_OPENAI_DEPLOYMENT_NAME", "value": settings.azure_openai_deployment_name},
            {"name": "SECRET_KEY", "secretRef": "secret-key"},
        ]
    
    def _prepare_secrets(self) -> List[Dict[str, str]]:
        """Prepare secrets for container."""
        return [
            {"name": "azure-openai-key", "value": settings.azure_openai_api_key},
            {"name": "secret-key", "value": settings.secret_key},
        ]
    
    async def deploy_demo(
        self,
        user_id: str,
        expiry_days: int = 7
    ) -> Dict[str, Any]:
        """Deploy a new demo Container App."""
        demo_id = self._generate_demo_id(user_id)
        app_name = self._generate_app_name(demo_id)
        
        try:
            print(f"🚀 Deploying demo: {demo_id}")
            
            env_vars = self._prepare_environment_variables()
            secrets = self._prepare_secrets()
            client = self._get_client()
            
            # ACR credentials
            acr_name = self.container_registry.split('.')[0]
            
            # Container App configuration
            container_app_envelope = {
                "location": "eastus",
                "properties": {
                    "managedEnvironmentId": f"/subscriptions/{self.subscription_id}/resourceGroups/{self.resource_group}/providers/Microsoft.App/managedEnvironments/{self.container_env_name}",
                    "configuration": {
                        "ingress": {
                            "external": True,
                            "targetPort": 8000,
                            "transport": "auto",
                            "allowInsecure": False
                        },
                        "registries": [{
                            "server": self.container_registry,
                            "username": acr_name,
                            "passwordSecretRef": "acr-password"
                        }],
                        "secrets": secrets + [
                            {"name": "acr-password", "value": settings.acr_password}
                        ]
                    },
                    "template": {
                        "containers": [{
                            "name": app_name,
                            "image": f"{self.container_registry}/{self.base_image}",
                            "resources": {
                                "cpu": 0.5,
                                "memory": "1Gi"
                            },
                            "env": env_vars
                        }],
                        "scale": {
                            "minReplicas": 0,
                            "maxReplicas": 3
                        }
                    }
                },
                "tags": {
                    "user_id": user_id,
                    "demo_id": demo_id
                }
            }
            
            print("   Creating Container App...")
            poller = client.container_apps.begin_create_or_update(
                resource_group_name=self.resource_group,
                container_app_name=app_name,
                container_app_envelope=container_app_envelope
            )
            
            print("   Waiting for deployment (this may take 3-5 minutes)...")
            result = poller.result(timeout=300)
            
            # Extract FQDN
            fqdn = result.properties.configuration.ingress.fqdn
            deployed_url = f"https://{fqdn}"
            
            # Track demo
            expiry_date = datetime.utcnow() + timedelta(days=expiry_days)
            self.active_demos[demo_id] = {
                "demo_id": demo_id,
                "user_id": user_id,
                "app_name": app_name,
                "url": deployed_url,
                "created_at": datetime.utcnow().isoformat(),
                "expires_at": expiry_date.isoformat(),
                "status": "active"
            }
            
            print(f"✅ Deployed! URL: {deployed_url}")
            
            return {
                "success": True,
                "demo_id": demo_id,
                "url": deployed_url,
                "app_name": app_name,
                "expires_at": expiry_date.isoformat()
            }
            
        except Exception as e:
            print(f"❌ Deployment failed: {e}")
            return {
                "success": False,
                "error": str(e),
                "demo_id": demo_id
            }
    
    async def delete_demo(self, demo_id: str) -> Dict[str, Any]:
        """Delete a demo Container App."""
        demo = self.active_demos.get(demo_id)
        if not demo:
            return {"success": False, "error": "Demo not found"}
        
        try:
            client = self._get_client()
            poller = client.container_apps.begin_delete(
                resource_group_name=self.resource_group,
                container_app_name=demo["app_name"]
            )
            poller.result(timeout=120)
            del self.active_demos[demo_id]
            return {"success": True, "demo_id": demo_id}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_demo_status(self, demo_id: str) -> Optional[Dict[str, Any]]:
        """Get demo status."""
        return self.active_demos.get(demo_id)
```

### 5. API Endpoint (app/api/deployment.py)

```python
"""Deployment API Routes"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.deployment_service import DeploymentService

router = APIRouter(prefix="/deployment", tags=["deployment"])

_deployment_service: Optional[DeploymentService] = None


def get_deployment_service() -> DeploymentService:
    """Get deployment service instance."""
    global _deployment_service
    if _deployment_service is None:
        _deployment_service = DeploymentService()
    return _deployment_service


class DeployRequest(BaseModel):
    """Deployment request model."""
    user_id: str
    expiry_days: int = 7


class DeployResponse(BaseModel):
    """Deployment response model."""
    success: bool
    demo_id: Optional[str] = None
    url: Optional[str] = None
    app_name: Optional[str] = None
    expires_at: Optional[str] = None
    error: Optional[str] = None


@router.post("/deploy", response_model=DeployResponse)
async def deploy_demo(request: DeployRequest):
    """Deploy a new demo instance to Azure Container Apps."""
    try:
        deployment_svc = get_deployment_service()
        result = await deployment_svc.deploy_demo(
            user_id=request.user_id,
            expiry_days=request.expiry_days
        )
        return DeployResponse(**result)
    except Exception as e:
        raise HTTPException(500, f"Deployment failed: {str(e)}")


@router.get("/status/{demo_id}")
async def get_demo_status(demo_id: str):
    """Get demo status."""
    deployment_svc = get_deployment_service()
    status = await deployment_svc.get_demo_status(demo_id)
    if not status:
        raise HTTPException(404, "Demo not found")
    return {"success": True, "data": status}


@router.delete("/delete/{demo_id}")
async def delete_demo(demo_id: str):
    """Delete a demo instance."""
    deployment_svc = get_deployment_service()
    result = await deployment_svc.delete_demo(demo_id)
    return result
```

### 6. Main Application (app/main.py)

```python
"""Main FastAPI application"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import deployment
from app.core.config import settings

app = FastAPI(
    title="MyApp with Azure Auto-Deploy",
    description="AI application with one-click Azure deployment",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(deployment.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "MyApp API is running", "environment": settings.environment}


@app.get("/health")
async def health():
    return {"status": "healthy"}
```

---

## 🎨 Frontend Implementation

### 1. Install Dependencies

**frontend/package.json:**
```json
{
  "name": "myapp-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "typescript": "^5.3.0"
  }
}
```

### 2. Deploy Page Component (frontend/src/pages/DeployPage.tsx)

```typescript
import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1'
});

const DeployPage: React.FC = () => {
  const [userId, setUserId] = useState('demo-user');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!confirm('Deploy demo to Azure? This will create a new Container App.')) {
      return;
    }

    setIsDeploying(true);
    setError(null);
    setDeployedUrl(null);

    try {
      const response = await api.post('/deployment/deploy', {
        user_id: userId,
        expiry_days: 7
      });

      if (response.data.success) {
        setDeployedUrl(response.data.url);
        alert(`✅ Deployment successful!\n\nURL: ${response.data.url}\n\nExpires: ${new Date(response.data.expires_at).toLocaleDateString()}`);
      } else {
        setError(response.data.error || 'Deployment failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to deploy. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Azure Auto-Deploy Demo</h1>
      
      <div style={{ marginTop: '30px' }}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', width: '200px' }}
          />
        </label>
      </div>

      <button
        onClick={handleDeploy}
        disabled={isDeploying}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: isDeploying ? '#ccc' : '#0078D4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isDeploying ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {isDeploying ? '🚀 Deploying...' : '☁️ Deploy to Azure'}
      </button>

      {deployedUrl && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <h3 style={{ color: '#155724' }}>✅ Deployment Successful!</h3>
          <p>
            <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
              {deployedUrl}
            </a>
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(deployedUrl);
              alert('URL copied!');
            }}
            style={{ padding: '8px 16px', marginTop: '10px' }}
          >
            📋 Copy URL
          </button>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24'
        }}>
          ❌ Error: {error}
        </div>
      )}

      <div style={{ marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <h3>How it works:</h3>
        <ol>
          <li>Click "Deploy to Azure"</li>
          <li>Backend creates Container App with unique ID</li>
          <li>Azure pulls Docker image and starts container</li>
          <li>You get a public HTTPS URL in 3-5 minutes</li>
          <li>Demo expires in 7 days (auto-cleanup)</li>
        </ol>
      </div>
    </div>
  );
};

export default DeployPage;
```

### 3. Main App (frontend/src/App.tsx)

```typescript
import React from 'react';
import DeployPage from './pages/DeployPage';

function App() {
  return <DeployPage />;
}

export default App;
```

---

## 🐳 Docker Configuration

### Dockerfile

```dockerfile
# Build frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Python backend
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app/ ./app/
COPY .env .

# Copy built frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### .dockerignore

```
__pycache__
*.pyc
*.pyo
*.pyd
.Python
*.so
*.egg
*.egg-info
dist
build
.venv
venv
.git
.gitignore
.env.local
node_modules
.DS_Store
```

---

## 🧪 Testing & Deployment

### 1. Test Locally

```bash
# Start backend
uvicorn app.main:app --reload --port 8000

# In another terminal, start frontend
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

### 2. Build Docker Image

```bash
# Build
docker build -t myapp-base:latest .

# Test locally
docker run -p 8000:8000 --env-file .env myapp-base:latest
```

### 3. Push to Azure Container Registry

```bash
# Login to ACR
az acr login --name myappdemosacr

# Tag image
docker tag myapp-base:latest myappdemosacr.azurecr.io/myapp-base:latest

# Push
docker push myappdemosacr.azurecr.io/myapp-base:latest
```

### 4. Update .env

```bash
AZURE_BASE_IMAGE=myapp-base:latest
```

### 5. Test Deployment

```bash
# Start your app
uvicorn app.main:app --reload

# Visit frontend and click "Deploy to Azure"
# Should create Container App and return URL
```

---

## 🔒 Production Considerations

### 1. Security Best Practices

```python
# ❌ DON'T: Store secrets in code
api_key = "abc123"

# ✅ DO: Use environment variables
api_key = os.getenv("API_KEY")

# ✅ DO: Use Azure Key Vault for production
from azure.keyvault.secrets import SecretClient
secret = secret_client.get_secret("api-key")
```

### 2. Demo Cleanup (Cron Job)

Add to deployment service:

```python
async def cleanup_expired_demos(self):
    """Delete demos past expiry date."""
    now = datetime.utcnow()
    for demo_id, demo in list(self.active_demos.items()):
        expiry = datetime.fromisoformat(demo["expires_at"])
        if now > expiry:
            await self.delete_demo(demo_id)
```

Run daily:
```bash
# Add cron job or Azure Function Timer
0 0 * * * python -c "from app.services.deployment_service import DeploymentService; import asyncio; asyncio.run(DeploymentService().cleanup_expired_demos())"
```

### 3. Monitoring

Add Application Insights:

```python
from opencensus.ext.azure.log_exporter import AzureLogHandler

logger.addHandler(AzureLogHandler(
    connection_string='InstrumentationKey=your-key'
))
```

### 4. Cost Management

```python
# Set resource limits
"resources": {
    "cpu": 0.5,        # 0.5 vCPU
    "memory": "1Gi"    # 1GB RAM
}

# Auto-scale to zero when idle
"scale": {
    "minReplicas": 0,  # Scale to zero = $0 when not used
    "maxReplicas": 3
}
```

### 5. Rate Limiting

```python
from fastapi import Request
from fastapi.responses import JSONResponse
import time

# Simple in-memory rate limiter
rate_limits = {}

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    now = time.time()
    
    if client_ip in rate_limits:
        if now - rate_limits[client_ip] < 60:  # 1 deploy per minute
            return JSONResponse(
                status_code=429,
                content={"error": "Rate limit exceeded. Try again in 60 seconds."}
            )
    
    rate_limits[client_ip] = now
    return await call_next(request)
```

---

## 📊 Estimated Costs

**Azure Container Apps Pricing (Pay-per-use):**

| Resource | Cost | Notes |
|----------|------|-------|
| Idle (scaled to 0) | **$0/month** | No charge when not running |
| Active (1 demo, 0.5 vCPU, 1GB) | ~$0.05/hour | ~$36/month if running 24/7 |
| Container Registry | ~$5/month | Basic tier |
| Egress (data transfer) | ~$0.08/GB | First 100GB free/month |

**Estimated Monthly Cost:**
- 10 demos × 4 hours/week = **~$8/month**
- Container Registry = **$5/month**
- **Total: ~$13/month** for moderate usage

**Tips to minimize costs:**
- Set `minReplicas: 0` (scale to zero)
- Use Basic ACR tier
- Delete old demos automatically
- Set low CPU/memory limits

---

## 🎯 Summary Checklist

**Azure Resources:**
- ✅ Resource Group created
- ✅ Container Registry with admin enabled
- ✅ Container Apps Environment created
- ✅ Azure OpenAI resource with GPT-4 deployment

**Credentials Collected:**
- ✅ AZURE_SUBSCRIPTION_ID
- ✅ AZURE_OPENAI_ENDPOINT
- ✅ AZURE_OPENAI_API_KEY
- ✅ ACR_PASSWORD
- ✅ SECRET_KEY generated

**Code Implemented:**
- ✅ Backend deployment service
- ✅ API endpoints
- ✅ Frontend deploy button
- ✅ Dockerfile configured

**Deployment:**
- ✅ Docker image built and pushed to ACR
- ✅ .env configured
- ✅ Tested locally
- ✅ Tested Azure deployment

---

## 🚀 Next Steps

1. **Customize for your use case:**
   - Add your AI features (chat, RAG, etc.)
   - Customize frontend UI
   - Add authentication

2. **Enhance deployment:**
   - Add custom domains
   - Implement SSL certificates
   - Add monitoring dashboards

3. **Scale:**
   - Add database (Azure Cosmos DB)
   - Add Redis for caching
   - Add Azure Functions for background jobs

4. **Productionize:**
   - Move secrets to Azure Key Vault
   - Add CI/CD pipeline (GitHub Actions)
   - Implement logging and alerting

---

## 📚 Additional Resources

- [Azure Container Apps Docs](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Azure SDK for Python](https://learn.microsoft.com/en-us/python/api/overview/azure/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Questions or issues?** 
- Check Azure Portal → Container Apps for deployment logs
- Use `az containerapp logs show` to debug
- Verify ACR password is correct
- Ensure subscription has quota for Container Apps

---

**🎉 Congratulations!** You now have a complete AI application with one-click Azure deployment capability.
