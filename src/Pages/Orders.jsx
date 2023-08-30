import styled from "styled-components";
import { CartContainer } from "../Components/CartContainer";
import { Heading } from "./Login";
import OrdersCard from "../Components/OrdersCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Orders = ({ backendUrl }) => {
  const [data, setData] = useState([]);
  const {userData}=useSelector(state => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/orders/getUID?userId=${userData._id}`);
        setData(data.data);
      } catch (error) {
        console.log("An error occured:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <CartContainer>
        <Heading>Your Orders</Heading>
        <OrdersHeader>

          <OrdersHeading>Item Name</OrdersHeading>
          <OrdersHeading>Date placed</OrdersHeading>
          <OrdersHeading>Date Recive</OrdersHeading>
          <OrdersHeading>Total</OrdersHeading>
        </OrdersHeader>
        <OrdersContainer>
          {data && data.length > 0 ? data.map((i) => <OrdersCard orderId={i._id}  itemName={i.orderedItems[0].items.map((i) => `${i.name} `)} total={i.order.total} placed={i.order.placedOn} recived={i.order.recivedBy} key={i._id}  />) : ""}
        </OrdersContainer>
      </CartContainer>
    </Container>
  );
};

export default Orders;
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6em 0;
  min-height:100vh;
`;
const OrdersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

`;
const OrdersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;
const OrdersHeading = styled.h3`
  font-family: var(--sans-font);
  letter-spacing: 1px;
  font-size: large;
`;
