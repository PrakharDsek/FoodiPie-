import styled from "styled-components";
import { Heading } from "../Pages/Login";
import FoodCard from "./FoodCard";

const OtherPagesLayout = ({ title, items }) => {
    return (
    <Container>
      <Content>
        <Heading>{title}</Heading>
        <FoodCardContainer>
          {items.data || items.length > 0 ? (
            items.data.map((food) => (
              <FoodCard
                key={food._id}
                productImage={food.images[0].imageURL}
                productPrice={food.price}
                productTitle={food.name}
                productDesc={food.smallDesc}
                address={food._id}
              />
            ))
          ) : (
            <Heading>No food available for the moment</Heading>
          )}
        </FoodCardContainer>
      </Content>
    </Container>
  );
};

export default OtherPagesLayout;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin: 6em 0;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const FoodCardContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
