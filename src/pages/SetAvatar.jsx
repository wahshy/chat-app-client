import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { Buffer } from "buffer"
import multiavatar from "@multiavatar/multiavatar"
import { setAvatarRoute } from "../utils/APIRoutes"

export default function SetAvatar() {
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  }

  const refreshAvatars = () => {
    setSelectedAvatar(undefined)
    const data = []
    for (let i = 0; i < 4; i++) {
      const image = multiavatar(`${Math.round(Math.random() * 999999)}`)
      data.push(Buffer.from(image).toString("base64"))
    }
    setAvatars(data)
  }

  useEffect(refreshAvatars, [])

  useEffect(() => {
    const user= JSON.parse(localStorage.getItem("chat-app-user"))
    if (!user) {
      navigate("/login")
    }else if(user.isAvatarImageSet){
      navigate("/")
    }
  }, [navigate])

  const setAvatar = async () => {
    if (selectedAvatar === undefined) {
      toast.error("请选择一个头像", toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      if (data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImage = data.image
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate("/")
      } else {
        toast.error("设置头像失败", toastOptions)
      }
    }
  }

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>选择你的头像</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                key={avatar}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => {
                    setSelectedAvatar(index)
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="btns">
          <button className="refresh-btn" onClick={refreshAvatars}>
            刷新
          </button>
          <button className="submit-btn" onClick={setAvatar}>
            确定
          </button>
        </div>
        <ToastContainer />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      cursor: pointer;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
    }
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    .refresh-btn,
    .submit-btn {
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
  }
`
