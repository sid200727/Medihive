# MediHive

Full-stack medical records management app — React + Tailwind frontend, Django + DRF backend.

## Structure
```
medihive/
├── frontend/   # React + Vite + Tailwind CSS
└── backend/    # Django + Django REST Framework + SimpleJWT
```

## Frontend setup
```
cd frontend
npm install
npm run dev
```
Opens at **http://localhost:5173**. Runs on mock/demo login (no backend required) with:

| Role    | Username  | Password    |
|---------|-----------|-------------|
| Admin   | admin     | admin123    |
| Doctor  | doctor    | doctor123   |
| Patient | patient   | patient123  |

To wire up the real backend: in `AuthContext.jsx`, swap the mock `login()` block for `authService.login()` from `src/services/api.js` (already configured to point at `http://localhost:8000/api` with a JWT Axios interceptor).

## Backend setup
```
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo   # creates admin/doctor/patient users
python manage.py runserver
```
API runs at **http://localhost:8000/api**. Demo login uses email, not username:
- admin@medihive.com / admin123
- doctor@medihive.com / doctor123
- patient@medihive.com / patient123

### Key endpoints
- `POST /api/auth/login/` — returns access + refresh JWT
- `POST /api/auth/refresh/` — refresh access token
- `GET/POST /api/users/` — admin only
- `GET/POST /api/records/` — role-scoped (patients see only their own, doctors/admins see all)
- `GET/PUT/DELETE /api/records/<id>/` — role-checked via `CanAccessRecord`

## Models
- **User** (custom, `AbstractUser`) — UUID pk, email-based login, `role` field (admin/doctor/patient/family)
- **FamilyRelationship** — links a family-role user to a patient for shared record access
- **Record** — patient's uploaded file, type, status (pending/reviewed), linked to uploader

## Notes
- SQLite for dev; swap `DATABASES` in `config/settings.py` for Postgres in production.
- `postcss.config.js` + `tailwind.config.js` are both present and correctly wired — this fixes the blank white-screen issue from missing Tailwind PostCSS setup.
