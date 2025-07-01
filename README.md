
# Eventroop

A full-stack event management application built with MERN stack — MongoDB, Express, React, Node.js.

---

## Project Overview

Eventroop allows users to register, login, create and manage events. It features authentication, private routes, event CRUD operations, and responsive UI with React Hook Form and Tailwind CSS.

---

## Tech Stack

- **Frontend:** React, React Router, React Hook Form, Tailwind CSS, Axios  
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Authentication  
- **Deployment:** Render (backend), Vercel (frontend)  
- **Others:** react-hot-toast for notifications

---

## Features

- User registration and login with JWT token  
- Protected routes for authenticated users only  
- Add, update, delete events  
- Fetch and list events  
- Responsive and modern UI design  
- Real-time loading and error handling

---

## Folder Structure

```
eventroop/
│
├── eventroop-server/        # Backend (Express + MongoDB)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── eventroop-client/        # Frontend (React)
    ├── src/
    │   ├── components/
    │   ├── Hooks/
    │   ├── Pages/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn  
- MongoDB Atlas account or local MongoDB server  
- `.env` file with correct variables (backend)

---

### Setup Backend

1. Navigate to backend folder:
   ```bash
   cd eventroop-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file in `eventroop-server` with contents:
   ```
   DATABASE_USER=yourMongoDBUser
   DATABASE_PASSWORD=yourMongoDBPassword
   JWT_SECRET=yourJWTsecretKey
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Server runs at `http://localhost:3000` by default

---

### Setup Frontend

1. Navigate to frontend folder:
   ```bash
   cd eventroop-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend dev server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`

---

## Deployment

- Backend deployed on **Render**: [https://eventroop-server.onrender.com](https://eventroop-server.onrender.com)  
- Frontend deployed on **Vercel** (or any preferred static hosting)

### Important

- Keep your `.env` variables safe and never push them to public repos  
- Use a tool like UptimeRobot to keep your backend awake on free Render plan

---

## Usage

- Register a new user account  
- Login to access private routes  
- Create, update, delete events  
- View all events in the dashboard

---

## Troubleshooting

- MongoDB connection errors? Double-check `.env` credentials and network access  
- 404 on refresh in frontend? Configure React Router for SPA hosting  
- Backend sleeping on free Render? Use UptimeRobot or paid plan

---

## Contributing

Feel free to fork, open issues, or submit pull requests!

---

## License

MIT License © 2025 Toufikul Islam

---

Made with ❤️ by Toufikul Islam  
