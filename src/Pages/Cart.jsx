import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Heading } from "./Login";
import CartCard from "../Components/CartCard";
import { CartContainer } from "../Components/CartContainer";
import CartProgress from "../Components/CartProgress";
import Notify from "../Utils/NotificationSystem";

const Cart = ({ backendUrl }) => {
  const [data, setData] = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const { userData } = useSelector((state) => state.user);
  const handleIncrementAndDecrements = (action, setter, current) => {
    if (action === "inc") {
      return setter((prev) => prev + 1);
    } else {
      return setter((prev) => (prev == 0 ? 0 : prev - 1));
    }
  };

  
  const fetchUserCart = async () => {
    try {
      const usdata = await axios.get(
        `${backendUrl}/user/findId?id=64997e900ba4086b46e4121f&${userData._id}`, // This line seems to have a typo
        {
          withCredentials: true,
        }
      );

      const fetchSavedItemsData = async () => {
        const savedItemsData = await Promise.all(
          usdata.data.data.savedItems.map(async (item) => {
  
            if (!item.itemId ==undefined ) {
              return ("")
            } else {
              const response = await axios.get(
                `${backendUrl}/food/get?category=byId&id=${item.itemId}`
              );
              return response.data.data;
            }
          })
        );

        setData((prevData) => ({
          ...prevData,
          items: savedItemsData,
        }));
      };

      await fetchSavedItemsData(); // Wait for the saved items data to be fetched
    } catch (error) {
      Notify("error", error.message);
    }
  };



 
  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(
        `${backendUrl}/food/remFromCart?itemId=${itemId}&userId=${userData._id}`,
        {
          withCredentials: true,
        }
      ); 
      fetchUserCart();
      Notify("success", "Removed the item from cart");
    } catch (error) {
      console.log(error.message);
      Notify("error", "Can't perform the task for the moment please try later");
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  useEffect(() => {
    let totalAmount = 0;
    data.items.forEach((item) => {
      totalAmount += item.price;
    });
    setTotal(totalAmount);
  }, [data.items]);

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <Content>
        <CartContainer>
          <Heading>Your cart</Heading>
          <ProgressContainer>
            <CartProgress task="Cart" taskDone={true} /> {">"}
            <CartProgress task="Checkout" taskDone={false} /> {">"}
            <CartProgress task="Payments" taskDone={false} />
          </ProgressContainer>
          <CartItems>
            {data.items.length > 0  ? (
              data.items?.map((item) => (
                <CartCard
                  key={item._id }
                  id={item._id }
                  sHandler={handleRemoveFromCart}
                  handler={handleIncrementAndDecrements}
                  image={item.images ? item.images[0].imageURL : ""}
                  name={item.name }
                  sellerName={item.seller.name}
                />
                
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </CartItems>
          <SubtotalContainer>
            <Subtotal>
              <SubtotalHeading>Total-items</SubtotalHeading>
              <SubAmount>{data.items.length}</SubAmount>
            </Subtotal>
            {data.items.length > 0 ? (
              data.items.map((item) => (
                <Subtotal key={item._id}>
                  <SubtotalHeading>{item.name}</SubtotalHeading>
                  <SubAmount>₹{item.price}</SubAmount>
                </Subtotal>
              ))
            ) : (
              <p>No items in cart</p>
            )}
            <StyledHr />
            <Subtotal>
              <SubtotalHeading>Total</SubtotalHeading>
              <SubAmount>₹{total}</SubAmount>
            </Subtotal>
            <StyledBtns to="/cart/checkout">Proceed to checkout</StyledBtns>
          </SubtotalContainer>
        </CartContainer>
      </Content>
    </Container>
  );
};

export default Cart;

const Container = styled(motion.div)`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin: 6em 0;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 80%;
  height: auto;
  @media (max-width: 500px) {
    & .cartI {
      margin: 0.2em;
    }
  }
`;
const SubtotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84%;
  height: auto;
  padding: 2em;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 1em 2em;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 0.4em;
  background-color: #ffffff;
  @media (max-width: 800px) {
    width: 100%;
    margin: 0 0 0 0;
    padding: 0;
  }
`;
const Subtotal = styled.div`
  padding: 0em;
  border-bottom: 1px solid lightgray;
  display: flex;
  width: 90%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  & btn {
    width: 100%;
    height: 100%;
  }
`;

const SubtotalHeading = styled.h5`
  font-size: large;
  letter-spacing: 1px;
  font-family: var(--kanti-font);
`;
const SubAmount = styled.h6`
  font-size: large;
  letter-spacing: 1px;
  font-family: var(--kanti-font);
`;
const StyledHr = styled.hr``;
export const StyledBtns = styled(Link)`
  font-family: var(--sans-font);
  text-decoration: none;
  color: white;
  width: 100%;
  height: 100%;
  padding: 2em;
  border: 1px solid lightgray;
  border-radius: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--theme);
  cursor: pointer;
  :hover {
    animation: bgFade 1s ease-in;
    background-color: black;
    color: white;
  }

  @keyframes bgFade {
    0% {
      background-color: #3b3a3a;
    }
    50% {
      background-color: #302f2f;
    }
    100% {
      background-color: black;
    }
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  @media (max-width: 600px) {
    width: 70%;
  }
`;
