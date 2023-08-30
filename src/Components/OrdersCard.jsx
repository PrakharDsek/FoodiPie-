import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrdersCard = ({ orderId, itemName, placed, recived, total }) => {
  const NavigateTo = useNavigate();
  const FormalDateConverter = (date ) => {
    const formalDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
   
    });
    return formalDate;
  };
  return (
    <Container onClick={() => NavigateTo("")}>
      <Content>
        <OrderDetail>{itemName}</OrderDetail>
        <OrderDetail>{FormalDateConverter(placed)}</OrderDetail>
        <OrderDetail>{FormalDateConverter(recived)}</OrderDetail>
        <OrderDetail>₹ {total}</OrderDetail>
      </Content>
    </Container>
  );
};

export default OrdersCard;

const Container = styled.div`
  width: 100%;
  margin: 1em;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 0.2em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const OrderDetail = styled.h5`
  font-family: var(--quick-font);
  font-size: small;
  font-weight: 500;
  letter-spacing: 1px;
`;
