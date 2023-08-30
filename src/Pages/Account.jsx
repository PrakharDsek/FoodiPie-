import styled from "styled-components";
import { CartContainer } from "../Components/CartContainer";
import { Heading } from "./Login";
import { StyledBtns } from "./Cart";
import Input from "../Components/Input";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import Notify from "../Utils/NotificationSystem";

const Account = ({ backendUrl }) => {
  const [disabled, setDisabled] = useState(true);
  const { userData } = useSelector((state) => state.user);
const [inputData, setInputData] = useState({
  address: userData.address,
  phoneNo: userData.phoneNo,
});

  const buttonChange = async (e) => {
    e.preventDefault();
    setDisabled(!disabled);
     const update=async  () => {
try {
      if (disabled == !false) {
        const updateCredits = await axios.put(`${backendUrl}/user/update`, {
          update: inputData,
          id: userData._id,
        });
      }

      Notify("success", "Update was successfull");
    } catch (error) {
      Notify(
        "error",
        "Something went wrong while performing previous action !!"
      );
    }
  }

  update()
    
  };

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <CartContainer>
        <Heading>Your Account</Heading>
        <AccountDetails>
          <Details>
            <Label>User Name</Label>
            <Current>{userData.name}</Current>
          </Details>
          <Details>
            <Label>Email id</Label>
            <Current>{userData.email}</Current>
          </Details>
          <Details style={{ width: "90%" }}>
            <Label>Address</Label>
            <Input
              onChangeHandler={setInputData}
              disabled={disabled}
              placeholder={disabled ? userData.address : "address"}
              style={{ width: "90%", padding: 0, margin: 0 }}
            />
          </Details>
          <Details style={{ width: "90%" }}>
            <Label>Phone number</Label>
            <Input
              onChangeHandler={setInputData}
              disabled={disabled}
              placeholder={disabled ? userData.phoneNo : "phoneNo"}
              style={{ width: "90%", padding: 0, margin: 0 }}
            />

            <StyledBtns
              onClick={buttonChange}
              style={{ width: "80%", margin: "2em 0" }}
            >
              {disabled ? "Make changes" : "Save changes"}
            </StyledBtns>
          </Details>
        </AccountDetails>
      </CartContainer>
    </Container>
  );
};

export default Account;
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Current = styled.h5`
  font-family: var(--kanti-font);
  color: gray;
  font-weight: 500;
  font-size: medium;
  letter-spacing: 1px;
  line-height: 12px;
  border-bottom: 1px solid lightgray;
  padding: 0.2em;
  width: 85%;
`;
const Label = styled.h3`
  font-family: var(--sans-font);
  font-weight: 700;
  line-height: 2px;
`;
const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  text-align: start;
  padding: 2em;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
`;
