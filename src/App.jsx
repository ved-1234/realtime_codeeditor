import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/Login";
import CodeEditor from "./components/CodeEditor"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CreateAccount from "./components/CreateAccount"

function App() {
  const router=createBrowserRouter([
{
 path:'/',
 element:(
  <>
  <Login/>
  </>
 )   
 },
 {
path:'/editor',
element:(
  <>
  <CodeEditor/>
  </>
)
 }
])

return (
    
    <RouterProvider router={router}/>
  )
}

export default App
