import { Link } from "react-router-dom"
import Productcard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast";
import  { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {


  const {data, isLoading, isError} = useLatestProductsQuery("");
  const dispatch = useDispatch();

  const addToCartHandler =(cartItem:CartItem)=>{
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");

  }

  if (isError) toast.error("Cannot Fetch the Products");



  return (
    <div className="home">
    <section></section>

    <h1>Latest Product <Link to="/search" className="findMore">More</Link></h1>


    <main>
      <Skeleton/>
        {isLoading ? (
        <Skeleton width="80vw"/>
        ) : (
          data?.products.map((i) => (
            <Productcard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>

    </div>
  )
}

export default Home
