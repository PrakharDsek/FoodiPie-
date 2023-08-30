import styled from "styled-components";
import { CartContainer } from "../../Components/CartContainer";
import FoodCard from "../../Components/FoodCard";
import { Heading } from "../Login";
import { GetSellerItems } from "../../Components/GetSellerItems";
import { useSelector } from "react-redux";

const Allitems = ({backendUrl}) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <Container>
      <CartContainer>
        <Heading>All items(food)</Heading>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
        <GetSellerItems backendUrl={backendUrl} sellerId={userData._id}/>       
        </div>
      </CartContainer>
    </Container>
  );
};

export default Allitems;

const Container = styled.div`
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;
