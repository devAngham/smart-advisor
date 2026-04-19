# 📋 User Stories — Smart Advisor
 
## Overview
 
Smart Advisor serves three types of users based on their investment experience.
 
---
 
## 👤 User Types
 
| Type | Description |
|------|-------------|
| **Beginner** | No investment experience, wants to learn and start |
| **Saver** | Has savings, ready to invest but unsure how |
| **Investor** | Active investor, wants to optimize their portfolio |
 
---
 
## 🔐 Authentication
 
### US-001 — Register
> As a **new user**, I want to create an account so that I can access personalized financial advice.
 
**Acceptance Criteria:**
- User provides name, email, and password
- Password is securely hashed before storage
- System returns a JWT token upon success
- Email must be unique in the system
---
 
### US-002 — Login
> As a **returning user**, I want to log in so that I can access my portfolio and chat history.
 
**Acceptance Criteria:**
- User provides email and password
- System validates credentials and returns JWT token
- Invalid credentials return a 401 error
---
 
## 💼 Portfolio Management
 
### US-003 — Create Portfolio
> As a **user**, I want to set up my financial profile so that the AI can give me personalized advice.
 
**Acceptance Criteria:**
- User inputs monthly income, savings, risk level, goal, target amount, and target date
- System creates a portfolio linked to the user
- Each user can have only one portfolio
**Risk levels:** `low` | `medium` | `high`
 
**Goals:** `retirement` | `house` | `education` | `wealth`
 
---
 
### US-004 — Add Asset
> As a **user**, I want to add investments to my portfolio so that I can track what I own.
 
**Acceptance Criteria:**
- User adds asset type, name, and amount
- Asset is linked to the user's portfolio
- Multiple assets can be added
**Asset types:** `stocks` | `gold` | `ETF` | `crypto` | `cash`
 
---
 
### US-005 — View Portfolio
> As a **user**, I want to view my complete portfolio so that I can see all my investments in one place.
 
**Acceptance Criteria:**
- Returns user profile with all assets
- Shows total portfolio value
- Includes portfolio creation date
---
 
### US-006 — Remove Asset
> As a **user**, I want to remove an asset from my portfolio when I sell or exit an investment.
 
**Acceptance Criteria:**
- User can delete any asset they own
- Cannot delete assets belonging to other users
- Returns confirmation on success
---
 
## 🤖 AI Advisor
 
### US-007 — Get Financial Analysis
> As a **user**, I want the AI to analyze my financial situation so that I get a personalized investment plan.
 
**Acceptance Criteria:**
- AI reads the user's portfolio data
- Returns analysis covering: current status, strengths, risks, and recommendations
- Response is tailored to the user's risk level and goal
---
 
### US-008 — Chat with Advisor
> As a **user**, I want to have a conversation with the AI advisor so that I can ask specific financial questions.
 
**Acceptance Criteria:**
- User sends a message and receives an AI response
- Chat history is maintained across sessions
- AI is aware of the user's financial profile during the conversation
---
 
### US-009 — View Chat History
> As a **user**, I want to review my past conversations so that I can refer back to previous advice.
 
**Acceptance Criteria:**
- Returns all previous chat sessions for the user
- Each chat includes messages and timestamp
- Sorted by most recent first
---
 
## 🔒 Security Requirements
 
- All endpoints (except register/login) require a valid JWT token
- Users can only access their own data
- Passwords are never returned in any response
- API keys are stored in environment variables only
---
 
## 📊 Priority Matrix
 
| Story | Priority | Complexity | Sprint |
|-------|----------|------------|--------|
| US-001 Register | 🔴 High | Low | 1 |
| US-002 Login | 🔴 High | Low | 1 |
| US-003 Create Portfolio | 🔴 High | Medium | 1 |
| US-004 Add Asset | 🟡 Medium | Low | 2 |
| US-005 View Portfolio | 🟡 Medium | Low | 2 |
| US-006 Remove Asset | 🟡 Medium | Low | 2 |
| US-007 AI Analysis | 🔴 High | High | 2 |
| US-008 AI Chat | 🔴 High | High | 3 |
| US-009 Chat History | 🟢 Low | Low | 3 |
 