# 🍽️ FoodLoop

### Turning Surplus Food Into Hope

FoodLoop is a web-based food redistribution platform designed to help reduce food waste by connecting **hotels, charities, and volunteers**.

The platform allows hotels and other food providers to share surplus food, while charities can request food and volunteers can help with collection and delivery.

---

## 🌱 About the Project

A significant amount of edible food is wasted every day while many people still struggle to access sufficient food.

FoodLoop aims to bridge this gap through a centralized platform where:

- 🏨 **Hotels** can donate surplus food.
- ❤️ **Charities** can receive and manage food donations.
- 🚚 **Volunteers** can help deliver donated food.
- 🔔 Users can receive notifications about relevant activities.

The goal is to make food redistribution easier, faster, and more organized.

---

## ✨ Features

### 👤 User Authentication
- User registration and login
- Role-based access
- Separate interfaces for different user types
- Secure password handling

### 🏨 Hotels
- Register as a food provider
- Add surplus food
- Manage food donations
- View donation-related information

### ❤️ Charities
- Register as a charity
- View available food donations
- Request available food
- Manage received donations

### 🚚 Volunteers
- Register as a volunteer
- View available delivery opportunities
- Help with food collection and delivery

### 🍱 Food Donations
- Add food donation details
- Track available donations
- Connect food providers with charities
- Manage donation status

### 🔔 Notifications
- Notify users about relevant donation activities
- Keep users updated about requests and changes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MySQL
- Aiven Cloud

### Deployment
- Vercel — Frontend
- Render — Backend
- Aiven — MySQL Database

---

## 🏗️ Project Structure

```text
FoodLoop/
│
├── Client/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore
