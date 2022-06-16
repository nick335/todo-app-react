import React from "react";
import cross from '../images/icon-cross.svg'


export default function Box(props){
  const boxClassname = props.theme === 'dark' ? 'box-dark' : 'box-light'
  const titleClassname = props.theme === 'dark' ? 'todo-title-dark' : 'todo-title-light' 
  const titleCompleted = props.isCompleted ? 
  props.theme === 'dark' ? 'todo-title-iscompleted-dark' 
  : 'todo-title-iscompleted-light'
  : ''
  const circleCompletd = props.isCompleted ? 'circle2-iscompleted' : ''
  const tickcompleted = props.isCompleted ? 'tick-iscompleted' : '' 


  return(
    <div className={`box ${boxClassname}`}>
      <div className={`circle2 ${circleCompletd}`} onClick={ (event) => props.complete(props.id)}>
        <div className={`tick ${tickcompleted}`}></div>
      </div>
      <h2 className= {`todo-title ${titleClassname} ${titleCompleted}`}>{props.title}</h2>
      <img alt="delete" className="delete" src={cross} 
      onClick={(event) => props.delete(props.id)}/>
    </div>
  )
}