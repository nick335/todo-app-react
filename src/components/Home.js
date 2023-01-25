import React from "react";
import Header from "./Header"
import Main from "./Main";
import { nanoid } from "nanoid";
import { collection, onSnapshot, query,  where } from "firebase/firestore";
import { db } from "./firebase";


export default function Home(props){
  const userid = props.id ? props.id : null
  const [Arr, setArr] = React.useState([])
  const [todoArr, setTodoArr] = React.useState(
    JSON.parse(localStorage.getItem('todoData')) || []
  )
  const [inputValue, setInputValue] = React.useState('')
  const [activeCount, setActiveCount] = React.useState(0)


   // Function to update list on drop
   const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...todoArr];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setTodoArr(updatedList);
  };
 

  React.useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoArr))
    let count = 0
    for (let i = 0; i < todoArr.length; i++) {
      if(todoArr[i].isCompleted === false){
        ++count
      }
    }
    setActiveCount(count)
  }, [todoArr])

  React.useEffect(() => {
    const collectionRef = collection(db, 'users')
    const q = query(
      collectionRef,
      where("userid", "==", userid)
    )
    const unsubscribe = onSnapshot(q, (docs) => {
      let arr = []
      docs.forEach((doc) => {
        arr.push(doc.data());
      });
      // console.log(arr)      
      setArr(arr)
    })
    return () => {
      unsubscribe();
    };
  }, [userid])

console.log(Arr)
console.log(userid)
  function complete(id){
    const newState = todoArr.map( each => {
      if(each.id === id){
        if(each.isCompleted){
        return{
          ...each,
          isCompleted:false
        }}else{
          return{
            ...each,
            isCompleted:true
          }
        }
      }else{
        return each
      }
    })

    setTodoArr(newState)
  }

function onChange(event){
  setInputValue(event.target.value)
}
  
  function saveTodo(event){
    if(event.key === 'Enter'){
      if(inputValue !== ''){
        const newArr = [...todoArr]
      newArr.push(
        {
          id:nanoid(),
          todoTitle:inputValue,
          isCompleted:false
        }
      )

      setTodoArr(newArr)
      setInputValue('')
      }
      
          
    }
  }

  function deleteTodo(id){
    const newState = todoArr.filter(each => {
        return each.id !== id
    })

    setTodoArr(newState)
  }

  function clearCompleted(){
    const newState =todoArr.filter( each => {
      return each.isCompleted === false
    })

    setTodoArr(newState)
  }

  return(
    <div className="container">
      <Header 
        theme ={props.theme}
        logout = {props.logout}
        error = {props.error}
        user={props.user}
        onclick={props.toggleTheme}
        onkeypress={saveTodo}
        value = {inputValue}
        onchange = {onChange}
      />
      <Main 
        theme ={props.theme}
        todoData = {todoArr}
        complete = {complete}
        delete= {deleteTodo}
        clearCompleted= {clearCompleted}
        count = {activeCount}
        handle = {handleDrop}
      />
       
    </div>
  )
}