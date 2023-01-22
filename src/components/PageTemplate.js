import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthenticationLayout from './AuthenticationLayout'
import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
export default function PageTemplate() {
  const [theme, setTheme]= React.useState('dark')

  function toggleTheme(){
    setTheme( prev => prev === 'dark' ? 'light' : 'dark')
  }
  return (
    <Routes >
      <Route path='/authentication' 
      element={<AuthenticationLayout 
                toggleTheme = { toggleTheme }
                theme = { theme }
      /> } >
        <Route path='/authentication' element = {<SignUp theme = {theme} />} />
        <Route path='login'  element = {<Login theme={theme}/>}/>
      </Route>
      <Route path='/'  element = {<Home />} />
    </Routes>
  )
}
