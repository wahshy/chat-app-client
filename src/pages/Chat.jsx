import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { allUsersRoute } from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"

export default function Chat() {
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [currentChat, setCurrentChat] = useState({})
  const navigate = useNavigate()
  const socket = useRef()
  useEffect(() => {
    ;(async () => {
      if (localStorage.getItem("chat-app-user")) {
        setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
      } else {
        navigate("/login")
      }
    })()
  }, [navigate])

  useEffect(() => {
    ;(async () => {
      if (JSON.stringify(currentUser) !== "{}") {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          )
          setContacts(data)
        } else {
          navigate("/setAvatar")
        }
      }
    })()
  }, [currentUser, navigate])

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            setCurrentChat={setCurrentChat}
          />
          {JSON.stringify(currentChat) === "{}" ? (
            <Welcome currentUser={currentUser}/>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 1rem;
    overflow: hidden;
  }
`
