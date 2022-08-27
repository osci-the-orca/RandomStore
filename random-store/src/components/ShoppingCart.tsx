import CartProduct from "./CartProduct";

//Styles
import { Wrapper } from "./ShoppingCart.style";

//Types
import { CartItemType } from "../App";

type Props = {
  cartProducts: CartItemType[];
  addToCart: (selectedProduct: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCart: React.FC<Props> = ( { cartProducts, addToCart, removeFromCart } ) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartProducts.length === 0 ? <p>your cart is empty!</p> : null}
      {cartProducts.map((product) => (
        <CartProduct 
        key={product.id}
        product={product}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        />
      ))}
    </Wrapper>
  );
};

export default ShoppingCart;
