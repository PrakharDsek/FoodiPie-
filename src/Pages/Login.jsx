/* This is a React component called "Login". It is responsible for rendering a login
form and handling the login functionality. */
import styled from "styled-components";
import Input from "../Components/Input";
import StyledBtn from "../Components/StyledBtn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Notify from "../Utils/NotificationSystem";
import { setUserData } from "../Redux/User";
import { useEffect } from "react";
import Cookies from "js-cookie";
import {Link} from "react-router-dom"

const Login = ({ backendUrl, navigateTo }) => {
  const NavigateTo = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const cookie = Cookies.get("token");


  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

const makeLogin = async () => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/user/accounts/login`,
      {
      email: form.Email, 
        password: form.Password,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(setUserData(data.data));
      navigateTo("/");
  } catch (error) {
    Notify("error", error.response.data.message);
    console.log("An error occurred: ", error.response.data.message);
  }
};

  useEffect(() => {
    if (userData.length > 0 || userData._id || cookie) {
      navigateTo("/");
    } else {
      console.log(cookie);
      console.log("Welcome to login, please login to continue...");
    }
  }, [userData, cookie, navigateTo]);
  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <Content>
        <LoginContent>
          <Heading>Login</Heading>
          <Form>
            <Input
              onChangeHandler={setForm}

              style={{ width: "100%" }}
              placeholder="Email"
              type="text"
            />
            <Input
              onChangeHandler={setForm}
              placeholder="Password"
              type="password"
            />
          </Form>
          <ButtonContainer>
            <StyledBtn handler={makeLogin} placeholder="Login" />
          </ButtonContainer>
          <SmallHeading>
            New, Foodie?
            <Link to="/account/new">
              {" "}
            <span onClick={() => NavigateTo("/account/new")}>
              {" "}
            </span>{" "}
              Create account{" "}
            </Link>
            instead
          </SmallHeading>
        </LoginContent>
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  margin: 6em 0em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  background-color: #f9f7f3;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 0.2em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 20%;
  @media (max-width: 800px) {
    width: 90%;
  }
  height: auto;
  min-height: 50vh;
`;
const LoginContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Heading = styled.h2`
  font-family: var(--sans-font);
  font-weight: 800;
  font-size: xx-large;
  letter-spacing: 1px;
  line-height: 12px;
  margin-bottom: 2em;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SmallHeading = styled.h5`
  font-family: var(--kanti-font);
  font-weight: 400;
  line-height: 14px;
  font-size: small;
  & span {
    color: blue;
    cursor: pointer;
  }
`;
