import React from 'react'
import AuthenticationLayout from './AuthenticationLayout'

export default function PageTemplate() {
  const [theme, setTheme]= React.useState('dark')

  function toggleTheme(){
    setTheme( prev => prev === 'dark' ? 'light' : 'dark')
  }
  return (
    <AuthenticationLayout 
      toggleTheme = { toggleTheme }
      theme = {theme}
    />
  )
}
