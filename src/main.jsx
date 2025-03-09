import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router'
import './index.css'
import App from './App.jsx'
import { Hero } from './components/my/Hero.jsx'
import { Front } from './components/pages/Front.jsx'
import AllPhotos from './components/my/AllPhotos.jsx'
import { Months } from './components/pages/Months.jsx'
import { Month } from './components/pages/Month.jsx'
import { Special } from './components/pages/Special.jsx'
import { MemoryGalleryApp } from './components/groups/MemoryGalleryApp.jsx'
import { GroupView } from './components/groups/GroupView.jsx'
// import MemoryGalleryApp from './components/groups/MemoryGalleryApp.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Front/>}>
      <Route path='/my' element={<AllPhotos/>}/>
      <Route path='/groupBackend' element={<MemoryGalleryApp/>}/>
      <Route path='/group' element={<GroupView/>}/>
      <Route path='/speical' element={<Special/>}/>
      <Route path='/months' element={<Months/>}/>
      <Route path='/month/:monthId' element={<Month/>}/>
      <Route path='/editByRishabh' element={<App/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
