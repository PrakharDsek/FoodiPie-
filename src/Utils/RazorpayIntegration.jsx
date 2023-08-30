import axios from "axios";

const razorPayPopUpOptions = (
  total,
  orgName,
  description,
  logo,
  name,
  email,
  contact,
  address,
  color,
  orderId,
  backendUrl,
  Navigate
) => {

  const options = {
    key: "rzp_test_TSHgTgPYdyakHY", // Enter the Key ID generated from the Dashboard
    amount: total *100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: orgName,
    description: description,
    image: logo,
    order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async (response) => {

      const { data } = await axios.post(
        `${backendUrl}`,
        {
          razorPayId: response.razorpay_payment_id,
          razorPayOrderId: response.razorpay_order_id,
          razorPaySign: response.razorpay_signature,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success === true) {
        Navigate("/orders/success");
      } else {
        Navigate("/orders/failed");
      }
    },
    prefill: {
      name: name,
      email: email,
      contact: contact,
    },
    notes: {
      address: address,
    },
    theme: {
      color: color,
    },
  };

  return options;
};

export default razorPayPopUpOptions;
