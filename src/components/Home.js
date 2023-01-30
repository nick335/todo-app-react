import React from "react";
import Header from "./Header"
import Main from "./Main";
import { nanoid } from "nanoid";
import { arrayUnion, collection, doc, onSnapshot, query,  updateDoc,  where } from "firebase/firestore";
import { db } from "./firebase";


export default function Home(props){
  const userid = props.id ? props.id : null
  const [todoArr, setTodoArr] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')
  const [activeCount, setActiveCount] = React.useState(0)
  const [loading, setloading] = React.useState(true)


   // Function to update list on drop
   const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...todoArr];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
//  updating firestore database    
    const docRef = doc(db, "users", userid)
    updateDoc(docRef, {
      todos: updatedList
    }).catch((error) => {
      console.log(error.message)
    })
  };

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
      const todos = arr[0].todos
      setTodoArr(todos)
      setloading(false)
      let count = 0
      for (let i = 0; i < todos.length; i++) {
      if(todos[i].isCompleted === false){
        ++count
      }
    }
    setActiveCount(count)
    })
    return () => {
      unsubscribe();
    };
  }, [userid])

// complete todos function
  function complete(id){
    const newState = todoArr.map( each => {
      if(each.id === id){
        return{
          ...each,
          isCompleted: !each.isCompleted
        }
      }else{
        return each
      }
    })
    const docRef = doc(db, "users", userid)
    updateDoc(docRef, {
      todos: newState
    }).catch((error) => {
      console.log(error.message)
    })
  }

function onChange(event){
  setInputValue(event.target.value)
}
  
  function saveTodo(event){
    if(event.key === 'Enter'){
      if(inputValue !== ''){
        const docsRef = doc(db, "users", userid)
        const object ={
          id:nanoid(),
          todoTitle:inputValue,
          isCompleted:false
        }
//    updating firestore document
      updateDoc(docsRef, {
        todos: arrayUnion(object)
      }).then(() =>{

      }).catch((error) =>{
        console.log(error)
      })
      setInputValue('')
      }
      
          
    }
  }
// delete todos
  function deleteTodo(id){
    const newState = todoArr.filter(each => {
        return each.id !== id
    })
// updating firestore database    
    const docRef = doc(db, "users", userid)
    updateDoc(docRef, {
      todos: newState
    }).catch((error) => {
      console.log(error.message)
    })
  }
// clear completed todos function
  function clearCompleted(){
    const newState =todoArr.filter( each => {
      return each.isCompleted === false
    })
//  uodating firestore database    
    const docRef = doc(db, "users", userid)
    updateDoc(docRef, {
      todos: newState
    }).catch((error) => {
      console.log(error.message)
    })
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
        loading = {loading}
      />
       
    </div>
  )
}