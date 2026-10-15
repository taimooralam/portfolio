import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PostsPage from './site/Posts.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Two pages: the home page, and /posts (his call, 2026-10-15). */}
    {window.location.pathname.replace(/\/$/, '') === '/posts' ? <PostsPage /> : <App />}
  </React.StrictMode>,
)
