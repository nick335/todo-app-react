import React from "react";
import Box from "./Box";
import { nanoid } from "nanoid";
export default function Main(props){
  const mainClassname = props.theme === 'dark' ? 'main-bg-dark' : 'main-bg-light'
  const mainContainerClassname = props.theme === 'dark' ? 'main-container-bg-dark' : 'main-container-bg-light'
  const footerTitleClassname = props.theme === 'dark' ? 'footer-text-dark' :
  'footer-text-light'
  const [pageState, setPageState] = React.useState('All')
 

  function setAll(){
    setPageState('All')
  }
  function setCompleted(){
    setPageState('Completed')
  }
  function setActive(){
    setPageState('Active')
  }
  const todoArr = props.todoData
  const allElements = todoArr.map( each => {
    return <Box 
              title = {each.todoTitle}
              key = {nanoid()}
              id = {each.id}
              theme ={props.theme}
              complete = {props.complete}
              isCompleted = {each.isCompleted}
              delete = {props.delete}

            />
  })
  const completedElements = todoArr.map( each => {
    if(each.isCompleted === true){
      return <Box 
                title = {each.todoTitle}
                key = {nanoid()}
                id = {each.id}
                theme ={props.theme}
                complete = {props.complete}
                isCompleted = {each.isCompleted}
                delete = {props.delete}
              />
    }else{
      return <></>
    }
  })

  const activeElements =  todoArr.map( each => {
    if(each.isCompleted === false){
      return  <Box 
                title = {each.todoTitle}
                key = {nanoid()}
                id = {each.id}
                theme ={props.theme}
                complete = {props.complete}
                isCompleted = {each.isCompleted}
                delete = {props.delete}
              />
    }else{
      return <></>
    }
  })

  return(
    <main className={`main ${mainClassname}`}>
      <div className={`main-container ${mainContainerClassname}`}>
        { 
          pageState === 'All' ? allElements :
          pageState === 'Active' ? activeElements :
          pageState === 'Completed' ? completedElements : 
          ''
        }
        <div className="main-footer"> 
          <h3 className={`footer-text ${footerTitleClassname}`}>{`${props.count} items left`}</h3>
          <div className="footer-classes">
            <h3 className={`footer-text ${footerTitleClassname} ${
              pageState === 'All' ? 'footer-text-is-active' : ''
            }`} onClick={setAll}>All</h3>
            <h3 className={`footer-text ${footerTitleClassname}
            ${
              pageState === 'Active' ? 'footer-text-is-active' : ''
            }`} onClick={setActive}>Active</h3>
            <h3 className={`footer-text ${footerTitleClassname}
            ${
              pageState === 'Completed' ? 'footer-text-is-active' : ''
            }`} onClick={setCompleted} >Completed</h3>
          </div> 
          <h3 className={`footer-text ${footerTitleClassname}`} onClick={props.clearCompleted} >Clear Completed</h3>
        </div>
      </div>
    </main>
  )
}