import styled from "styled-components";
import { useRef, useState } from "react";
import image1 from "../assets/service2.jpg";
import image3 from "../assets/service3.jpg";
import image4 from "../assets/service4.jpg";
import image5 from "../assets/service5.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import Offers from "./Offers";
import Recommendations from "./Recommendations";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Notify from "../Utils/NotificationSystem";

const FoodInDetail = ({ backendUrl, navigate }) => {
  const images = [image1, image3, image4, image5];
  const sliderRef = useRef();
  const { Id } = useParams();
  const { userData } = useSelector((state) => state.user);

  const [itemData, setData] = useState([]);
  const [RecomitemData, setRecomData] = useState([]);
  const handleScrollBack = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 100; // Adjust the scroll amount as needed
    }
  };
  const handleScrollFront = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 100; // Adjust the scroll amount as needed
    }
  };

  const getFoodItem = async () => {
    const { data } = await axios.get(
      `${backendUrl}/food/get?category=byId&id=${Id}`
    );
    setData(data.data);
  };
  const addToCart = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/food/addToCart`, {
        itemId: itemData._id,
        userId: userData._id,
      });
      Notify("success", "Successfully added to cart");
    } catch (error) {
      Notify("error", error.response.data.message);
      console.error("An error occured while adding item to cart.");
    }
  };
  const getFoodItemsRecommendations = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/food/get?category=sellerAll&sellerId=${itemData.seller.id}`
      );
      setRecomData(data.data);
    } catch (error) {
      Notify("error", error.response.data.message);
    }
  };
  useEffect(() => {
    getFoodItem();
    getFoodItemsRecommendations();
  }, []);
  return (
    <Container>
      <Content>
        <ImageSlider>
          <ArrowBackIosIcon
            claswsName="backward"
            id="backward"
            onClick={() => handleScrollBack()}
          />
          <Slider ref={sliderRef}>
            {itemData.images &&
              itemData.images.map((image) => (
                <Image src={image.imageURL} key={image._id} />
              ))}
          </Slider>

          <ArrowForwardIosIcon
            className="forward"
            onClick={() => handleScrollFront()}
          />
        </ImageSlider>
        <FoodDetails>
          <Details>
            <DetailContent>
              <DishName>{itemData.name ? itemData.name : ""}</DishName>
              <IconContainer>
                <AddShoppingCartIcon onClick={addToCart}/>
                {/* <TurnedInIcon /> */}
              </IconContainer>
            </DetailContent>
            <SellerName>
              By {itemData.seller ? itemData.seller.name : ""}
            </SellerName>
            <PriceOfFood>₹ {itemData.price ? itemData.price : ""}</PriceOfFood>
            <DishDesc>
              {itemData.description ? itemData.description : ""}
            </DishDesc>
          </Details>
          <ButtonContainer>
            <Button
              onClick={() => navigate(`/buy/instant?id=${itemData._id}}`)}
            >
              Buy now
            </Button>
            <Button onClick={addToCart}>Add to cart</Button>
          </ButtonContainer>
        </FoodDetails>
        <OffersAvailable>
          {itemData.offers
            ? itemData.offers.map((offer) => (
                <Offers
                  key={offer._id}
                  offerHeading={`${offer.discount}% off`}
                  offerDesc={offer.desc}
                />
              ))
            : ""}
        </OffersAvailable>
        <Recommended>
          {RecomitemData.name
            ? RecomitemData.map((item) => (
                <Recommendations
                  name={item.name}
                  type={item.type}
                  price={item.price}
                  img={item.images[0].imageURL}
                  key={item._id}
                />
              ))
            : ""}
        </Recommended>
      </Content>
    </Container>
  );
};

export default FoodInDetail;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
`;

const Content = styled.div`
  border: 1px solid green;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
`;

const ImageSlider = styled.div`
  width: 70%;
  height: 60vh;
  @media (max-width: 700px) {
    width: 100%;
  }
  & #backward {
    left: 15%;
    top: 200px;
    @media (max-width: 700px) {
      left: 0%;
    }
  }
  & .MuiSvgIcon-root {
    position: absolute;
    background-color: var(--theme);
    padding: 1em;
    border-radius: 2em;
    border: 1px solid lightgray;
    :hover {
      transform: scale(1.1);
      cursor: pointer;
      transition: transform 0.2s ease-in;
    }
  }
  & .forward {
    right: 15%;
    top: 200px;
    @media (max-width: 700px) {
      right: 0%;
    }
  }
`;

const Slider = styled.div`
  /* width: 100%; */
  height: 100%;
  background-color: #ccc;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Image = styled.img`
  width: 100vw;
  height: 60vh;
  object-fit: contain;
`;

const FoodDetails = styled.div`
  width: 70%;
  height: 100%;
  padding: 2em 0em;
  background-color: #f4f3e8;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
const Details = styled.div`
  padding: 0 2em;
`;
const DishName = styled.h1`
  font-weight: 800;
  font-family: var(--quick-font);
  line-height: 12px;
  font-size: xx-large;
  letter-spacing: 1px;
`;
const SellerName = styled.h4`
  font-family: var(--sans-font);
  font-size: medium;
  line-height: 12px;
  cursor: pointer;
  :hover {
    color: blue;
  }
`;

const PriceOfFood = styled.h5`
  font-family: var(--quick-font);
  font-size: larger;
  letter-spacing: 1px;
`;

const OffersAvailable = styled.div`
  border: 1px solid lightgray;
  width: 70%;
  height: 100%;
  padding: 2em 0;
  background-color: #f4f3e8;
  display: flex;
  @media (max-width: 700px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Recommended = styled.div`
  width: 70%;
  height: 100%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f4f3e8;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const DetailContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DishDesc = styled.p`
  font-family: var(--sans-font);
`;
const Button = styled.button`
  padding: 1em;
  margin: 0 0.5em;
  border: 1px solid lightgray;
  border-radius: 0.6em;
  background-color: var(--theme);
  color: #ffff;
  :hover {
    cursor: pointer;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  margin: 2em;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  & .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
