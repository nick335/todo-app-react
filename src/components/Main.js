import React from "react";
import Box from "./Box";
import { nanoid } from "nanoid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { InfinitySpin  } from 'react-loader-spinner'
export default function Main(props){
  const mainClassname = props.theme === 'dark' ? 'main-bg-dark' : 'main-bg-light'
  const mainContainerClassname = props.theme === 'dark' ? 'main-container-bg-dark' : 'main-container-bg-light'
  const footerTitleClassname = props.theme === 'dark' ? 'footer-text-dark' :
  'footer-text-light'
  const footerBg = props.theme === 'dark' ? 'footer-classes-dark' : 'footer-classes-light'
  const outsideText = props.theme === 'dark' ? 'outside-text-dark' : 'outside-text-light'
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
  const allElements = todoArr.map( (each, index) => {
    return <Draggable key={nanoid()} draggableId={each.id} index={index} >
            {(provided) => (
               <div
               className="item-container"
               ref={provided.innerRef}
               {...provided.dragHandleProps}
               {...provided.draggableProps}
             >
            <Box 
              title = {each.todoTitle}
              key = {nanoid()}
              id = {each.id}
              theme ={props.theme}
              complete = {props.complete}
              isCompleted = {each.isCompleted}
              delete = {props.delete}
            />
             </div>
            )}
            
          </Draggable>
            
  })
  const completedElements = todoArr.map( (each, index) => {
    if(each.isCompleted === true){
      return <Draggable key={nanoid()} draggableId={each.id} index={index} >
            {(provided) => (
               <div
               className="item-container"
               ref={provided.innerRef}
               {...provided.dragHandleProps}
               {...provided.draggableProps}
             >
            <Box 
              title = {each.todoTitle}
              key = {nanoid()}
              id = {each.id}
              theme ={props.theme}
              complete = {props.complete}
              isCompleted = {each.isCompleted}
              delete = {props.delete}
            />
             </div>
            )}
            
          </Draggable>
    }else{
      return <></>
    }
  })

  const activeElements =  todoArr.map( (each, index) => {
    if(each.isCompleted === false){
      return <Draggable key={nanoid()} draggableId={each.id} index={index} >
            {(provided) => (
               <div
               className="item-container"
               ref={provided.innerRef} 
               {...provided.draggableProps}
               {...provided.dragHandleProps}
              
             >
            <Box 
              title = {each.todoTitle}
              key = {nanoid()}
              id = {each.id}
              theme ={props.theme}
              complete = {props.complete}
              isCompleted = {each.isCompleted}
              delete = {props.delete}
            />
             </div>
            )}
            
          </Draggable>
    }else{
      return <></>
    }
  })

  return(
    <main className={`main ${mainClassname}`}>
      <div className={`main-container ${mainContainerClassname}`}>
       <DragDropContext onDragEnd={props.handle}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
               {                                                                props.loading ? 
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: '0px',
                  paddingRight:0,
                }}><InfinitySpin  width="100" color="#4fa94d" /></div> :
                  pageState === 'All' ? allElements :
                  pageState === 'Active' ? activeElements :
                  pageState === 'Completed' ? completedElements : 
                  ''
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> 
        
        <div className="main-footer"> 
          <h3 className={`footer-text ${footerTitleClassname}`}>{`${props.count} items left`}</h3>
          <div className={`footer-classes ${footerBg}`}>
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
      <div className="outside-div">
        <h4 className={`outside-text ${outsideText}`}>Drag and drop to reorder list</h4>
      </div>
    </main>
  )
}