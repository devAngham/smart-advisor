# 🧪 Testing Guide — Smart Advisor

## Base URL
http://localhost:3000

## Authentication
All protected endpoints require:
Authorization: Bearer <your_jwt_token>


---

## 1️⃣ Register & Login

### Register
```json
POST /auth/register
{
  "name": "Angham",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```json
POST /auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 2️⃣ Portfolio

### Create Portfolio
```json
POST /portfolio
{
  "monthlyIncome": 3000,
  "monthlySavings": 500,
  "riskLevel": "medium",
  "goal": "retirement",
  "targetAmount": 100000,
  "targetDate": "2035-01-01"
}
```

### Get Portfolio

GET /portfolio

### Add Asset
```json
POST /portfolio/assets
{
  "name": "Apple Inc.",
  "type": "stocks",
  "amount": 2000
}
```

### Delete Asset

DELETE /portfolio/assets/:id

### Get Risk Score

GET /portfolio/risk-score

---

## 3️⃣ AI Advisor Chat

### English — General Question (text response)
```json
POST /advisor/chat
{ "message": "What is the difference between ETF and stocks?" }
```

### English — Add Asset via Chat (MCP Tool Use)
```json
{ "message": "I want to add crypto worth $300 to my portfolio" }
```

### English — View Portfolio via Chat
```json
{ "message": "What assets do I currently have?" }
```

### Arabic — Multi-language Support
```json
{ "message": "ما هو مستوى خطورة محفظتي وكيف أحسّنها؟" }
```

### Arabic — Add Asset via Chat
```json
{ "message": "أضف ذهب بقيمة 500 دولار لمحفظتي" }
```

### French — General Advice
```json
{ "message": "Quel est le meilleur moment pour investir dans les actions?" }
```

### Get Chat History

GET /advisor/chat/history 

---

## 4️⃣ Expected Behaviors

| Message Type | Expected Response |
|-------------|-------------------|
| General financial question | Text advice in user's language |
| "Add [asset] worth $X" | Asset added to DB ✅ |
| "Show my portfolio" | Portfolio data returned ✅ |
| "Delete asset [id]" | Asset removed from DB ✅ |
| Invalid email | "Invalid email address" |
| Short password | "String must contain at least 8 character(s)" |
| No token | "No token provided" |

---

## 5️⃣ Validation Testing

### Invalid Email
```json
POST /auth/login
{
  "email": "notanemail",
  "password": "password123"
}
```
Expected: `400 — "Invalid email address"`

### Short Password
```json
{
  "email": "test@test.com",
  "password": "123"
}
```
Expected: `400 — "String must contain at least 8 character(s)"`

### Missing Token
GET /portfolio

Expected: `401 — "No token provided"`
