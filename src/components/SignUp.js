import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp(props) {
  const email = React.useRef()
  const password = React.useRef()
  const passwordConfirm = React.useRef()
  const signup = props.theme === "dark" ? 'signup signup-dark-theme' : 'signup signup-light-theme'
  const input = props.theme === "dark" ? 'input input-dark-theme' : 'input input-light-theme'
  return (
    <section className={signup}>
      <div className='signup_container'>
        <h3>welcome, let's create your account</h3>
        <form>
          <div className="form-div">
            <input className={input} type='email' ref={email}  required />
            <label>Email</label>
          </div>
          <div className="form-div">
            <input className={input} type='password' ref={password}  required />
            <label>Password</label>
          </div>
          <div className="form-div">
            <input className={input} type='password' ref={passwordConfirm}  required/>
            <label>Confirm Password</label>
          </div>
          <button className='form-btn'>Sign up</button>
        </form>
        <div className='form-extras'>
          <p>have an account already? <Link to='/authentication/login' >Login</Link></p>
          <h3>or</h3>
          <button>sign in with Google</button>
        </div>
      </div>
    </section>
  )
}
