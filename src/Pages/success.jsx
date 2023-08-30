import React, { useEffect, useState } from 'react'
import CartCard from '../Components/CartCard'
import CartProgress from '../Components/CartProgress'
import { Link } from 'react-router-dom'
import { CartContainer } from '../Components/CartContainer'
import { Heading, SmallHeading } from './Login'
import FoodCard from '../Components/FoodCard'
import styled from 'styled-components'
import axios from 'axios'

const Success = ({backendUrl}) => {
     const [items, setItems] = useState([]);

     const getProductsAndData = async () => {
       const { data } = await axios.get(
         `${backendUrl}/food/get?category=offers`
       );
       setItems(data);
     };

     useEffect(() => {
       getProductsAndData();
     }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <CartProgress />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
            width: "100vw",
          backgroundColor: "white",
          flexDirection: "column",
          marginTop: "100px",

        }}
      >
        <CartContainer>
          <Heading>Payment Successful</Heading>
          <Link style={{ marginTop: "20px", textDecoration: "none" }} to="/">
            Go Back
          </Link>
          <Heading style={{marginTop:"100px"}}>Order more</Heading>
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
        </CartContainer>
      </div>
    </div>
  );
}

export default Success
const FoodCardContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
