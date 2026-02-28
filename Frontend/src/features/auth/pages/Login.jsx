import React, { useState } from 'react'
import "../style/login.scss"
import { Link, useNavigate } from "react-router";
import { useAuth } from '../hooks/useAuth';


const Login = () => {


const [username, setusername] = useState("")
const [password, setpassword] = useState("")
const [error, seterror] = useState("")

const { handleLogin, loading }= useAuth()
const navigate = useNavigate();

if(loading){
    return(
        <h1>Loading...</h1>
    )
}

async function handelSubmit(e) {
    e.preventDefault()

        handleLogin(username, password)
        .then(res=>{
            console.log(res);
                navigate("/feed")
        })
        .catch(err=>{
            console.log(err)
            seterror(err?.response?.data?.message ||
            "Login failed")

        })
}

  return (
    <main>
        <div className="from-container">
            <h1>Login</h1>
            <form onSubmit={handelSubmit}>

                {error && <p className="error">{error}</p>}

                <input onInput={(e)=>{setusername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='Enter Username' />


                <input onInput={(e)=>{setpassword(e.target.value)}}
                type="password" 
                name='password' 
                placeholder='Enter Password' />

            <button type='submit'> Login </button>

            </form>
            <p>Don't have an account?<Link 
            className='toggleAuthform' to="/register"> Login</Link></p>
        </div>
    </main>
  )
}

export default Login