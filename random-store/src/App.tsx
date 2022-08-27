import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import './App.css';

//Components
import Product from "./components/Product";

//Styles
import { StyledButton, Wrapper } from "./App.styles";

export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  quantity: number
}

const getProducts = async () => {
  const response: Response = await fetch('https://fakestoreapi.com/products');
  return response.json();
}

function App() {

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts, undefined);

  const getTotalProducts: Function = (products: CartItemType[]) => {
    products.reduce((acc: number, product) => acc + product.quantity, 0);
  };

  const handleAddToCart: Function = (selectedProduct: CartItemType) => null;

  const handleRemoveFromCart: Function = () => null;

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>something when wrong</div>


  return (
    <div className="App">
      <Wrapper>
        <Drawer anchor='right' open={cartIsOpen} onClose={() => setCartIsOpen(false)}>
          Cart goes here
        </Drawer>
        <StyledButton onClick={() => setCartIsOpen(true)}>
          <Badge badgeContent={getTotalProducts(productsInCart)}  color='error'>
            <AddShoppingCartIcon/>
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map(product => (
            <Grid item key={product.id} xs={12} sm={4}>
              <Product product={product} handleAddToCart={handleAddToCart(product)}/>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  )
}

export default App
