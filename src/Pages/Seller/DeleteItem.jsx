import styled from "styled-components";
import { CartContainer } from "../../Components/CartContainer";
import { Heading, SmallHeading } from "../Login";
import FoodCard from "../../Components/FoodCard";
import Recommendations from "../../Components/Recommendations";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DeleteItem = ({ backendUrl }) => {
  const { userData } = useSelector((state) => state.user);
  const [sellerData, setSellerData] = useState([]);

  const fetchAllData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/seller/getAllItems?sellerId=${userData._id}`
      );
      setSellerData(data.data);
    } catch (error) {
      console.log(
        "An error occured while getting the seller's items:",
        error.message
      );
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <Container
        initial={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -100 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
      >
        <CartContainer>
          <Heading>Delete items (food,dish)</Heading>
          <SmallHeading>Select a food item to delete</SmallHeading>
          <FoodContainer>
            {sellerData ||sellerData.length >0 ? (
              sellerData.map((item) => {
                return (
                  <>
                    <Recommendations
                      name={item.name}
                      type={item.type}
                      price={item.price}
                      img={item.images[0].imageURL}
                      key={item._id}
                      id={item._id}
                      action="delete"
                      backendUrl={backendUrl}
                      callBack={fetchAllData}
                    />
                    ;
                  </>
                );
              })
            ) : (
              <h2>No items</h2>
            )}
          </FoodContainer>
        </CartContainer>
      </Container>
      ;
    </>
  );
};

export default DeleteItem;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FoodContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
