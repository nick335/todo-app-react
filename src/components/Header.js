import React from "react";
import moon from '../images/icon-moon.svg'
import sun from '../images/icon-sun.svg'

export default function Header(props){
  let headerClassname= props.theme === "dark" ? 'header header-bg-dark' : 'header header-bg-light'
  let inputClassname = props.theme === "dark" ? 'input-bg-dark' : 'input-bg-light'

  return(
    <header className={headerClassname}>
      <div className="top-info">
        <p>Email: {props.user && <span>{props.user}</span>}</p>
        <p className="logout" onClick={props.logout}>Logout</p>
        {props.error && <p>{props.error}</p>}
      </div>
      <div className="header-info-div">
        <h1 className="header-title">Todo</h1>
        <img alt="sun" src={props.theme === 'dark' ? sun : moon } className='header-icon' onClick={props.onclick}/>
      </div>
      <div className="input-div">
        <div className="circle"></div>
        <input 
        type='text'
        className= {`input ${inputClassname}`}
        placeholder="Create a new todo..."
        value = {props.value}
        onKeyPress={(event) => {props.onkeypress(event)}}
        onChange = { (event) =>  {props.onchange(event) }}
        />
      </div>
    </header> 
  )
}