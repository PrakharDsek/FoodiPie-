import styled from "styled-components";
import { CartContainer } from "../../Components/CartContainer";
import { Heading } from "../Login";
import OrdersCard from "../../Components/OrdersCard";
import { motion } from "framer-motion";
import { Detail } from "../../Components/OtherOptions";
const OrdersPlaced = () => {
  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <CartContainer>
        <Heading>Orders Placed</Heading>
        <Detail>
          The orders viewed here are your items that has benn placed
        </Detail>
        <OrdersHeader>
          <OrdersHeading>Order</OrdersHeading>
          <OrdersHeading>Item Name</OrdersHeading>
          <OrdersHeading>Date placed</OrdersHeading>
          <OrdersHeading>Date Recive</OrdersHeading>
          <OrdersHeading>Total</OrdersHeading>
        </OrdersHeader>
        <OrdersContainer>
          <OrdersCard />
        </OrdersContainer>
      </CartContainer>
    </Container>
  );
};

export default OrdersPlaced;
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OrdersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
