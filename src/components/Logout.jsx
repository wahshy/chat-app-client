import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
      localStorage.clear();
      navigate("/login");
  };
  return (
    <Container>
      <button onClick={handleClick}>
      <BiPowerOff />
      </button>
    </Container>
  )
}

const Container = styled.div`
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 5rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
      font-size: 1.3rem;
      color: #ebe7ff;
    }
    &:hover {
        background-color: #4e0eff;
      }
  }
`
