# Microfinance Loan Origination System

A production-ready microfinance loan origination platform built with:
- React + Vite + Tailwind CSS
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Docker + Docker Compose
- Azure deployment ready

## Features
- Head Office and 11 branches
- Branch-level roles:
  - Branch Creator
  - Branch Authorizer
- User management
- Product master
- CRS master
- Center master
- Customer creation
- Loan origination
- Guarantor management
- Approval workflow
- Dashboard
- Reports
- Audit logs

## Organization Structure
- 1 Head Office (Super Admin)
- 11 Branches
- Each branch has:
  - 1 Creator
  - 1 Authorizer

## Customer Number
CUS00000001

## Loan Number
BranchCode-ProductCode-CustomerNo-RunningNo

## Example
- Branch: BR01
- Product: PROD01
- Customer No: CUS00000001
- Running No: 0001
- Loan Number: BR01-PROD01-CUS00000001-0001

## Default Roles
- super_admin
- branch_creator
- branch_authorizer
- branch_manager
- loan_officer
- accountant
- collection_officer
- auditor

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Express
- PostgreSQL
- JWT
- Docker Compose

## Quick Start (Docker Compose)
1. Copy environment files if needed.
2. Start the stack:

```bash
docker compose up --build
```

3. Open:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

## Manual Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Database Setup
```bash
psql -U postgres -d microfinance -f backend/src/db/schema.sql
psql -U postgres -d microfinance -f backend/src/db/seed.sql
```

## Default Login
Use the seeded users from backend/src/db/seed.sql.

Example:
- Email: admin@headoffice.com
- Password: Admin@123

## Loan Form Fields
See: docs/loan-form-fields.md

## Azure Deployment
This project includes Azure-ready deployment assets in the `azure/` folder.

## License
MIT
