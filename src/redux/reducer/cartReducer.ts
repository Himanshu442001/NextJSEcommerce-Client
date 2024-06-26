import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, DeliveryInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
   loading:false,
   cartItems: [],
   subtotal: 0,
   tax: 0,
   deliveryCharges: 0,
   discount: 0,
   total: 0,
   deliveryInfo: {
     address: "",
     city: "",
     state: "",
     country: "",
     pinCode: "",
   },

};


export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart : (state,action:PayloadAction<CartItem>)=>{
        state.loading= true;
        const index = state.cartItems.findIndex(
            (i) => i.productId === action.payload.productId
        );
    
          
        if (index !== -1) state.cartItems[index] = action.payload;
        else state.cartItems.push(action.payload);
        state.loading = false;
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
        state.loading = true;
        state.cartItems = state.cartItems.filter(
          (i) => i.productId !== action.payload
        );
        state.loading = false;
      },

      calculatePrice: (state) => {
        const subtotal = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
  
        state.subtotal = subtotal;
        state.deliveryCharges = state.subtotal > 1000 ? 0 : 200;
        state.tax = Math.round(state.subtotal * 0.18);
        state.total =
          state.subtotal + state.tax + state.deliveryCharges - state.discount;
      },

      discountApplied: (state, action: PayloadAction<number>) => {
        state.discount = action.payload;
      },
      saveDeliveryInfo: (state, action: PayloadAction<DeliveryInfo>) => {
        state.deliveryInfo = action.payload;
      },
      resetCart: () => initialState,
    },
    

      
  
      
   
  
});

export const { removeCartItem, addToCart,
   calculatePrice, discountApplied, 
   saveDeliveryInfo, resetCart } = cartReducer.actions;