# Vynspire Blogs — Frontend Technical Assessment

A fully functional **Blog Platform** built as part of the **Frontend Developer (React/Next.js)** technical assessment for **Vynspire**.  
The project demonstrates modern frontend practices including authentication, protected routes, CRUD operations, custom hooks, and clean architecture.

---

## 🚀 Live Demo & Repository

- 🔗 **Live URL:** https://vynspire-blogs.vercel.app/
- 📦 **GitHub Repo:** https://github.com/SumaniqueCode/vynspire-blogs

---

## 🔐 Credentials

- You can also register new users.

---

## 🛠 Tech Stack

- **Framework:** React (Vite) + TypeScript  
- **State Management:** Redux Toolkit  
- **Routing:** React Router DOM  
- **UI Library:** Material UI (MUI)  
- **Forms & Validation:** Formik + Yup  
- **API Handling:** Axios  
- **Mock Backend:** mockapi.io  
- **Auth Storage:** localStorage (Fake JWT)

---

## ✨ Features Implemented

### 🧑‍💼 Authentication
- Login and registration functionality implemented.
- Fake JWT token stored securely in `localStorage`.
- Custom `useAuth` hook manages authentication state, login, and logout.

### 🔐 Protected Routes
- Dashboard, Create, Edit, and Delete routes are protected using `PrivateRoute`.
- Unauthorized users are automatically redirected to the login page.
- Authentication status is derived from Redux state and persisted storage.

### 📝 Blog Management (CRUD)
- View blog list and individual blog details.
- Logged-in users can create new blog posts.
- Only the **author of a blog** can edit or delete their own posts.
- Blog operations are managed using a custom `usePosts` hook.

### 🔍 Search & Pagination
- Client-side search implemented for blog posts.
- Pagination added to improve performance and user experience.

### 🎨 UI & Responsiveness
- Clean, modern, and responsive layout using MUI.
- Reusable components and layout structure maintained throughout the app.
- Loader and error states handled properly for async actions.

---

## 🧠 Architecture Highlights

- **Redux Toolkit slices** used for authentication and posts.
- **Custom Hooks (`useAuth`, `usePosts`)** abstract business logic.
- **Reusable Components** for layout, forms, and UI elements.
- **Type-safe codebase** using TypeScript interfaces and models.

---

## ⚙️ Local Setup

```bash
git clone https://github.com/SumaniqueCode/vynspire-blogs.git
cd vynspire-blogs
npm install
npm run dev
