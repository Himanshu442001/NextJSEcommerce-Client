import {CartItem, DeliveryInfo, User} from "./types"

export interface UserReducerInitialState {
    user: User | null;
    loading: boolean;
}

export interface CartReducerInitialState {
 
  loading:boolean;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  deliveryCharges: number;
  discount: number;
  total: number;
  deliveryInfo: DeliveryInfo;
   
}