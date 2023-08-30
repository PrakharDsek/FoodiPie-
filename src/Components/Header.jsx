import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {  useRef } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const Header = ({isAuth}) => {
  const [showMenu, setShowMenu] = useState(false);
  const myRef = useRef();
  const NavigateTo = useNavigate("");
  const {userData}=useSelector((state) => state.user);
  const toggleMenu = () => { 
    setShowMenu(!showMenu);
  };
  return (
    <Container ref={myRef}>
      <Content>
        <div
  style={{
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.159), rgba(0, 0, 0, 0)), linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), #141414b9",
    backgroundBlendMode: "overlay",
    border: "1px solid",
    width: "100%",
    height: "6em",
    position: "fixed",
    top: 0,
    zIndex: 99
  }}
>
          <Hamburgur>
            <StyledHamInput
              type="checkbox"
              id="checkbox"
              onClick={toggleMenu}
            />
            <Styledlabel htmlFor="checkbox" className={showMenu ? "toggle" :'toogle'}>
              <Bars className="bars" id="bar1"></Bars>
              <Bars className="bars" id="bar2"></Bars>
              <Bars className="bars" id="bar3"></Bars>
            </Styledlabel>
          </Hamburgur>
          <Avatar
            onClick={() => NavigateTo("/me/account")}
            className="avatar"
            style={{
              position: "fixed",
              right: 0,
              zIndex: 3,
              margin: "1em",
              border: "1px solid lightgray",
              padding: "0.2em",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
              cursor: "pointer",
              top: 0,
            }}
          />
        </div>
        {showMenu && (
          <Menu className={showMenu ? "slide-in-left" : "slide-out-left"}>
            <MenuContainer>
              <LogoContainer>
                <h1>FoodiePie</h1>
              </LogoContainer>
              <StyledHr />
              <MainMenu>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/"}>Home</MenuItems>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/food/best"}>Best food</MenuItems>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/food/topRated"}>Top Rated</MenuItems>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/food/offers"}>Offers</MenuItems>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/food/search"}>Search</MenuItems>
                {isAuth ? 
                <>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/cart"}>Cart</MenuItems>
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/me/orders"}>Orders</MenuItems>
                </>
                : 
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/account/login"}>Login</MenuItems>
              }{
                 userData.isSeller ==true ? 

                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/seller"}>Seller Dashboard</MenuItems>
                : 
                isAuth ? 
                <MenuItems onClick={() =>setShowMenu(!showMenu)} to={"/reg/seller"}>Register as a seller</MenuItems>
                :""
              }
                <div className="later-visible"></div>
              </MainMenu>
              <StyledHr />
              <LocationPicker>
                <Search className="form">
                  <button>
                    <svg
                      width="17"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-labelledby="search"
                    >
                      <path
                        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor"
                        strokeWidth="1.333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <input
                    className="input"
                    placeholder="Search your location"
                    required=""
                    type="text"
                  />
                  <button className="reset" type="reset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </Search>
                <CurrentLocation>Ews- Delhi Bagan</CurrentLocation>
              </LocationPicker>
            </MenuContainer>
          </Menu>
        )}
      </Content>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0;
  right: 0;
  z-index: 11;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;

  & .later-visible {
    display: none;
  }
  & .avatar {
    :hover {
      background-color: #686868;
      transform: scale(1.2);
      transition: transform background-color 1s ease-in step-start;
    }
  }
  @media (max-width: 520px) {
    box-shadow: none;
    & .later-visible {
      display: flex;
      flex-direction: column;
    }
  }
  .slide-in-left {
    -webkit-animation: slide-in-left 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-left 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .slide-out-left {
    -webkit-animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      both;
    animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }
  @-webkit-keyframes slide-out-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
  }

  @keyframes slide-out-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
  }

  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
