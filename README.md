# Smart Advisor — AI-Powered Financial Advisor API
 
> A production-ready AI Agent API that allows users to manage their investment portfolio through natural language conversation — powered by Node.js, TypeScript, Groq LLaMA, and MCP Tool Use.

🌐 **Live API:** smart-advisor-production.up.railway.app
 
---

## What Makes This Different?

Most AI chatbots respond with **text only**.  
Smart Advisor is a full **AI Agent** — it understands intent and executes real actions:
 
```
User: "Add Tesla stocks worth $2000 to my portfolio"
AI:    → Detects intent → Calls add_asset tool → Writes to DB ✅
       → "Tesla stocks have been added to your portfolio!"
```
 
```
User: "ما رأيك في محفظتي الحالية؟"
AI:    → Responds in Arabic automatically
```
 
---

## Key Features
 
- **AI Agent with MCP Tool Use** — AI executes real database operations via natural language
- **Multi-language Support** — Arabic, English, French (auto-detected)
- **Dynamic Risk Score** — Weighted Beta coefficient calculator per asset class
- **JWT Authentication** — Secure register & login
- **Portfolio Management** — Full CRUD for portfolio and assets
- **Chat History** — Persistent conversation memory
- **Docker Ready** — Containerized for consistent deployment
- **Zod Validation** — Type-safe input validation on all endpoints
---

## Tech Stack
 
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18 |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| AI Model | Groq LLaMA 3.3 70B |
| AI Protocol | MCP Tool Use (Function Calling) |
| Auth | JWT + bcrypt |
| Validation | Zod |
| DevOps | Docker + Railway |
 
---

## 🚀 Quick Start
 
### Prerequisites
- Node.js 18+
- PostgreSQL
- Groq API Key (free at [console.groq.com](https://console.groq.com))

### Installation
 
```bash
# Clone
git clone https://github.com/devAngham/smart-advisor.git
cd smart-advisor
 
# Install dependencies
npm install
 
# Setup environment
cp .env.example .env
# Fill in your values
 
# Run migrations
npm run migrate
 
# Start development server
npm run dev
```

### Docker
 
```bash
docker-compose up --build
```
 
---
 
## Environment Variables
 
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/smart_advisor
JWT_SECRET=your-secret-key
GROQ_API_KEY=gsk_your_groq_key
PORT=3000
```
 
---
## API Endpoints
 
### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login & get JWT token |
 
### Portfolio
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/portfolio` | Create portfolio |
| GET | `/portfolio` | Get portfolio with assets |
| POST | `/portfolio/assets` | Add investment asset |
| DELETE | `/portfolio/assets/:id` | Remove asset |
| GET | `/portfolio/risk-score` | Get dynamic risk score |
 
### AI Advisor
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/advisor/chat` | Chat with AI advisor |
| GET | `/advisor/chat/history` | Get chat history |
 
---
 
## MCP Tool Use — How It Works
 
The AI advisor supports 3 tools that execute automatically based on user intent:
 
| Tool | Trigger Example | Action |
|------|----------------|--------|
| `add_asset` | "Add gold worth $500" | Creates asset in DB |
| `delete_asset` | "Remove asset 3" | Deletes asset from DB |
| `get_portfolio` | "Show my investments" | Returns portfolio data |
 
**No tool name needed in the request** — the AI decides automatically.
 
---
 
## Risk Score Calculator
 
Dynamic risk scoring using Beta coefficients:
 
| Asset | Risk Score |
|-------|-----------|
| Cash | 0 |
| Gold | 15 |
| ETF | 50 |
| Stocks | 65 |
| Crypto | 95 |
 
**Formula:** `Score = Σ(amount × weight) / Σ(amount)`
 
---
 
## Testing
 
See the full testing guide: [docs/testing-guide.md](./docs/testing-guide.md)
 
Quick test with the live API:
 
```bash
# Register
curl -X POST https://smart-advisor-production.up.railway.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```
 
---
 
## 📖 Documentation
 
| Document | Description |
|----------|-------------|
| [User Stories](./docs/user-stories.md) | All features as user stories |
| [API Documentation](./docs/api-documentation.md) | Full API reference |
| [Database Schema](./docs/database-schema.md) | Database design |
| [Architecture](./docs/architecture.md) | System design overview |
| [Testing Guide](./docs/testing-guide.md) | How to test all endpoints |
| [Deployment Guide](./docs/deployment.md) | Docker & Railway setup |
 
---
 
## 👩‍💻 Author
 
**Angham Abuabed** — Backend Engineer | Node.js · TypeScript · AI Engineering
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/angham-aabed)
 
---