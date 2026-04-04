# 📦 Inventory Management System Pro


![Dashboard Banner](/public/inventory-management.png) 
---

A modern, production-ready **Inventory Management Dashboard** built with **Next.js (App Router)**.  
This system is designed for **single-user access**, featuring authentication and a fully functional admin dashboard for managing inventory operations.

---

## 🚀 Features

### 🔐 Authentication
- Secure login system
- Single-user access (no registration)
- Token-based authentication
- Protected dashboard routes

### 📊 Dashboard Modules
- 📦 Products Management
- 🗂️ Categories Management
- 🛒 Orders Management
- 🔄 Restock Queue System
- 📜 Activity Logs Tracking

### ⚙️ Core Functionalities
- Server-side data fetching
- Filtering, searching & pagination
- Reusable UI components
- Modal-based CRUD operations
- Optimized API service layer
- Clean architecture with separation of concerns

---

## 🏗️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Framework    | Next.js (App Router) |
| Language     | TypeScript |
| Styling      | Tailwind CSS + ShadCN UI |
| State Mgmt   | React Hooks |
| API Layer    | Custom Fetch Wrapper |
| Validation   | Zod |
| Auth         | Token-based (JWT) |

---

## 📂 Project Structure

The project follows a **Domain-Driven Modular** pattern for maximum maintainability:

```
├── src/app/(dashboard)      # Protected routes (Products, Orders, Activity Logs)
├── src/components/modules   # Feature-specific logic (Table, Filter, Form Modals)
├── src/services             # API abstraction layer for backend communication
├── src/shared/Dashboard     # Reusable UI patterns (ManagementTable, PageHeader)
├── src/hooks                # Custom React hooks (Debounce, Dropdowns)
└── src/validation           # Zod schemas for form and API validation
```



---

## 🔑 Authentication Flow

1. User logs in via `/login`
2. Credentials sent to backend
3. Token stored securely (cookie/local storage)
4. Protected routes verify authentication
5. Unauthorized users are redirected to login

---

## 🧩 Key Modules Overview

### 📦 Products
- Create, update, delete products
- View product details
- Filter & search products

### 🗂️ Categories
- Manage product categories
- Dropdown integration across modules

### 🛒 Orders
- Create new orders
- Update order status
- View order details

### 🔄 Restock Queue
- Track low-stock items
- Manage restocking actions

### 📜 Activity Logs
- Monitor system activities
- View detailed logs

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone (https://github.com/codewithsaidul/inventory-management-web)
cd inventory-management-web
```

### 2️⃣ Install Dependencies

```bash
bun install
# or
npm install
```

### 3️⃣ Setup Environment Variables
Create a ```.env``` file:

```
NEXT_PUBLIC_BASE_API_URL =your-backend-url/api/v1


JWT_SECRET =your-access-secreat-key
```

### 4️⃣ Run Development Server

```
bun dev
# or
npm run dev
```

App will run at: http://localhost:5000

### 🏭 Production Build

```bash
bun run build
bun start

or

npm run build
npm start
```

### 🔒 Route Protection
 - Dashboard routes are protected under (dashboard)
 - Middleware / auth utilities ensure:
     - Unauthorized access is blocked
     - Token validation before rendering


### 🧠 Design Principles
 - Modular Architecture
 - Separation of Concerns
 - Reusable Components
 - Scalable Service Layer
 - Type Safety (TypeScript everywhere)


### 🧪 Validation
 - All forms validated using Zod
 - Centralized validation schemas
 - Consistent error handling


### 📡 API Handling
 - Centralized API layer in /services
 - Custom fetch wrapper for:
    - Error handling
    - Token injection
    - Response normalization



### 📈 Performance Optimizations
 - Server Components where applicable
 - Lazy loading & skeleton loaders
 - Debounced search inputs
 - Optimized revalidation strategy



### 🚫 Limitations
 - ❌ No multi-user system
 - ❌ No registration system
 - ❌ No public homepage



This project is designed for admin-only internal use.



### 🔮 Future Improvements
 - Multi-user role-based access
 - Analytics dashboard
 - Notifications system
 - Real-time updates (WebSocket)
 - Export reports (CSV/PDF)



### 👨‍💻 Author

##### Saidul Islam Rana

### 📄 License

This project is licensed under the MIT License.