//Types
import { Button } from "@mui/material";
import { CartItemType } from "../App";
import { Wrapper } from "./CartProduct.style";

//Styles

type Props = {
  product: CartItemType;
  addToCart: (selectedProduct: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartProduct: React.FC<Props> = ({ product, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{product.title}</h3>
      <div className="information">
        <p>Price: ${product.price}</p>
        <p>Total: ${(product.quantity * product.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button size="small" disableElevation variant="contained" onClick={() => removeFromCart(product.id)}>
          -
        </Button>
        <p>{product.quantity}</p>
        <Button size="small" disableElevation variant="contained" onClick={() => addToCart(product)}>
          +
        </Button>
        <p>{product.quantity}</p>
      </div>
    </div>
    <img src={product.image} alt={product.title} />
  </Wrapper>
);

export default CartProduct;
