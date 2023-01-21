import React from 'react'
import moon from '../images/icon-moon.svg'
import sun from '../images/icon-sun.svg'
import SignUp from './SignUp'

export default function AuthenticationLayout(props) {
  let authsectionClassname= props.theme === "dark" ? 'authsection authsection-bg-dark' : 'authsection authsection-bg-light'
  let authsectionContainerClassname= props.theme === "dark" ? 'authsection_container authsection_container-bg-dark' : 'authsection_container authsection_container-bg-light'
  return (
    <section className={authsectionClassname}>
      <div className={authsectionContainerClassname}>
        <header className='authsection_container_header'>
          <h1 className="authsection_container_header-title">Todo</h1>
          <img alt="sun" src={props.theme === 'dark' ? sun : moon } className='authsection_container_header-icon' onClick={props.toggleTheme}/>
        </header>
      </div>
      <div className='authsection_routes'>
        <SignUp 
          theme = {props.theme}
        />
      </div>
    </section>
  )
}
