import styled from "styled-components";
import { ProgressContainer } from "./Cart";
import { CartContainer } from "../Components/CartContainer";
import CartCard from "../Components/CartCard";
import { Heading } from "./Login";
import CartProgress from "../Components/CartProgress";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import { useSelector } from "react-redux";
import axios from "axios";
import Notify from "../Utils/NotificationSystem";
import { useState } from "react";
import razorPayPopUpOptions from "../Utils/RazorpayIntegration";

const Payments = ({ backendUrl, navigate }) => {
  const { form } = useParams();
  const [total, setTotal] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [data, setData] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [isCoupon, setIsCoupon] = useState({
    status: false,
    discount: "",
  });
  const { userData } = useSelector((state) => state.user);

  const fetchUserCart = async () => {
    try {
      const usdata = await axios.get(
        `${backendUrl}/user/findId?id=${userData._id}`,
        {
          withCredentials: true,
        }
      );

      const fetchSavedItemsData = async () => {
        const savedItemsData = await Promise.all(
          usdata.data.data.savedItems.map(async (item) => {
            const response = await axios.get(
              `${backendUrl}/food/get?category=byId&id=${item.itemId}`
            );
            return response.data.data;
          })
        );

        setData((prevData) => ({
          ...prevData,
          items: savedItemsData,
        }));
      };
      await fetchSavedItemsData(); // Wait for the saved items data to be fetched
    } catch (error) {
      Notify("error", error.message);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(
        `${backendUrl}/food/remFromCart?itemId=${itemId}&userId=64997e900ba4086b46e4121f`,
        {
          withCredentials: true,
        }
      );
      fetchUserCart();
      Notify("success", "Removed the item from cart");
    } catch (error) {
      console.log(error.message);
      Notify("error", "Can't perform the task for the moment please try later");
    }
  };
  const decryptForm = (encodedEncryptedForm) => {
    // Set your secret key for decryption (must be the same key used for encryption)
    const secretKey = "##ppdes#";

    // Decrypt the encrypted form object using AES
    const bytes = CryptoJS.AES.decrypt(encodedEncryptedForm, secretKey);
    const decryptedFormString = bytes.toString(CryptoJS.enc.Utf8);

    // Convert the decrypted JSON string back to an object
    const decryptedForm = JSON.parse(decryptedFormString);

    console.log(decryptedForm);
  };
  const handleIncrementAndDecrements = (action, setter, current) => {
    if (action === "inc") {
      return setter((prev) => prev + 1);
    } else {
      return setter((prev) => (prev == 0 ? 0 : prev - 1));
    }
  };

  useEffect(() => {
    decryptForm(form);
    fetchUserCart();
  }, []);

  const validateCoupon = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/coupons/apply`, {
        couponCode: coupon,
        totalSubAmount: total,
      });
      Notify("success", "The discount coupon has been applied");
      setIsCoupon({ status: true, discount: data.discount });
      setTotalFinal(data.data);
    } catch (error) {
      Notify("error", error.response.data.message);
      console.log("An error occured:", error.message);
    }
  };
  const makePayment = async (e) => {
    e.preventDefault();

    try {
     
      const order = await axios.post(`${backendUrl}/orders/create`, {
        total: totalFinal - isCoupon.discount + 50,
        name: userData.name,
        id: userData._id,
        items: data,
        sellerId: "",
      });

      const newRZPInstance = new window.Razorpay(
        razorPayPopUpOptions(
         totalFinal - isCoupon.discount + 50, 
          "FoodiPie",
          "Where food quality arrives",
          "",
          userData.name,
          userData.mail,
          userData.number,
          userData.address,
          "#ffff",
          order.data.data.orderPayments[0].id,
          `${backendUrl}/payments/verify`,
          navigate
        )
      );
      return newRZPInstance.open();
    } catch (error) {
      Notify("error", "An error occured while payment please try again");
      console.log("An error occured:", error.message);
      console.log(error)
    }
  };
  console.log(totalFinal - isCoupon.discount + 50)
  useEffect(() => {
    if (data.items) {
      let totalAmount = 0;
      data.items.forEach((item) => {
        totalAmount += item.price;
      });
      setTotalFinal(totalAmount);
      setTotal(totalAmount);
    }
  }, [data.items]);

  return (
    <Container>
      <Content>
        <CartContainer>
          <ProgressContainer>
            <CartProgress task="Cart" taskDone={true} /> {">"}
            <CartProgress task="Checkout" taskDone={true} /> {">"}
            <CartProgress task="Payments" taskDone={true} />
          </ProgressContainer>

          <Heading>Review your cart</Heading>
          <CartContainerViewer>
            {data.items ? (
              data.items.map((item) => (
                <CartCard
                  key={item._id}
                  id={item._id}
                  sHandler={handleRemoveFromCart}
                  handler={handleIncrementAndDecrements}
                  image={item.images[0].imageURL}
                  name={item.name}
                  sellerName={item.seller.name}
                />
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </CartContainerViewer>
          <CouponCard>
            <div className="card checkout">
              <label className="title">Checkout</label>
              <div className="details">
                <span>Your cart subtotal:</span>
                <span>₹ {total}</span>
                <span>Discount through applied coupons:</span>
                <span>{isCoupon.status ? isCoupon.discount : "0"}%</span>
                <span>Shipping fees:</span>
                <span>₹50</span>
              </div>
            </div>
            <div className="card coupons">
              <label className="title">Apply coupons</label>
              <form className="form">
                <input
                  type="text"
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Apply your coupons here"
                  className="input_field"
                />
                <button onClick={validateCoupon}>Apply</button>
                <div className="checkout--footer">
                  <label className="price">
                    ₹{totalFinal - isCoupon.discount + 50}
                  </label>
                  <button onClick={makePayment} className="checkout-btn">
                    Buy Now
                  </button>
                </div>
              </form>
            </div>
          </CouponCard>
        </CartContainer>
      </Content>
    </Container>
  );
};

export default Payments;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0em 0;
`;
const CartContainerViewer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0em;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const CouponCard = styled.div`
  .master-container {
    display: grid;
    grid-template-columns: auto;
    gap: 5px;
  }

  .card {
    width: 100%;
    background: #ffffff;
    padding: 1em 0;
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efeff3;
    font-weight: 700;
    font-size: large;
    font-family: var(--sans-font);
    color: #63656b;
  }

  /* cart */
  .cart {
    border-radius: 19px 19px 7px 7px;
  }

  .cart .quantity {
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    -webkit-filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  }

  .cart .quantity label {
    width: 20px;
    height: 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-bottom: 2px;
    font-size: 15px;
    font-weight: 700;
    color: #47484b;
  }

  .cart .quantity button {
    width: 30px;
    height: 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border: 0;
    outline: none;
    background-color: transparent;
    padding-bottom: 2px;
  }

  .card .small {
    font-size: 15px;
    margin: 0 0 auto auto;
  }

  .card .small sup {
    font-size: px;
  }

  /* coupons */
  .coupons {
    border-radius: 7px;
  }

  .coupons form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 10px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e5e5e5;
    -webkit-filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    -webkit-transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    -webkit-box-shadow: 0px 0px 0px 2px #242424;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
  }

  .coupons form button {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: var(--theme);
    cursor: pointer;

    box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #ffffff;
  }

  /* Checkout */
  .checkout {
    border-radius: 9px 9px 19px 19px;
  }

  .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 10px;
    gap: 5px;
  }

  .checkout .details span:nth-child(odd) {
    font-size: small;
    font-weight: 700;
    color: #707175;
    font-family: var(--kanti-font);
    margin: auto auto auto 0;
  }

  .price {
    position: relative;
    font-size: 22px;
    color: #2b2b2f;
    font-weight: 900;
    font-family: var(--kanti-font);
  }

  .price sup {
    font-size: 13px;
  }

  .price sub {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5f5d6b;
    bottom: 5px;
    display: inline-block;
  }
`;
