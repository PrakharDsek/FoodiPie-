import styled from "styled-components";
import { CartContainer } from "../Components/CartContainer";
import { Heading } from "./Login";
import Recommendation from "../Components/Recommendations";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Detail } from "../Components/OtherOptions";
import { useState } from "react";
import Notify from "../Utils/NotificationSystem";

const SearrchResults = ({ backendUrl, navigateTo }) => {
  const { query } = useParams();
  const [items, setItems] = useState([]);

  const { ref: component, inView: componentInView } = useInView();
  const getDataByQuery = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/food/search?query=${query}`
      );
      setItems(data.data);
    } catch (error) {
      Notify("error", error.response.data.message);
      console.log("An error occured: ", error.response.data.message);
    }
  };
  useState(() => {
    getDataByQuery();
  }, []);

  return (
    <Container>
      <CartContainer>
        <Heading>
          Search result based on your search <Detail>{query}</Detail>
        </Heading>
        <ItemsContainer
          className={componentInView ? "slide-in-left" : ""}
          ref={component}
        >
          {items && items.length > 0 ? (
            items.map((food) => (
              <Recommendation
                name={food.name}
                price={food.price}
                img={food.images[0].imageURL}
                key={food._id}
                type={food.type}
                action={() => navigateTo(`/food/${food._id}`)}
              />
            ))
          ) : (
            <h4 style={{ fontFamily: "var(--kanti-font)" }}>
              No item found with the name
            </h4>
          )}
        </ItemsContainer>
      </CartContainer>
    </Container>
  );
};

export default SearrchResults;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 6em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .slide-in-left {
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes slide-in-left {
      0% {
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
`;
const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
