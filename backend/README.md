# AssetFlow Backend - Django & MySQL Setup Guide

This is the Django backend server for AssetFlow. It exposes REST API endpoints for assets, resource bookings, transfer requests, audit checklists, and notifications.

---

## 🛠️ Prerequisites

1. **Python 3.8+** installed on your system.
2. **MySQL Server** installed, with **MySQL Workbench** or command line access.

---

## 🚀 Setup Instructions

### 1. Database Creation
Before starting the server, log into your MySQL command line or MySQL Workbench and run:
```sql
CREATE DATABASE assetflow_db;
```

### 2. Configure Credentials
You can define your database credentials using environment variables:
- `DB_NAME` (default: `assetflow_db`)
- `DB_USER` (default: `root`)
- `DB_PASSWORD` (default: empty string, or configure your password)
- `DB_HOST` (default: `127.0.0.1`)
- `DB_PORT` (default: `3306`)

Alternatively, you can edit [backend/assetflow_backend/settings.py](file:///c:/DHRUV's_Zone/odoo2026/OdooHackathon2026_Team-GearUP/backend/assetflow_backend/settings.py) directly under the "Database Configuration" section.

### 3. Installation
Navigate to the `backend` directory and install the requirements:
```bash
pip install -r requirements.txt
```

*Note: If you run into issues installing the native `mysqlclient` package on Windows, you can install the pure-python alternative `pymysql` or run django's automatic fallback to SQLite by simply skipping `mysqlclient` installation.*

### 4. Run Database Migrations
Create and run database tables inside your MySQL database:
```bash
python manage.py makemigrations api
python manage.py migrate
```

### 5. Start Django Development Server
Launch the backend server:
```bash
python manage.py runserver
```
The backend API server will run at [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/) exposing:
- Assets: `/api/assets/`
- Bookings: `/api/bookings/`
- Transfers: `/api/transfers/`
- Audits: `/api/audits/`
- Notifications: `/api/notifications/`
