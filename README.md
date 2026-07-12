# OdooHackathon2026_Team-GearUP

AssetFlow is a full-stack hackathon project with a React/Vite frontend and a Django/MySQL backend.

## Project Structure

- `backend/` - Django REST API backend
- `frontend/` - React + Vite frontend application
- `.gitignore` - files excluded from version control

## Quick Start

### Backend

1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create your MySQL database:
   ```sql
   CREATE DATABASE assetflow_db;
   ```
4. Configure database credentials using environment variables or edit `backend/assetflow_backend/settings.py`.
5. Run migrations:
   ```bash
   python manage.py makemigrations api
   python manage.py migrate
   ```
6. Start the backend server:
   ```bash
   python manage.py runserver
   ```

The API is available at `http://127.0.0.1:8000/api/`.

### Frontend

1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173/` by default.

## Project Notes

- The backend is built with Django and Django REST Framework.
- The frontend is built with React, Vite, and lucide-react icons.
- Avoid committing generated build artifacts and dependency caches.

## Additional Documentation

- See `backend/README.md` for backend-specific setup.
- See `CONTRIBUTING.md` for contribution guidance.
- See `CODE_OF_CONDUCT.md` for community behavior expectations.
- See `SECURITY.md` for vulnerability reporting.

## Documentation Links

- [README](./readme.md)
- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
