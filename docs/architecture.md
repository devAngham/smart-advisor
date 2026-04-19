# 🏗️ Architecture Overview — Smart Advisor
 
## System Design
 
Smart Advisor follows a **layered architecture** pattern to ensure separation of concerns, maintainability, and scalability.
 
---
 
## Architecture Layers
 
```
┌─────────────────────────────────┐
│           Client (API consumer) │
└────────────────┬────────────────┘
                 │ HTTP Requests
┌────────────────▼────────────────┐
│         Routes Layer            │  ← Defines endpoints
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│       Middleware Layer          │  ← Auth, validation
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│      Controllers Layer          │  ← Handles requests/responses
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│       Services Layer            │  ← Business logic + AI calls
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│         Prisma ORM              │  ← Database queries
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│         PostgreSQL              │  ← Data storage
└─────────────────────────────────┘
```
 
---
 
## Layer Responsibilities
 
### Routes
- Define API endpoints and HTTP methods
- Connect endpoints to their controllers
- Apply middleware per route
### Middleware
- **Auth middleware** — validates JWT tokens
- Protects private routes from unauthenticated access
### Controllers
- Receive HTTP requests
- Validate request data
- Call the appropriate service
- Return HTTP responses
### Services
- Contain all business logic
- Interact with Prisma for database operations
- Call external APIs (Claude AI, market data)
- Are independent of HTTP (easy to test)
---
 
## External Integrations
 
```
Smart Advisor API
       │
       ├── Anthropic Claude API  ← AI financial advice & chat
       └── PostgreSQL            ← Data persistence
```
 
---
 
## Request Lifecycle Example
 
**`POST /advisor/chat`**
 
```
1. Request arrives at Express server
2. Auth middleware validates JWT token
3. Router forwards to AdvisorController
4. Controller extracts message from request body
5. AdvisorService fetches user's portfolio from DB via Prisma
6. AdvisorService sends message + portfolio context to Claude API
7. Claude returns AI response
8. Service saves conversation to Chat table
9. Controller returns response to client
```
 
---
 
## Folder Structure
 
```
src/
├── config/
│   └── prisma.ts          # Prisma client singleton
├── controllers/
│   ├── auth.controller.ts
│   ├── portfolio.controller.ts
│   └── advisor.controller.ts
├── middleware/
│   └── auth.middleware.ts  # JWT verification
├── routes/
│   ├── auth.routes.ts
│   ├── portfolio.routes.ts
│   └── advisor.routes.ts
├── services/
│   ├── ai.service.ts       # Claude API integration
│   └── market.service.ts   # Market data (future)
├── types/
│   └── index.ts            # All TypeScript interfaces
└── index.ts                # App entry point
```
 
---
 
## Design Decisions
 
| Decision | Choice | Reason |
|----------|--------|--------|
| Language | TypeScript | Type safety, better DX |
| Framework | Express | Mature, large ecosystem |
| ORM | Prisma | TypeScript-first, clean API |
| Database | PostgreSQL | Relational data, strong consistency |
| AI | Claude API | Best-in-class reasoning for financial advice |
| Auth | JWT | Stateless, scalable |