import styled from "styled-components";
import { Heading, SmallHeading } from "./Login";
import { CartContainer } from "../Components/CartContainer";
import { Detail } from "../Components/OtherOptions";
import Input from "../Components/Input";
import { StyledBtns } from "./Cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useDispatch } from "react-redux";
import Notify from "../Utils/NotificationSystem";
import { setUserData } from "../Redux/User";

const CreatenewAccount = ({ backendUrl, navigateTo }) => {
  const [nextForm, setNextForm] = useState(false);
  const [disable, setdisable] = useState(false);
  const NavigateTo = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
    pref: "",
  });
  const { ref: component, inView: componentInView } = useInView();
  const { ref: Secomponent, inView: SecomponentInView } = useInView();
  const dispatch = useDispatch();

  const makeNewAccount = async () => {
    try {
      setdisable(true);
      const { data } = await axios.post(`${backendUrl}/user/accounts/new`, {
        name: form.name,
        email: form.email,
        address: form.address,
        phoneNo: form.phoneNo,
        password: form.password,
        pref: form.pref,
      });
      dispatch(setUserData(data.data));
      navigateTo("/account/creation=success");
    } catch (error) {
      setdisable(false);
      Notify("error", error.response.data.message);
      console.log("An error occured: ", error.response.data.message);
    }
  };


  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <CartContainer>
        <Heading>Create a new account</Heading>
        <Detail>Please fill the below form to create an account</Detail>
        {!nextForm ? (
          <>
            <Form
              className={componentInView ? "slide-in-left" : ""}
              ref={component}
            >
              <Input
                style={{ width: "23rem" }}
                placeholder="Your name"
                type="text"
                value={form.name}
                onChangeHandler={setForm}
                onChangeVal={"name"}
              />
              <Input
                onChangeHandler={setForm}
                onChangeVal={"email"}
                value={form.email}
                style={{ width: "23rem" }}
                placeholder="Your email"
                type="email"
              />
              <Input
                style={{ width: "23rem" }}
                onChangeHandler={setForm}
                onChangeVal={"password"}
                value={form.password}
                placeholder="Your password"
                type="email"
              />
              <button
                onClick={() => setNextForm(!nextForm)}
                style={{ width: "70%", margin: "2em 0" }}
              >
                Continue
              </button>
              <SmallHeading>
                Already a account ?
                <span onClick={() => NavigateTo("/account/login")}>
                  {" "}
                  Login{" "}
                </span>{" "}
                instead
              </SmallHeading>
            </Form>
          </>
        ) : (
          <>
            <Form
              className={SecomponentInView ? "slide-in-left" : ""}
              ref={Secomponent}
            >
              <Input
                style={{ width: "23rem" }}
                onChangeHandler={setForm}
                onChangeVal={"phoneNo"}
                value={form.phoneNo}
                placeholder="Your phone number"
                type="email"
              />
              <Input
                value={form.address}
                onChangeHandler={setForm}
                onChangeVal={"address"}
                style={{ width: "23rem" }}
                placeholder="Your address"
                type="text"
              />
              <Input
                value={form.pref}
                style={{ width: "23rem" }}
                placeholder="Your dish preference (veg/non-veg/both)"
                type="text"
                onChangeHandler={setForm}
                onChangeVal={"pref"}
              />

            <button
                onClick={makeNewAccount}
                style={{ width: "70%", margin: "2em 0" }}
                disable={disable}
              >
                Create account
              </button>
              <SmallHeading>
                Already a account ?
                <span onClick={() => NavigateTo("/account/login")}>
                  {" "}
                  Login{" "}
                </span>{" "}
                instead
              </SmallHeading>
            </Form>
          </>
        )}
      </CartContainer>
    </Container>
  );
};

export default CreatenewAccount;
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6em 0;
  .slide-in-left {
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes slide-in-left {
      0% {
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
`;
const Form = styled(motion.form)`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 1em 0;
`;