const Hamburgur = styled.div`
  padding: 1em;
  z-index: 126;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;

  #checkbox:checked + .toggle .bars {
    margin-left: 13px;
  }
  #checkbox:checked + .toggle #bar2 {
    transform: rotate(135deg);
    margin-left: 0;
    transform-origin: center;
    transition-duration: 0.3s;
  }

  #checkbox:checked + .toggle #bar1 {
    transform: rotate(45deg);
    transition-duration: 0.3s;
    transform-origin: left center;
  }

  #checkbox:checked + .toggle #bar3 {
    transform: rotate(-45deg);
    transition-duration: 0.3s;
    transform-origin: left center;
  }
`;
const StyledHamInput = styled.input`
  display: none;
  position: fixed;
  top: 10px;
  `;
const Bars = styled.div`
  width: 100%;
  z-index:1933;
  position: static;
  height: 4px;
  background-color: #fff;
  border-radius: 5px;
  transition-duration: 0.3s;
`;
const Styledlabel = styled.label`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: 0.3s;
`;

const Menu = styled.div`
  height: 110vh;
  width: 30%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background:linear-gradient(to top, rgba(0, 0, 0, 0.159), rgba(0, 0, 0, 0)), linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), #141414b9;
  position: fixed;
  background-blend-mode:overlay;
  top: 0;
  z-index: 18;
  color:#fff;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 800px) {
    width: 50%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`;
const MenuContainer = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const LogoContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHr = styled.hr`
  width: 100%;
  height: 0.2em;
  background-color: #c29e0cc0;
  border: none;
  border-bottom: 1px solid #fff;
`;
const MainMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 1em;
`;
const MenuItems = styled(Link)`
  font-weight: 900;
  font-size: medium;
  font-family: var(--kanti-font);
  text-decoration: none;
  margin: 0.4em;
  color: #fff;

  :hover {
    cursor: pointer;
    color: gray;
  }
`;
const LocationPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 0em;
  margin: 1em 0;
  width: 100%;
  .form button {
    border: none;
    background: none;
    color: #8b8ba7;
  }
  /* styling of whole input container */
  .form {
    --timing: 0.3s;
    --width-of-input: 200px;
    --height-of-input: 40px;
    --border-height: 2px;
    --input-bg: #fff;
    --border-color: #2f2ee9;
    --border-radius: 30px;
    --after-border-radius: 1px;
    position: relative;
    width: 90%;
    height: var(--height-of-input);
    display: flex;
    align-items: center;
    padding-inline: 0.8em;
    border-radius: var(--border-radius);
    transition: border-radius 0.5s ease;
    background: var(--input-bg, #fff);
  }
  /* styling of Input */
  .input {
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
  }
  /* styling of animated border */
  .form:before {
    content: "";
    position: absolute;
    background: var(--border-color);
    transform: scaleX(0);
    transform-origin: center;
    width: 100%;
    height: var(--border-height);
    left: 0;
    bottom: 0;
    border-radius: 1px;
    transition: transform var(--timing) ease;
  }
  /* Hover on Input */
  .form:focus-within {
    border-radius: var(--after-border-radius);
  }

  input:focus {
    outline: none;
  }
  /* here is code of animated border */
  .form:focus-within:before {
    transform: scale(1);
  }
  /* styling of close button */
  /* == you can click the close button to remove text == */
  .reset {
    border: none;
    background: none;
    opacity: 0;
    visibility: hidden;
  }
  /* close button shown when typing */
  input:not(:placeholder-shown) ~ .reset {
    opacity: 1;
    visibility: visible;
  }
  /* sizing svg icons */
  .form svg {
    width: 17px;
    margin-top: 3px;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  & .MuiSvgIcon-root {
    background-color: #fffefe;
    padding: 0.14em;
    border-radius: 0em;
    border: none;
  }
`;

const CurrentLocation = styled.h6`
  margin: 2em 0;
  padding: 1em;
  font-family: var(--kanti-font);
  font-weight: 800;
  font-size: small;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.2em;
  width: 80%;
`;
