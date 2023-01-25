import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthenticationLayout from './AuthenticationLayout'
import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
import { auth, db } from './firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import validator from 'validator'
import PrivateRoute from './PrivateRoute'
import { useNavigate } from 'react-router-dom'
import {  collection, doc,  getDocs,  query,  setDoc, where } from 'firebase/firestore'
export default function PageTemplate() {
  const navigate = useNavigate()
  const [theme, setTheme]= React.useState('dark')
  const [registerError, setRegisterError]=React.useState('')
  const [registerLoading, setRegisterLoading]=React.useState(false)
  const [loginError, setLoginError]=React.useState('')
  const [loginLoading, setLoginLoading]=React.useState(false)
  const [logoutError, setLogoutError]=React.useState('')
  // const [todoArr, setTodoArr] = React.useState(
  //   {
  //    todos: [],
  //    userid: "efegwgrg"
  //   }
  // )

  const [user, setUser] = React.useState({
    email: '',
    id: ''
  })

  function toggleTheme(){
    setTheme( prev => prev === 'dark' ? 'light' : 'dark')
  }
  // register user with email and passworf
  function Register(e, email, password, confirmPassword){
    e.preventDefault()

    if(!validator.isEmail(email)){
      return setRegisterError('Enter valid email')
    }

    if( password.length < 6){
     return setRegisterError('password must contain at least 6 character')
      // console.log(registerError)
    }

    if(password !== confirmPassword){
      return setRegisterError('passwords do not match')
      // console.log(registerError)
    }

    setRegisterError('')
    setRegisterLoading(true)
    createUserWithEmailAndPassword(auth, email, password).then((user) =>{
      const id = user.user.uid
      const layout = {
        todos: [],
        userid: id
      }
      // db.collection('users').doc(user.user.uid).set(todoArr)
      setDoc(doc(db, "users", id), layout).then(() =>{
        
      }).catch((error) =>{
        console.log(error)
      }) 
      navigate("/")
    }).catch((error) => {
      setRegisterError(error.message)
    })
    setRegisterLoading(false)
  }

  //login user with email and password
  function login(e, email, password){
    e.preventDefault()
    if(!validator.isEmail(email)){
      return setLoginError('Enter valid email')
    }

    setLoginError('')
    setLoginLoading(true)
    signInWithEmailAndPassword(auth, email, password).then(() =>{
      navigate("/")
    }).catch((error) => {
      setLoginError(error.message)
    })
    setLoginLoading(false)
  }

  // sign in with google
  function GoogleSignIn(){
    setLoginError('')
    setRegisterError('')
    setLoginLoading(true)
    setRegisterLoading(true)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((user) =>{
      const id = user.user.uid
      const layout = {
        todos: [],
        userid: id
      }
      // const docRef = doc(db, "users", id);
      const q = query(collection(db, "users"), where("userid", "==",  id))
      getDocs(q).then((response) => {
        console.log(response)
        if(!response.exists) {
          setDoc(doc(db, "users", id), layout)
        } 
      })
      navigate('/')
    }).catch((error) => {
      setLoginError(error.message)
      setRegisterError(error.message)
    })
    setLoginLoading(false)
    setRegisterLoading(false)
  }

  // Logout
  function Logout(){
    setLogoutError('')
    signOut(auth).then(() =>{
      navigate("/authentication/login")
    }).catch((error) => {
      setLogoutError(error.message)
    })
  }

  //assign user
  React.useEffect(() =>{
    onAuthStateChanged(auth, (User) => {
      if(User){
        console.log(User)
        setUser(prevState => ({
          ...prevState,
          email: User.auth.currentUser.email,
          id: User.uid
        }))
        // setTodoArr(prevstate => ({
        //   ...prevstate,
        //   userid:User.uid
        // }))
      }else{

      }
    })
  }, [])
  return (
    <Routes >
      <Route path='/authentication' 
      element={<AuthenticationLayout 
                toggleTheme = { toggleTheme }
                theme = { theme }
      /> } >
        <Route path='/authentication' element = {<SignUp theme = {theme} Register = {Register} error = {registerError} loading = {registerLoading} google={GoogleSignIn} />} />
        <Route path='login'  element = {<Login theme={theme} login = {login} error={loginError} loading = {loginLoading} google={GoogleSignIn} />}/>
      </Route>
      <Route path='/'  element = {
        <PrivateRoute user = {user.email}>
          <Home 
            logout = {Logout}
            error = {logoutError}
            theme = {theme}
            toggleTheme = { toggleTheme }
            user = {user.email}
            id = {user.id}
          />
        </PrivateRoute>
      } />
    </Routes>
  )
}
