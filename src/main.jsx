import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router'
import './index.css'
import App from './App.jsx'
import { Hero } from './components/my/Hero.jsx'
import { Front } from './components/pages/Front.jsx'
import AllPhotos from './components/my/AllPhotos.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Front/>}>
      <Route path='/my' element={<AllPhotos/>}/>
      <Route path='/editByRishabh' element={<App/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
