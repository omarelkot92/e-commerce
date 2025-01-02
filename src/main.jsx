import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/encode-sans-expanded'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-image-gallery/styles/css/image-gallery.css"
import './index.css'
import App from './App.jsx'


// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

createRoot(document.getElementById('root')).render(
  
    <App />
  
)
