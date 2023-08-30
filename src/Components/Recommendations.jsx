import axios from "axios";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import Notify from "../Utils/NotificationSystem";

const FoodRecomLoader = () => (
  <ContentLoader
    speed={1.5}
    width={700}
    height={100}
    viewBox="230"
    backgroundColor="#dfdfd3"
    foregroundColor="#f1f1ea"
  >
    <rect x="0" y="55" rx="5" ry="5" width="70" height="25" />
    <rect x="555" y="0" rx="5" ry="0" width="75" height="74" />
    <rect x="0" y="0" rx="5" ry="5" width="240" height="20" />
    <rect x="3" y="25" rx="5" ry="5" width="50" height="22" />
  </ContentLoader>
);

const Recommendations = ({
  name,
  price,
  img,
  type,
  action,
  backendUrl,
  id,
  callBack,
}) => {
  const deleteItem = async () => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/food/remove?foodItemId=${id}`
      );
      callBack();
      Notify("success", "SuccessFully removed food item");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Content>
        {!name || !price || !img ? (
          <FoodRecomLoader />
        ) : (
          <>
            <Dish>
              <Name>{name}</Name>
              <FoodCategory>{type}</FoodCategory>
              <Price>₹ {price}</Price>
            </Dish>
            <DishImage>
              <Image
                onClick={action !== "delete" ? action : deleteItem}
                src={img}
              />
            </DishImage>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Recommendations;

const Container = styled.div`
  width: 90%;
  height: auto;
  margin: 1em 0;
`;
const Content = styled.div`
  border: 1px solid lightgray;
  padding: 1em;
  border-radius: 0.2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dish = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Name = styled.h3`
  font-family: var(--quick-font);
  letter-spacing: 1px;
  margin: 1em 0 0 0;
`;
const FoodCategory = styled.h6`
  font-family: var(--kanti-font);
  letter-spacing: 1px;
  margin: 1em;
`;
const Price = styled.h5`
  line-height: 0px;
  font-family: var(--quick-font);
  letter-spacing: 1px;
  margin: 1em;
`;
const DishImage = styled.div`
  border-radius: 1em;
`;
const Image = styled.img`
  width: 100px;
  border-radius: 1em;
`;
