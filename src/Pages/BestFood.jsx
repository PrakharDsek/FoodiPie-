import styled from "styled-components";
import OtherPagesLayout from "../Components/OtherPagesLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Notify from "../Utils/NotificationSystem";

const BestFood = ({ backendUrl }) => {
  const [items, setItems] = useState([]);

  const getProductsAndData = async () => {
    try {
       const { data } = await axios.get(`${backendUrl}/food/get?category=best`);
       setItems(data);
    } catch (error) {
      Notify("error", error.response.data.message);
      console.log("An error occured: ", error.response.data.message);
    }
   
  };

  useEffect(() => {
    getProductsAndData();
  }, []);
  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <OtherPagesLayout title={"Best food in the town"} items={items} />
    </Container>
  );
};

export default BestFood;

const Container = styled(motion.div)`
  width: 100%;
  height: auto;
`;
