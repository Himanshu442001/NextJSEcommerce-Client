import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";
import { saveDeliveryInfo } from "../redux/reducer/cartReducer";

const Delivery = () => {
    const { cartItems, total} =
    useSelector((state: RootState) => state.cartReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [deliveryInfo, setDeliveryInfo]= useState({
        address :"",
        city:"",
        state :"",
        country :"",
        pinCode:"",

    });
    
    const changeHandler =(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{

     setDeliveryInfo(prev=>({...prev, [e.target.name]:e.target.value} ));
    
    };


const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  dispatch(saveDeliveryInfo(deliveryInfo));

  try {
    const { data } = await axios.post(
      `${server}/api/v1/payment/create`,
      {
        amount: total,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/pay", {
      state: data.clientSecret,
    });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);








    return (
    <div className="delivery">
        <button className="backbtn" onClick={()=>navigate("/cart")}><BiArrowBack/></button>


        <form onSubmit={submitHandler} >
            <h1>Delivery Details</h1>
                <input  required type="text" placeholder="Address"
                name="address" value={deliveryInfo.address} 
                onChange={changeHandler}/>


               <input  required type="text" placeholder="City"
                name="city" value={deliveryInfo.city} 
                onChange={changeHandler}/>


               <input  required type="text" placeholder="State"
                name="state" value={deliveryInfo.state} 
                onChange={changeHandler}/>

              <select name="country" required value={deliveryInfo.country} onChange={changeHandler}>
                <option value="">Choose Country</option>
                <option value="india">India</option>


              </select>

             <input  required type="mumber" placeholder="PinCode"
                name="pinCode" value={deliveryInfo.pinCode} 
                onChange={changeHandler}/>


                <button type="submit">
                    Pay Now

                </button>





        </form>
      
    </div>
  )
}

export default Delivery
