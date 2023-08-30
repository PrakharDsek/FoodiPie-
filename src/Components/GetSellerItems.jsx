import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

export const GetSellerItems = ({ backendUrl, sellerId ,update }) => {
  const [sellerData, setSellerData] = useState([]);

  useEffect(() => {
   const fetchAllData = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/seller/getAllItems?sellerId=${sellerId}`
        );

        setSellerData(data.data);
      } catch (error) {
        console.log(
          "An error occured while getting the seller's items:",
          error.message
        );
      }
    };
    fetchAllData();
  }, []);
  
  return (
    <>
      {sellerData && sellerData.length > 0 ? (
        sellerData.map((food) => (
          <FoodCard
            update={update} 
            key={food._id}
            productImage={food.images[0].imageURL}
            productPrice={food.price}
            productTitle={food.name}
            productDesc={food.smallDesc}
            address={food._id}
          />
        ))
      ) : (
        <h1>No items yet uploaded</h1>
      )}
    </>
  );
};
