import styled from "styled-components"
import Recommendations from "../../Components/Recommendations"
import { StyledBtns } from "../Cart"
import { CartContainer } from "../../Components/CartContainer"
import { Heading } from "../Login"
import { Detail } from "../../Components/OtherOptions"
import { motion } from "framer-motion"
const Revenue = () => {
  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <CartContainer>
        <Heading>Your Revenue</Heading>
        <AmountDisplayer>
          <Amount>₹400</Amount>
        </AmountDisplayer>
        <Detail>Sold items</Detail>
        <SoldItemsContainer>
          <Recommendations />
        </SoldItemsContainer>
        <StyledBtns style={{ width: "90%" }}>Collect the amount</StyledBtns>
      </CartContainer>
    </Container>
  );
}

export default Revenue

const Container=styled(motion.div)`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content: center;
`
const AmountDisplayer=styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    width:100%;
    height:100%;
`
const Amount = styled.h1`
  font-family: var(--kanti-font);
  font-size: xxx-large;
  letter-spacing: 1px;
`;
const SoldItemsContainer=styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    flex-wrap: wrap;
    margin:2em 0;
`