import styled from "styled-components"
import { CartContainer } from "../../Components/CartContainer"
import { Heading } from "../Login"
import { Add } from "@mui/icons-material"
import OtherOptions from "../../Components/OtherOptions"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const SellFoodForm = () => {
  const {userData}=useSelector((state) => state.user);
  const Navigate=useNavigate()
  return (
    <Container>
      <CartContainer>
        <Heading>Welcome, {userData.name}</Heading>
        <AddProductContainer>
          <Add onClick={() =>Navigate("/seller/add")} />
          <SmallHeading>Add product</SmallHeading>{" "}
        </AddProductContainer>
        <OtherOptionsContainer>
          <OtherOptions
            optionName={"All items out"}
            optionDetail={"Your all items on FoodiePie."}
            path={"/seller/all"}
          />
          <OtherOptions
            optionName={"Update an item"}
            optionDetail={"Update the item."}
            path={"/seller/update"}
          />
          <OtherOptions
            optionName={"Delete an item"}
            optionDetail={
              "Delete an item, if is'nt available due to some circumstances."
            }
            path={"/seller/delete"}
          />
      
        </OtherOptionsContainer>
      </CartContainer>
    </Container>
  );
}

export default SellFoodForm
const Container=styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin:6em 0;
`
const AddProductContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50vh;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .MuiSvgIcon-root {
    :hover {
      transform: scale(2);
      transition: transform 0.2s ease-in;
      cursor: pointer;
    }
  }
`;
const OtherOptionsContainer=styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    min-height:70vh;
    height:100%;
    width:100%;
`
const SmallHeading=styled.h4`
    font-family:var(--sans-font);
    font-size: small;
    letter-spacing: 1px;
    font-weight: 500;
`

