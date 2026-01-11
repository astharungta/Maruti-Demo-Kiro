# Dealer Management System (DMS)

A full-stack application for managing vehicle warranties with React frontend and .NET backend.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Radix UI, Recharts
- **Backend**: .NET 9.0 Web API, ASP.NET Core

## Features

- Dashboard with KPI cards and analytics
- Warranty management workflow
- Vehicle inventory tracking
- Lead and sales management
- Service management
- Reports and analytics

## Getting Started

### Prerequisites

- Node.js 24.x or higher
- .NET 9.0 SDK
- npm or yarn

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Backend is already set up in the `backend` folder

### Running the Application

#### Option 1: Run both servers manually

**Terminal 1 - Backend (.NET API):**
```bash
cd backend
dotnet run
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend (React):**
```bash
npm run dev
```
Frontend will run on: http://localhost:5173

#### Option 2: Use the provided scripts

```bash
# Start backend
npm run start:backend

# Start frontend
npm run dev
```

### API Endpoints

- `GET /api/warranty` - Get all warranties
- `GET /api/warranty/{id}` - Get warranty by ID
- `POST /api/warranty` - Create new warranty
- `GET /api/warranty/expiring` - Get expiring warranties
- `GET /api/warranty/stats` - Get warranty statistics

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── components/     # React components
│   │   └── App.tsx         # Main app component
│   ├── services/           # API services
│   └── styles/             # CSS styles
├── backend/
│   ├── Controllers/        # API controllers
│   ├── Models/             # Data models
│   └── Program.cs          # Backend entry point
└── package.json
```

## Development

- Frontend runs on Vite dev server with hot reload
- Backend runs with dotnet watch for automatic recompilation
- CORS is configured to allow frontend-backend communication

## License

Private project
