import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.svg"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { loginRoute } from "../utils/APIRoutes"
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  useEffect(() => { 
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
   }, [navigate])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    const { email, password } = values
    let flag = true
    if (email === "" || password === "") {
      toast.error("邮箱或密码为空", toastOptions)
      flag = false
    }
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    if (!regEmail.test(email)) {
      toast.error("邮箱格式错误", toastOptions)
      flag = false
    }
    return flag
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      const { username, email, password } = values
      const { data } = await axios.post(loginRoute, {
        username,
        email,
        password,
      })
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        navigate("/")      
      } else {
        toast.error(data.msg, toastOptions)
      }
    }
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>SNAPPY</h1>
          </div>
          <input
            type="text"
            placeholder="电子邮箱"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="密码"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">登录</button>
          <span>
            没有账号？<Link to="/register">注册</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      font-size: 1rem;
      cursor: pointer;
      font-weight: bold;
      border: none;
      transition: 0.5s ease-in-out();
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      text-align: center;
      color: white;
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`
