import styled from "styled-components";
import HomeSlide from "../Components/HomeSlide";
import FoodCard from "../Components/FoodCard";
import Services from "../Components/Services";
import FeedBacks from "../Components/FeedBacks";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Home = ({ backendUrl }) => {
  const { ref: showcase, inView: showCaseInView } = useInView();
  const { ref: Feed, inView: FeedInView } = useInView();
  const [items, setItems] = useState([]);

  const getProductsAndData = async () => {
    const { data } = await axios.get(`${backendUrl}/food/get?category=home`);
    setItems(data);
  };

  useEffect(() => {
    getProductsAndData();
  },[]);
  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <Content>
        <HomeSlider>
          <HomeSlide />
        </HomeSlider>
        <HomePage>
          <HomeHeading>Top Food </HomeHeading>

          <TopCards
            className={showCaseInView ? "showCaserAnimation" : ""}
            ref={showcase}
          >
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
              <HomeHeading>No items to view</HomeHeading>
            )}
          </TopCards>
        </HomePage>
        <HomePageServices id="#services">
          <HomeHeading>Our Services</HomeHeading>
          <Services />
        </HomePageServices>
        <HomeFeedBacks>
          <HomeHeading>FeedBacks by users</HomeHeading>
          <FeedContent
            ref={Feed}
            className={FeedInView ? "showCaserAnimation" : ""}
          >
            <FeedBacks
              name={"Khalid"}
              date={"22/4/49"}
              feedback={
                " love this app and more often love the Ui/Ux design wish could have one, The food delivery was too quick than i expected the delivery staff was very puntual , Even got a cashback on my first order, best thing is that you can even get some cupon code for odering food, this helped a-lot for pepole like me working all day long ."
              }
              rating={5}
              avatarUrl={
                "data:image/jpeg;base64,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"
              }
            />
            <FeedBacks
              name={"Khalid"}
              date={"22/4/49"}
              feedback={
                " love this app and more often love the Ui/Ux design wish could have one, The food delivery was too quick than i expected the delivery staff was very puntual , Even got a cashback on my first order, best thing is that you can even get some cupon code for odering food, this helped a-lot for pepole like me working all day long ."
              }
              rating={5}
              avatarUrl={
                "data:image/jpeg;base64,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"
              }
            />
            <FeedBacks
              name={"Khalid"}
              date={"22/4/49"}
              feedback={
                " love this app and more often love the Ui/Ux design wish could have one, The food delivery was too quick than i expected the delivery staff was very puntual , Even got a cashback on my first order, best thing is that you can even get some cupon code for odering food, this helped a-lot for pepole like me working all day long ."
              }
              rating={5}
              avatarUrl={
                "data:image/jpeg;base64,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"
              }
            />
            <FeedBacks
              name={"Khalid"}
              date={"22/4/49"}
              feedback={
                " love this app and more often love the Ui/Ux design wish could have one, The food delivery was too quick than i expected the delivery staff was very puntual , Even got a cashback on my first order, best thing is that you can even get some cupon code for odering food, this helped a-lot for pepole like me working all day long ."
              }
              rating={5}
              avatarUrl={
                "data:image/jpeg;base64,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"
              }
            />
          </FeedContent>
        </HomeFeedBacks>
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled(motion.div)`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  .showCaserAnimation {
    animation: slide-in-left 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
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
const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
`;

const HomeSlider = styled.div`
  height: 90vh;
`;
const HomePage = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
`;
const HomeHeading = styled.h1`
  text-align: center;
  color: #fff;
  font-family: var(--kanti-font);
  font-weight: 900;
  margin: 2em;
`;

const TopCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
const HomePageServices = styled.div`
  height: auto;
  min-height: 100vh;
`;
const HomeFeedBacks = styled.div`
  height: auto;
  min-height: 100vh;
`;
const FeedContent = styled.div`
  padding: 2em;
  min-height: 60vh;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0;
  }
`;
