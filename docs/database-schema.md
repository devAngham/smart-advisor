# 🗄️ Database Schema — Smart Advisor
 
## Overview
 
Smart Advisor uses **PostgreSQL** as the database, managed through **Prisma ORM**.
 
---
 
## Entity Relationship
 
```
User (1) ──────── (1) Portfolio
                        │
                      (many)
                       Asset
 
User (1) ──────── (many) Chat
```
 
---
 
## Tables
 
### `User`
Stores authentication and identity information.
 
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | Int | PK, Auto-increment | Unique identifier |
| `name` | String | Required | Full name |
| `email` | String | Required, Unique | Login email |
| `password` | String | Required | Bcrypt hashed password |
| `createdAt` | DateTime | Default: now() | Registration date |
 
---
 
### `Portfolio`
Stores the user's financial profile and investment goals.
 
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | Int | PK, Auto-increment | Unique identifier |
| `userId` | Int | FK → User, Unique | One portfolio per user |
| `monthlyIncome` | Float | Required | Monthly income in USD |
| `monthlySavings` | Float | Required | Monthly savings in USD |
| `riskLevel` | String | Required | `low`, `medium`, or `high` |
| `goal` | String | Required | `retirement`, `house`, `education`, `wealth` |
| `targetAmount` | Float | Required | Target amount in USD |
| `targetDate` | DateTime | Required | Target achievement date |
| `createdAt` | DateTime | Default: now() | Creation date |
 
---
 
### `Asset`
Represents individual investments within a portfolio.
 
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | Int | PK, Auto-increment | Unique identifier |
| `portfolioId` | Int | FK → Portfolio | Owner portfolio |
| `type` | String | Required | `stocks`, `gold`, `ETF`, `crypto`, `cash` |
| `name` | String | Required | Asset name (e.g. "Apple Inc.") |
| `amount` | Float | Required | Invested amount in USD |
| `createdAt` | DateTime | Default: now() | Purchase date |
 
---
 
### `Chat`
Stores AI conversation history per user.
 
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | Int | PK, Auto-increment | Unique identifier |
| `userId` | Int | FK → User | Chat owner |
| `messages` | Json | Required | Full conversation array |
| `createdAt` | DateTime | Default: now() | Chat start date |
 
**Messages JSON structure:**
```json
[
  { "role": "user", "content": "How should I invest $10,000?" },
  { "role": "assistant", "content": "Based on your medium risk profile..." }
]
```
 
---
 
## Relationships
 
| Relationship | Type | Description |
|-------------|------|-------------|
| User → Portfolio | One-to-One | Each user has at most one portfolio |
| Portfolio → Asset | One-to-Many | A portfolio holds multiple assets |
| User → Chat | One-to-Many | A user can have multiple chat sessions |
 
---
 
## Prisma Schema
 
```prisma
model User {
  id        Int        @id @default(autoincrement())
  name      String
  email     String     @unique
  password  String
  portfolio Portfolio?
  chats     Chat[]
  createdAt DateTime   @default(now())
}
 
model Portfolio {
  id             Int      @id @default(autoincrement())
  userId         Int      @unique
  user           User     @relation(fields: [userId], references: [id])
  monthlyIncome  Float
  monthlySavings Float
  riskLevel      String
  goal           String
  targetAmount   Float
  targetDate     DateTime
  assets         Asset[]
  createdAt      DateTime @default(now())
}
 
model Asset {
  id          Int       @id @default(autoincrement())
  portfolioId Int
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id])
  type        String
  name        String
  amount      Float
  createdAt   DateTime  @default(now())
}
 
model Chat {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  messages  Json
  createdAt DateTime @default(now())
}
```