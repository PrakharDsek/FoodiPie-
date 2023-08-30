import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import FoodInDetail from "./Components/FoodInDetail";
import Login from "./Pages/Login";
import CreatenewAccount from "./Pages/CreatenewAccount";
import BestFood from "./Pages/BestFood";
import TopRated from "./Pages/TopRated";
import OfferFood from "./Pages/OfferFood";
import SearchFood from "./Pages/SearchFood";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Payments from "./Pages/Payments";
import Account from "./Pages/Account";
import Orders from "./Pages/Orders";
import SellFoodForm from "./Pages/Seller/EntryPoint";
import Allitems from "./Pages/Seller/Allitems";
import UpdateItem from "./Pages/Seller/UpdateItem";
import AddItems from "./Pages/Seller/Additems";
import ItemForm from "./Components/ItemsForm";
import DeleteItem from "./Pages/Seller/DeleteItem";
import OrdersPlaced from "./Pages/Seller/OrdersPlaced";
import Revenue from "./Pages/Seller/Revenue";
import SearrchResults from "./Pages/SearchResults";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUserData } from "./Redux/User";
import Success from "./Pages/success";

function App() {
  const backendUrl = "https://foodiepieback.onrender.com/api/v1";
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const cookie = Cookies.get("token");

  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Check if cookie exists, if so, log in the user and set user data in Redux
      if (cookie) {
        try {
          const { data } = await axios.get(
            `${backendUrl}/user/find?mail=${cookie}`,
            {
              withCredentials: true,
            }
          );
          dispatch(setUserData(data.data));
          setAuth(true); // Set isAuth to true when the user is authenticated
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setAuth(false);
      }
    };
    fetchData();
  }, [cookie, backendUrl, dispatch]);

  return (
    <div>
      <Header isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home backendUrl={backendUrl} />} />
        <Route
          path="/food/:Id"
          element={
            <FoodInDetail navigate={navigateTo} backendUrl={backendUrl} />
          }
        />
        <Route
          path="/account/login"
          element={<Login navigateTo={navigateTo} backendUrl={backendUrl} />}
        />
        <Route
          path="/account/new"
          element={
            <CreatenewAccount navigateTo={navigateTo} backendUrl={backendUrl} />
          }
        />
        <Route
          path="/food/best"
          element={<BestFood backendUrl={backendUrl} />}
        />
        <Route
          path="/food/topRated"
          element={<TopRated backendUrl={backendUrl} />}
        />
        <Route
          path="/food/offers"
          element={<OfferFood backendUrl={backendUrl} />}
        />
        <Route
          path="/food/search"
          element={
            <SearchFood navigateTo={navigateTo} backendUrl={backendUrl} />
          }
        />
        <Route
          path="food/search/result/:query"
          element={
            <SearrchResults navigateTo={navigateTo} backendUrl={backendUrl} />
          }
        />
        <Route path="/cart" element={<Cart backendUrl={backendUrl} />} />
        {isAuth ? (
          <>
            <Route
              path="/orders/success"
              element={<Success backendUrl={backendUrl} />}
            />
            <Route
              path="/cart/checkout"
              element={<Checkout backendUrl={backendUrl} />}
            />
            <Route
              path="/cart/checkout/payments/:form"
              element={
                <Payments navigate={navigateTo} backendUrl={backendUrl} />
              }
            />
            <Route
              path="/me/account"
              element={<Account backendUrl={backendUrl} />}
            />
            <Route
              path="/me/orders"
              element={<Orders backendUrl={backendUrl} />}
            />
            <Route
              path="/seller/"
              element={<SellFoodForm backendUrl={backendUrl} />}
            />
            <Route
              path="/seller/add"
              element={
                <AddItems backendUrl={backendUrl} navigateTo={navigateTo} />
              }
            />
            <Route
              path="/seller/all"
              element={<Allitems backendUrl={backendUrl} />}
            />
            <Route
              path="/seller/update"
              element={<UpdateItem backendUrl={backendUrl} />}
            />
            <Route
              path="/seller/update/:id"
              element={<ItemForm backendUrl={backendUrl} type="update" />}
            />
            <Route
              path="/seller/delete"
              element={<DeleteItem backendUrl={backendUrl} />}
            />
            <Route
              path="/seller/orders"
              element={<OrdersPlaced backendUrl={backendUrl} />}
            />
            <Route
              path="/seller/revenue"
              element={<Revenue backendUrl={backendUrl} />}
            />
          </>
        ) : (
          navigateTo("/account/login")
        )}

        <Route path="/cart" element={<Cart backendUrl={backendUrl} />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
