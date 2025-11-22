# 🌐 TinyLink — URL Shortener (MERN Stack)

🔗 **Live Demo:** [(https://tinyfronend.onrender.com)]()  
*(Replace the link above with your Render / Netlify / Vercel deployment URL)*

TinyLink is a full-stack URL shortener built with **Node.js + Express + MongoDB + React + Vite**.  
It allows users to shorten long URLs, track click counts, view stats, and manage links with a simple UI.

---

## 🚀 Features

### 🔧 Backend (Node.js + Express + MongoDB)
- REST API for creating, reading, deleting links
- URL validation using modern `URL()` API
- Click tracking with timestamps
- Auto-sorting by creation date
- Clean redirection using `/shortCode`
- MongoDB Atlas integration

### 💻 Frontend (React + Vite + Tailwind CSS)
- Modern & responsive UI
- Create short links with custom codes
- View clicks and last-clicked time
- Stats page for individual short links
- Copy-to-clipboard functionality
- Smooth UX animations & gradient styling

---

## 📦 Project Structure

```sh
TINY/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env (ignored)
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── index.html
│ ├── package.json
│ └── ...
│
└── README.md
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/kamlesh9685/Tiny.git
```

### 2️⃣ Install backend dependencies

```sh
cd TINY/backend
npm install
```

### 3️⃣ Add .env file in backend folder

```sh
MONGODB_URI=your_mongodb_atlas_uri
PORT=3000
BASE_URL=http://localhost:3000
```

### 4️⃣ Start backend server

```sh
npm start
```

### 5️⃣ Install frontend dependencies

```sh
cd ../frontend
npm install
```

### 6️⃣ Run frontend in dev mode

```sh
npm run dev
```


### 📸 Screenshots
<img width="1920" height="1080" alt="Screenshot 2025-11-22 233533" src="https://github.com/user-attachments/assets/47c95b2e-be7c-4dfc-9b04-cfb00925095e" />

<img width="1920" height="1080" alt="Screenshot 2025-11-22 233610" src="https://github.com/user-attachments/assets/7f599fe3-06cb-406c-b91b-f8965e89d44a" />

<img width="1920" height="1080" alt="Screenshot 2025-11-22 234007" src="https://github.com/user-attachments/assets/f08079d8-4914-4817-a292-6b122cc247be" />





