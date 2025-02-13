# 🛒 Stationery Shop

An e-commerce platform for managing stationery products, allowing users to browse, purchase items, and manage orders while providing an admin panel for inventory and user management.

---

## 🌐 Live Demo

[Click here to visit the live site](https://stationary-shop-self.vercel.app)  

---

## 🚀 Features

### 🛍️ User Features:
- ✅ User authentication (Sign Up, Login, Logout)
- ✅ View all products with search and filter options
- ✅ Add products to cart and place orders
- ✅ View order history
- ✅ Manage profile settings (update default shipping address)

### 🔑 Admin Features:
- ✅ Dashboard with key statistics
- ✅ Add, edit, and remove products
- ✅ Manage users and orders
- ✅ View revenue insights

---

## 🛠️ Technologies Used

### Frontend:
- 🎨 **React.js** (with TypeScript)
- 🛠 **Redux Toolkit** (State Management)
- 🔀 **React Router** (Navigation)
- 🎨 **Tailwind CSS** (Styling)

### Backend:
- 🚀 **Node.js** (Runtime)
- ⚡ **Express.js** (Server Framework)
- 🗄 **MongoDB** with **Mongoose** (Database)
- 🔐 **JWT Authentication** (User Authentication)

---

## 📦 Installation & Setup

### 🔧 Prerequisites
Before running the project, ensure you have the following installed:
- **[Node.js](https://nodejs.org/)** (LTS version recommended)
- **MongoDB** (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud database)
- **Git** (for cloning the repository)

 ## 🔙 Backend Setup

### 🏗 Step 1: Clone the Backend Repository
```
git [clone https://github.com/shahidulllah/stationery-shop-server]
cd stationery-shop-server
```

### 📂 Step 2: Install Dependencies
```
npm install
```

### 🔑 Step 3: Create a .env File
 Create a .env file in the backend folder and add the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### ▶️ Step 4: Run the Backend
```
npm start
```

---
 ## 🎨 Frontend Setup
  ### 📂 Step 5:  Clone the Frontent Repository
```
git [clone https://github.com/shahidulllah/stationery-shop-client]
cd stationery-shop-server
```
 ### 📂 Step 6: Install Dependencies
```
npm install
```
 ### Step 7: Run the Frontend
```
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint            | Description                   |
|--------|---------------------|-------------------------------|
| GET    | `/api/products`     | Get all products             |
| POST   | `/api/orders`       | Create a new order           |
| GET    | `/api/orders/user`  | Get logged-in user's orders  |
| POST   | `/api/auth/login`   | Login user                   |
| POST   | `/api/auth/register` | Register user               |


## 💡 Future Improvements
- [x] Payment gateway integration  
- [x] Reviews & Ratings system  
- [x] Wishlist functionality  

