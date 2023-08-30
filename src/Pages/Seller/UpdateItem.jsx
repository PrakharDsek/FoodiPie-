import styled from "styled-components";
import { CartContainer } from "../../Components/CartContainer";
import { Heading } from "../Login";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { GetSellerItems } from "../../Components/GetSellerItems";


const UpdateItem = ({backendUrl}) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <CartContainer>
        <Heading>Update Item(food)</Heading>
        <UpdateContainer>
          <SmallHeading>Select one of the item to view and update</SmallHeading>
          <FoodContainer>
          <GetSellerItems backendUrl={backendUrl} sellerId={userData._id} update={true}/>       

          </FoodContainer>
        </UpdateContainer>
      </CartContainer>
    </Container>
  );
};

export default UpdateItem;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SmallHeading = styled.h4`
  font-family: var(--sans-font);
`;
const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const FoodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
