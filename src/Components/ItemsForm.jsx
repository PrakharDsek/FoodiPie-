import styled, { css } from "styled-components";
import { CartContainer } from "./CartContainer";
import { Heading } from "../Pages/Login";
import { Detail, Name } from "./OtherOptions";
import Input from "./Input";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import Inputfile from "./Inputfile";
import { StyledBtns } from "../Pages/Cart";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import axios from "axios";
import Notify from "../Utils/NotificationSystem";
import { useParams } from "react-router-dom";

// Move InputStyle constant outside of the component
const InputStyle = {
  input: {
    width: "40vw",
    // Add media query using css function
    "@media (max-width: 768px)": css`
      width: 90vw;

      /* Modify other styles for smaller screens */
    `,
  },
};
const axiosInstance = axios.create({
  timeout: 240000,
});

const ItemForm = ({ type, backendUrl, navigateTo }) => {
  const { userData } = useSelector((state) => state.user);
  const [InputData, setInputData] = useState({
    offerTag: "",
    discount: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [OfferArray, setOfferArray] = useState([]);
  const { id } = useParams();

  const pushInArray = () => {
    setOfferArray((prevArray) => [...prevArray, InputData]);
    setForm((prev) => ({
      ...prev,
      offers: [
        ...prev.offers,
        {
          offerTag: InputData.offerTag,
          discount: parseInt(InputData.discount),
        },
      ],
    }));
  };
  const getImagesFromChild = (imgArr) => {
    setSelectedImages(imgArr);
    setForm((prev) => ({ ...prev, files: imgArr }));
  };
  const [form, setForm] = useState({
    name: "",
    sellerId: userData._id,
    sellerName: userData.name,
    smallDesc: "",
    description: "",
    offers: [],
    price: "",
    stock: "",
    files: [],
    type: "",
  });
  const uploadItem = async () => {
    try {
      setSpinner(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("sellerId", form.sellerId);
      formData.append("sellerName", form.sellerName);
      formData.append("smallDesc", form.smallDesc);
      formData.append("offers", form.offers);
      formData.append("description", form.description);
      formData.append("price", parseFloat(form.price));
      formData.append("stock", parseInt(form.stock)); // Convert to number before appending
      formData.append("type", form.type);

      // Append each file to the FormData with the "files" field name
      form.files.forEach((file) => {
        formData.append("files", file);
      });
      // Ensure that form.offers is an array before trying to iterate over it
      const offersArray = Array.isArray(form.offers) ? form.offers : [];

      // Append each offer to the FormData
      // Append each offer to the FormData
      offersArray.forEach((offer, index) => {
        formData.append(`offers[${index}][offerTag]`, offer.offerTag);
        formData.append(`offers[${index}][discount]`, offer.discount);
      });

      // Make the API request with the FormData
      const response = await axiosInstance.post(
        `${backendUrl}/food/add`,
        formData
      );

      // Handle the response as needed
      setSpinner(false);
      navigateTo("/seller");
      Notify("success", "Product was successfully uploaded");
    } catch (error) {
      setSpinner(false);
      Notify(
        "error",
        "Something went wrong while uploading the product!! please try again."
      );
      console.log("An error occurred", error.message);
    }
  };
  console.log(form);
  const updateItem = async () => {
    try {
      setSpinner(true);

      const { data } = await axios.get(
        `${backendUrl}/food/get?category=byId&id=${id}`
      );

      const newForm = {
        ...form,
        name: form.name || data.data.name,
        smallDesc: form.smallDesc || data.data.smallDesc,
        price: form.price || data.data.price,
        stock: form.stock || data.data.stock,
        type: form.type || data.data.type,
        files: form.files || data.data.images[0].imageUrl,
        description: form.description || data.data.description,
        discount: form.discount || data.data.discount,
        offer: form.offers || data.data.offers,
      };
      console.log(newForm);

      const response = await axiosInstance.put(`${backendUrl}/food/update`, {
        id: data.data._id,
        newData: newForm,
      });

      setSpinner(false);
      navigateTo("/seller");
      Notify("success", "Product was successfully updated");
    } catch (error) {
      setSpinner(false);
      Notify(
        "error",
        "Something went wrong while updating the product. Please try again."
      );
      console.error("An error occurred", error.message);
    }
  };

  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      {spinner ? (
        <Spinner
          style={{
            position: "absoulte",
            top: "50%",
            bottom: "50%",
            right: "50%",
            left: "50%",
          }}
        />
      ) : (
        ""
      )}
      <CartContainer>
        <Heading>
          {type == "add" ? "Add Items" : "Update item"}(food, dish)
        </Heading>
        {type == "add" ? "" : <Detail>The empty values wont be updated</Detail>}
        <Form>
          <InputContainer>
            <Input
              style={InputStyle.input}
              onChangeVal={"name"}
              onChangeHandler={setForm}
              placeholder={"Name of item (food, dish)"}
            />

            <Input
              style={InputStyle.input}
              onChangeVal={"smallDesc"}
              onChangeHandler={setForm}
              placeholder={
                "Short detail about item (must only contain 4 words)"
              }
            />
            <Input
              style={InputStyle.input}
              onChangeVal={"price"}
              type={"number"}
              onChangeHandler={setForm}
              placeholder={"Price of the item"}
            />
            <Input
              style={InputStyle.input}
              onChangeVal={"stock"}
              type={"number"}
              onChangeHandler={setForm}
              placeholder={"Stock of the item"}
            />
            <Name>What type of food item is it ?</Name>
            <div className="radioContainer">
              <div className="radioContent">
                <input
                  type="radio"
                  onChange={() => setForm((prev) => ({ ...prev, type: "veg" }))}
                  name="foodType"
                  className="radios"
                />
                <p>Veg</p>
              </div>
              <div className="radioContent">
                <input
                  type="radio"
                  onChange={() =>
                    setForm((prev) => ({ ...prev, type: "non-veg" }))
                  }
                  name="foodType"
                  className="radios"
                />
                <p>Non-Veg</p>
              </div>
            </div>

            <Name>Detail about food </Name>
            <StyledTextArea
              cols={75}
              rows={9}
              minLength={200}
              maxLength={360}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Detail of the food"
            ></StyledTextArea>
            <Name>Add images</Name>
            <Inputfile handlers={getImagesFromChild} />
            <Detail>Selected images will appear here</Detail>
            <SelectedImages>
              {selectedImages.length
                ? selectedImages.map((source, index) => (
                    <Images key={index} src={URL.createObjectURL(source)} />
                  ))
                : "No images selected"}
            </SelectedImages>
            <Name>Offers for the item</Name>
            <OfferAndKeyWordContainer style={{ textAlign: "center" }}>
              {OfferArray.length ? (
                OfferArray.map((offer) => (
                  <>
                    <Tags key={offer.offerTag}>
                      <Tag>{offer.offerTag}</Tag>{" "}
                      <Detail
                        style={{ lineHeight: "1px", margin: "1.9em 0 0 0 " }}
                      >
                        {offer.discount}
                      </Detail>
                    </Tags>
                  </>
                ))
              ) : (
                <Detail>Add Offers to see </Detail>
              )}
            </OfferAndKeyWordContainer>
            <KeyWordsAndOfferAdder>
              <Input
                placeholder="name"
                onChangeHandler={setInputData}
                onChangeVal="offerTag"
              />
              <Input
                placeholder="discount in percent (the discount will be direct discount and will reduced in the cart of client)"
                onChangeHandler={setInputData}
                onChangeVal="discount"
              />
              <Add onClick={() => pushInArray()} />
            </KeyWordsAndOfferAdder>
          </InputContainer>
          <StyledBtns
            style={{ width: "90%", margin: "2em" }}
            onClick={type == "add" ? uploadItem : updateItem}
          >
            {type == "add" ? "Upload" : "Update "} item
          </StyledBtns>
        </Form>
      </CartContainer>
    </Container>
  );
};

export default ItemForm;
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .radioContainer {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    margin: 1em;
    width: 90%;
    height: 100%;
  }

  .radioContent {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 50%;
    margin: 1em;
  }

  .radios {
    appearance: none;
    border: 2px solid #4d4c4c;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
    position: relative;
    cursor: pointer;
  }

  .radios:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.6em;
    height: 0.6em;
    background-color: #4d4c4c;
    border-radius: 50%;
  }

  p {
    margin: 0;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  & input {
    ${InputStyle.input}/* Apply styles here */
  }
`;

const StyledTextArea = styled.textarea`
  border: 1px solid lightgrey;
  border-radius: 0.2em;
  padding: 1em;
  margin: 1em;
  resize: none;
  outline: none;
  @media (max-width: 700px) {
    width: 50%;
  }
`;
const OfferAndKeyWordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 2em;
  min-height: 20vh;
  min-width: 20vh;
`;
const Tag = styled.h4`
  line-height: 1px;
  margin: 0.1em;
  font-family: var(--kanti-font);
  letter-spacing: 1px;
  text-align: center;
`;
const Tags = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 0.2em;
  padding: 1em;
  min-width: 10vw;
`;
const KeyWordsAndOfferAdder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  & .MuiSvgIcon-root {
    cursor: pointer;
    :hover {
      transform: scale(1.6);
      transition: transform 0.2s ease-in;
    }
  }
`;

const SelectedImages = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 30vh;
  border: 1px solid lightgray;
  border-radius: 0.3em;
  padding: 0.2em;
`;
const Images = styled.img`
  width: 20%;
  height: 20%;
  border: 1px solid lightgray;
  border-radius: 0.3em;
  pointer-events: none;
`;
