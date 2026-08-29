# User Registration System

A full-stack user registration app built with React, Vite, JavaScript, HTML/CSS, Node.js, Express, and MySQL.

## Project Structure

```text
Registration page/
  backend/
    controllers/
    database/
    repositories/
    routes/
    services/
    .env.example
    package.json
    server.js
  frontend/
    public/
    src/
      components/
      validation/
      App.jsx
      main.jsx
    .env.example
    index.html
    package.json
  .gitignore
  README.md
```

## Technologies Used

- Frontend: React, Vite, JavaScript, HTML, CSS
- Backend: Node.js, Express
- Database: MySQL
- Security: bcrypt for password hashing
- Validation: Client-side and server-side JavaScript validation
- Pincode check: External pincode API through the backend

## Features

- First name and last name accept alphabets only.
- Email format is validated.
- Phone number accepts either 10 digits without `+` or `+` followed by 13 digits.
- Phone number cannot start with `0`.
- Password requires at least 6 characters, one alphabet, one number, and one special character from `@#$&!`.
- Repeat password must match the password.
- Pincode must be 6 digits and is checked by the backend.
- Registration data is saved in MySQL.
- Confirmation page displays saved registration details after successful registration.

## Backend Local Setup

From the project root:

```bash
cd backend
npm install
copy .env.example .env
npm start
```

Update `backend/.env` with your local MySQL credentials before starting.

The backend runs at:

```text
http://localhost:5000
```

## Frontend Local Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## Environment Variables

Backend variables in `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=registration_db
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Frontend variables in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Do not commit real `.env` files. Use `.env.example` files as templates only.

## Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

This creates:

```text
frontend/dist/
```

Start the backend in production:

```bash
cd backend
npm install --omit=dev
npm start
```

## API Routes

```text
GET  /api/pincode/:pincode
POST /api/register
GET  /api/register/:userId
```

`GET /api/register/:userId` returns saved registration details without exposing the hashed password.

## Recommended AWS Architecture

For additional marks, use this simple AWS setup:

```text
User Browser
  -> CloudFront
  -> S3 static website bucket for the React/Vite frontend
  -> Elastic Beanstalk Node.js environment for the Express backend
  -> RDS MySQL database
```

Recommended AWS services:

- S3: Host the built `frontend/dist` static files.
- CloudFront: Serve the frontend over HTTPS and cache static assets.
- Elastic Beanstalk: Run the Node.js/Express backend using `npm start`.
- RDS MySQL: Store registered users in a managed MySQL database.
- Security Groups: Allow the backend to connect to RDS, but do not expose RDS publicly.
- Environment Variables: Configure `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`, and `FRONTEND_URL` in Elastic Beanstalk.

AWS deployment notes:

- Set `VITE_API_URL` before building the frontend so it points to the deployed backend URL.
- Set `FRONTEND_URL` in the backend to the CloudFront frontend URL.
- Upload only the contents of `frontend/dist` to S3.
- Upload only backend source files, `package.json`, and `package-lock.json` to Elastic Beanstalk. Do not upload `.env` or `node_modules`.
- Configure CloudFront custom error responses so React routes return `index.html`.

## Deployment Readiness Checklist

- Root `.gitignore` protects `.env`, `node_modules`, build output, logs, and generated files.
- Backend uses `process.env.PORT` with `5000` fallback.
- Backend CORS can be configured with `FRONTEND_URL`.
- Backend fails startup if database initialization fails.
- Backend has a production `npm start` script.
- Frontend API base URL is configurable with `VITE_API_URL`.
- Frontend has a meaningful page title.
- Example environment files are present without real credentials.
