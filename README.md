# Mohammad Huzaif — Portfolio

A premium, full-stack MERN portfolio website showcasing projects, skills, and experience.

![MERN](https://img.shields.io/badge/Stack-MERN-6366f1)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Premium Design** — Dark theme, glassmorphism, gradient accents, smooth animations
- **Dynamic Projects** — Fetched from MongoDB, filterable by tech stack
- **Contact Form** — Validated, saves to database, spam protection
- **Admin Dashboard** — JWT-protected CRUD for projects + message management
- **Responsive** — Mobile-first, works on all screen sizes
- **SEO Optimized** — Meta tags, semantic HTML, custom favicon

## 🛠 Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Frontend   | React.js (Vite), Framer Motion     |
| Backend    | Node.js, Express.js                |
| Database   | MongoDB Atlas, Mongoose            |
| Auth       | JWT (jsonwebtoken), bcryptjs       |
| Styling    | Custom CSS (glassmorphism, dark)   |

## 📂 Project Structure

```
portfolio/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   │   ├── pages/          # Home, Login, AdminDashboard, NotFound
│   │   ├── utils/          # Axios API instance
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Design system
│   └── index.html
├── server/                 # Express backend
│   ├── config/             # Database connection
│   ├── controllers/        # Route handlers
│   ├── middleware/          # Auth, error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── seed.js             # Database seeder
│   └── server.js           # Entry point
└── package.json            # Root scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### 1. Clone & Install

```bash
git clone https://github.com/codewithhuzaiff/portfolio.git
cd portfolio
npm run install:all
```

### 2. Configure Environment

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
PORT=5000
NODE_ENV=development
```

### 3. Seed Database

```bash
npm run seed
```

This creates:
- 5 portfolio projects
- Admin account: `admin@huzaifa.dev` / `admin123456`

### 4. Run Development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📦 Deploy to Render

### MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a database user
3. Add `0.0.0.0/0` to IP whitelist
4. Copy the connection string

### Render Deployment

1. Push to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Connect your repo
4. Configure:
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — a random secure string
   - `NODE_ENV` — `production`
   - `PORT` — `5000`
6. Deploy!

## 🔐 Admin Panel

Navigate to `/admin/login` and use:
- **Email**: `admin@huzaifa.dev`
- **Password**: `admin123456`

> ⚠️ Change these credentials after first login in production.

## 📝 License

MIT © Mohammad Huzaifa Dar
