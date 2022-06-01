import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Robot from "../assets/robot.gif"
export default function Welcome({ currentUser }) {
  return (
    <Container>
     <img src={Robot} alt="Robot" />
     <h1>欢迎,<span>{currentUser.username}</span></h1>
     <h3>请点击左侧的用户列表开始聊天</h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`
