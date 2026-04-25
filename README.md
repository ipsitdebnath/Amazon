# 🛒 Amazon Clone (E-commerce Web App)

A fully functional Amazon-inspired e-commerce application built using modern web technologies. This project replicates key features of a real-world online shopping platform including product browsing, search, cart management, authentication, and order handling.

---

## 🚀 Live Demo
https://amazon-sigma-red.vercel.app/

---

## 📦 Features

### 🏠 Home & Products
- Display products with images, price, and ratings  
- Product listing with pagination  
- Product detail page  

### 🔍 Search & Filter
- Real-time search functionality  
- Category-based filtering  
- Price and rating sorting  

### 🛒 Cart System
- Add to cart  
- Remove items from cart  
- Update product quantity  
- Persistent cart using localStorage  

### 👤 Authentication
- User signup and login  
- Protected routes  
- Logout functionality  

### 📦 Orders
- Place orders  
- View order history  
- Order tracking UI  

### ❤️ Wishlist
- Add/remove products to wishlist  
- Persistent storage  

### 🔔 Notifications
- Toast messages for user actions  

### 📱 Responsive Design
- Fully responsive for mobile, tablet, and desktop  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- React Router  
- Context API / State Management  
- CSS / Tailwind  

### Backend *(if implemented)*
- Node.js  
- Express.js  

### Database *(if implemented)*
- MongoDB  

### Deployment
- Frontend: Vercel  
- Backend: Render / Railway  

---

## 🔗 API Integration

Currently using mock API:

GET https://dummyjson.com/products?limit=200  

### Future Scope
- Replace with custom backend API  
- Add database integration  

---

## 📁 Folder Structure

src/
├── components/
├── pages/
├── context/
├── hooks/
├── utils/
├── App.js
└── index.js


---

## ⚙️ Installation & Setup

### 1. Clone the repository

### 2. Navigate to project folder

### 3. Install dependencies

### 4. Run the app


---

## 🌐 Deployment

This project is deployed on Vercel.

### Fix for Refresh 404 Issue
Add a `vercel.json` file:
{
"routes": [
{
"src": "/(.*)",
"dest": "/index.html"
}
]
}


---

## 🔥 Future Enhancements

- AI-based product recommendations  
- Chatbot assistant  
- Admin dashboard  
- Payment gateway integration  
- Advanced analytics  

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is for educational purposes only.

---

## 👨‍💻 Author

Developers :-
Ankush Kumar
Ipsit Debnath
Naman Saini
