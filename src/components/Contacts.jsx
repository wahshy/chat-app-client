import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import Logout from "./Logout"

export default function Contacts({ contacts, currentUser, setCurrentChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined)
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    setCurrentChat(contact)
  }
  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>SNAPPY</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={contact._id}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    className="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            )
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={
                JSON.stringify(currentUser) !== "{}"
                  ? `data:image/svg+xml;base64,${currentUser.avatarImage}`
                  : ""
              }
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUser.username}</h2>
          </div>
        </div>
        <Logout/>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 70% 10% 10%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      height: 5rem;
      background-color: #ffffff34;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
    }
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
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
      img{
        height: 4rem;
      }
    }
    .username{
      h2{
        color: white;
      }
    }
  }
`
