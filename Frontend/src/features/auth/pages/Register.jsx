import React, { useState } from 'react'
import "../style/login.scss"
import { Link, useNavigate } from "react-router";
import { useAuth } from '../hooks/useAuth';

const Register = () => {

const [username, setusername] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [error, seterror] = useState("")
const { handleRegister, loading } = useAuth()
const navigate = useNavigate();

if(loading){
    return(
        <h1>Loading...</h1>
    )
}

async function handelSubmit(e) {
    e.preventDefault()

    handleRegister (username, email, password)
        .then(res=>{
            console.log(res);
            navigate("/feed")
        })
        .catch(err=>{
            console.log(err)
            seterror(err?.response?.data?.message ||
            "Registration failed")

        })
}

  return (
    <main>
        <div className="from-container">
            <h1>Register </h1>
            <form onSubmit={handelSubmit}>

                {error && <p className="error">{error}</p>}

                <input onInput={(e)=>{setemail(e.target.value)}}
                type="text" 
                name='email'
                placeholder='Enter Email ID' />

                <input onInput={(e)=>{setusername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='Enter Username' />

                <input  onInput={(e)=>{setpassword(e.target.value)}}
                type="password" 
                name='password' 
                placeholder='Enter Password' />
                <button type='submit'> Register </button>
            </form>
            <p>Already have an account?<Link 
            className='toggleAuthform' to="/login"> Login</Link></p>
        </div>
    </main>
  )
}

export default Register