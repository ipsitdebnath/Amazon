# 🛒 Amazon Clone

A fully functional Amazon-inspired e-commerce web application built with **React** and **Vite** as part of a Web Application Project (WAP).

---

## 📌 Project Overview

This project is a front-end clone of Amazon.com that replicates core e-commerce functionality including product browsing, product details, cart management, and user authentication UI. It consumes the [FakeStore API](https://fakestoreapi.com/) for product data.

---

## 🚀 Live Demo

> 🔗 _Link will be added after deployment on Netlify/Vercel_

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool & Dev Server |
| React Router DOM | Client-side Routing |
| Context API + useReducer | Global State (Cart) |
| FakeStore API | Product Data Source |
| CSS3 | Styling & Responsive Layout |

---

## 📁 Folder Structure

Amazon/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js

---

## ✨ Features

- 🏠 **Home Page** — Product grid fetched from FakeStore API
- 🔍 **Search & Filter** — Filter products by category
- 📄 **Product Detail Page** — Full product info with Add to Cart
- 🛒 **Cart** — Add, remove, update quantity, and view total
- 💾 **Persistent Cart** — Cart saved via `localStorage`
- 🔐 **Login / Signup UI** — Form-based authentication interface
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/amazon-clone.git

# Navigate into the project
cd amazon-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🔗 API Reference

This project uses the [FakeStore API](https://fakestoreapi.com/):

| Endpoint | Description |
|---|---|
| `GET /products` | Fetch all products |
| `GET /products/:id` | Fetch single product |
| `GET /products/categories` | Fetch all categories |
| `GET /products/category/:name` | Fetch by category |

---

## 🧑‍💻 Author
**Anukush Kumar**
**Ipsit Debnath**
**Naman Saini**  

WAP Project — React Amazon Clone

---
## 📄 License

This project is for educational purposes only.  
Product data sourced from [FakeStore API](https://fakestoreapi.com/).