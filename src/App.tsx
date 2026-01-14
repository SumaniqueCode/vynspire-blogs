import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import PrivateRoute from './routes/PrivateRoute'
import Layout from './global/layout/Layout'
import Register from './pages/auth/Register'
import Blog from './pages/blog/Blog'
import PostCreate from './pages/blog/PostCreate'
import PostEdit from './pages/blog/PostEdit'
import PostView from './pages/blog/PostView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='posts/'>
            <Route index element={<PrivateRoute><Blog /></PrivateRoute>} />
            <Route path="create" element={<PrivateRoute> <PostCreate /> </PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute> <PostEdit /> </PrivateRoute>} />
            <Route path="view/:id" element={<PrivateRoute>  <PostView /> </PrivateRoute>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
