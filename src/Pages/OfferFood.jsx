import styled from "styled-components";
import OtherPagesLayout from "../Components/OtherPagesLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const OfferFood = ({ backendUrl }) => {
  const [items, setItems] = useState([]);

  const getProductsAndData = async () => {
    const { data } = await axios.get(`${backendUrl}/food/get?category=offers`);
    setItems(data);
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
      <OtherPagesLayout title={"Food in offers"} items={items} />
    </Container>
  );
};

export default OfferFood;
const Container = styled(motion.div)`
  width: 100%;
  height: auto;
`;
