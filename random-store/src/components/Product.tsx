// Types
import { Button } from "@mui/material";
import { CartItemType } from "../App";

//Styles
import { Wrapper } from "../components/Product.style"

type Props = {
  product: CartItemType;
  handleAddToCart: (selectedProduct: CartItemType) => void;
};

const Product: React.FC<Props> = ({ product, handleAddToCart }: Props) => {
  return (
    <Wrapper>
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <h3>{product.description}</h3>
        <h3>{product.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
    </Wrapper>
  );
};

export default Product;
