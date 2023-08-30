import { useState } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

const CartCard = ({ handler, image, name, sellerName, sHandler ,id ,item}) => {

  const [quantity, setQuantity] = useState(1);
  return (
    <Container className="cartI">
      <Content>
        <Right>
          <Image src={image && image!==undefined ? image : ""} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FoodName>{name}</FoodName> <FoodSeller>By {sellerName && sellerName!==undefined ? sellerName :"-"}</FoodSeller>
          </div>
        </Right>
        <Middle>
          <Counter>
            <CounterBtn onClick={() => handler("inc", setQuantity, quantity)}>
              +
            </CounterBtn>
            <CounterDisplay>{quantity}</CounterDisplay>
            <CounterBtn onClick={() => handler("dec", setQuantity, quantity)}>
              -
            </CounterBtn>
          </Counter>
        </Middle>
        <Left>
          <Close
            onClick={() => sHandler(id)}
          />
        </Left>
      </Content>
    </Container>
  );
};

export default CartCard;
const Container = styled.div`
  width: 80%;
  height: 30%;
  border: 1px solid lightgray;
  border-radius: 0.2em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #ffffff;
  margin: 1em;
  padding: 2em;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Left = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 40%;
  height: 20%;
  border-radius: 0.4em;
  background-color: transparent;
`;
const FoodName = styled.h3`
  font-family: var(--kanti-font);
  font-weight: 600;
  font-size: large;
  letter-spacing: 1px;
  line-height: 1px;
  margin: 0 0.1em;
`;
const FoodSeller = styled.h6`
  font-family: var(--sans-font);
  font-weight: 400;
  font-size: x-small;
  line-height: 1px;
  margin: 2em -0.7em;
`;
const Counter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const StyledCheckBox = styled.input``;
const CounterBtn = styled.button`
  margin: 0.9em;
  width: 3em;
  background-color: #e2a600b5;
  height: 2em;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 0.2em;
  justify-content: center;
`;
const CounterDisplay = styled.h5`
  font-family: var(--slow-font);
  font-weight: 400;
  width:1em;
  height:100%;`;
