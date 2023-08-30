import styled from "styled-components";
import { CartContainer } from "../Components/CartContainer";
import { Heading } from "./Login";
import Input from "../Components/Input";
import { ProgressContainer, StyledBtns } from "./Cart";
import CartProgress from "../Components/CartProgress";
import { motion } from "framer-motion";
import { useState } from "react";
import CryptoJS from "crypto-js";

const Checkout = () => {
  const Inputs = ["Name", "Email", "Delivery Address", "Phone Number"];

  const [form, setForm] = useState({
    Name: "",
    Email: "",
  });

  const encryptForm = () => {
    const formString = JSON.stringify(form);
    const secretKey = "##ppdes#";
    const encrypted = CryptoJS.AES.encrypt(formString, secretKey).toString();
    const encodedEncrypted = encodeURIComponent(encrypted);

    return encodedEncrypted;
  };

  console.log(encryptForm());

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <Content>
        <CartContainer>
          <Heading>Checkout</Heading>
          <ProgressContainer>
            <CartProgress task="Cart" taskDone={true} /> {">"}
            <CartProgress task="Checkout" taskDone={true} /> {">"}
            <CartProgress task="Payments" taskDone={false} />
          </ProgressContainer>
          {Inputs.map((placeholders) => (
            <>
              <InputContainer>
                <Input placeholder={placeholders} onChangeHandler={setForm} />
              </InputContainer>
            </>
          ))}
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <StyledBtns to={`/cart/checkout/payments/${encryptForm()}`}>
              Proceed to payments
            </StyledBtns>
          </div>
        </CartContainer>
      </Content>
    </Container>
  );
};

export default Checkout;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  margin: 4em 0;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  padding: 1em;
`;
