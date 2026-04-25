# 📡 API Documentation — Smart Advisor
 
## Base URL
```
http://localhost:3000
```
 
## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```
 
---
 
## 🔐 Auth Endpoints
 
### POST `/auth/register`
Register a new user.
 
**Request Body:**
```json
{
  "name": "Angham Abuabed",
  "email": "angham@example.com",
  "password": "securepassword123"
}
```
 
**Response `201`:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "Angham Abuabed",
      "email": "angham@example.com"
    }
  }
}
```
 
---
 
### POST `/auth/login`
Login with existing credentials.
 
**Request Body:**
```json
{
  "email": "angham@example.com",
  "password": "securepassword123"
}
```
 
**Response `200`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "Angham Abuabed",
      "email": "angham@example.com"
    }
  }
}
```
 
---
 
## 💼 Portfolio Endpoints
 
### POST `/portfolio`
🔒 Protected — Create user portfolio.
 
**Request Body:**
```json
{
  "monthlyIncome": 3000,
  "monthlySavings": 500,
  "riskLevel": "medium",
  "goal": "retirement",
  "targetAmount": 100000,
  "targetDate": "2035-01-01"
}
```
 
**Response `201`:**
```json
{
  "success": true,
  "message": "Portfolio created successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "monthlyIncome": 3000,
    "monthlySavings": 500,
    "riskLevel": "medium",
    "goal": "retirement",
    "targetAmount": 100000,
    "targetDate": "2035-01-01T00:00:00.000Z",
    "assets": [],
    "createdAt": "2026-04-18T10:00:00.000Z"
  }
}
```
 
---
 
### GET `/portfolio`
🔒 Protected — Get user portfolio with all assets.
 
**Response `200`:**
```json
{
  "success": true,
  "message": "Portfolio retrieved successfully",
  "data": {
    "id": 1,
    "monthlyIncome": 3000,
    "monthlySavings": 500,
    "riskLevel": "medium",
    "goal": "retirement",
    "targetAmount": 100000,
    "targetDate": "2035-01-01T00:00:00.000Z",
    "assets": [
      {
        "id": 1,
        "type": "stocks",
        "name": "Apple Inc.",
        "amount": 2000,
        "createdAt": "2026-04-18T10:00:00.000Z"
      }
    ]
  }
}
```
 
---
 
### POST `/portfolio/assets`
🔒 Protected — Add an asset to portfolio.
 
**Request Body:**
```json
{
  "type": "stocks",
  "name": "Apple Inc.",
  "amount": 2000
}
```
 
**Asset types:** `stocks` | `gold` | `ETF` | `crypto` | `cash`
 
**Response `201`:**
```json
{
  "success": true,
  "message": "Asset added successfully",
  "data": {
    "id": 1,
    "type": "stocks",
    "name": "Apple Inc.",
    "amount": 2000,
    "portfolioId": 1,
    "createdAt": "2026-04-18T10:00:00.000Z"
  }
}
```
 
---
 
### DELETE `/portfolio/assets/:id`
🔒 Protected — Remove an asset from portfolio.
 
**Response `200`:**
```json
{
  "success": true,
  "message": "Asset removed successfully",
  "data": null
}
```
 
---
 
## 🤖 Advisor Endpoints
 
### POST `/advisor/analyze`
🔒 Protected — Get AI-powered financial analysis.
 
**Response `200`:**
```json
{
  "success": true,
  "message": "Analysis completed",
  "data": {
    "analysis": "Based on your monthly savings of $500 and a medium risk tolerance, here is your personalized plan...",
    "recommendations": [
      "Invest 40% in diversified ETFs",
      "Keep 20% in gold as a hedge",
      "Maintain 3 months emergency fund in cash"
    ]
  }
}
```
 
---
 
### POST `/advisor/chat`
🔒 Protected — Send a message to the AI advisor.
 
**Request Body:**
```json
{
  "message": "Should I invest in crypto given my risk level?"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Response generated",
  "data": {
    "chatId": 1,
    "reply": "Given your medium risk profile and retirement goal, a small crypto allocation (5-10%) could be considered..."
  }
}
```
### 🤖 MCP Tool Use
The AI advisor supports tool use via MCP (Model Context Protocol). 
The AI automatically detects the user's intent and executes the appropriate action.

**Available Tools:**

| Tool | Trigger Example | Action |
|------|----------------|--------|
| `add_asset` | "Add Tesla stocks worth $2000" | Creates asset in DB |
| `delete_asset` | "Delete asset with id 3" | Removes asset from DB |
| `get_portfolio` | "Show my current portfolio" | Returns portfolio data |

**Note:** No tool name is required in the request — the AI decides automatically.

### 🌍 Multi-language Support
The AI advisor automatically detects the language of the user's message and responds in the same language. No additional configuration is required.

**Examples:**
- Arabic: `"ما رأيك في محفظتي الحالية؟"`
- French: `"Quel est le meilleur moment pour investir?"`
- English: `"Should I invest more in stocks?"`

---
 
### GET `/advisor/chat/history`
🔒 Protected — Get all chat sessions.
 
**Response `200`:**
```json
{
  "success": true,
  "message": "Chat history retrieved",
  "data": [
    {
      "id": 1,
      "messages": [
        { "role": "user", "content": "Should I invest in crypto?" },
        { "role": "assistant", "content": "Given your medium risk profile..." }
      ],
      "createdAt": "2026-04-18T10:00:00.000Z"
    }
  ]
}
```

---
 
## ❌ Error Responses
 
All errors follow this format:
 
```json
{
  "success": false,
  "message": "Error description here",
  "data": null
}
```
 
| Status Code | Meaning |
|-------------|---------|
| `400` | Bad Request — missing or invalid fields |
| `401` | Unauthorized — missing or invalid token |
| `403` | Forbidden — accessing another user's data |
| `404` | Not Found — resource doesn't exist |
| `500` | Internal Server Error |