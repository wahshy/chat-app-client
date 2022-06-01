import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import ChatInput from "./ChatInput"
import Messages from "./Messages"

export default function ChatContainer({ currentChat }) {
  const handleSendMsg = () => {
    
  }
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
              className="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <Messages/>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 70% 20%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`
