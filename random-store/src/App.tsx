import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import "./App.css";

//Components
import Product from "./components/Product";
import ShoppingCart from "./components/ShoppingCart";

//Styles
import { StyledButton, Wrapper } from "./App.styles";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
};

const getProducts = async (): Promise<CartItemType[]> => await (await fetch("https://fakestoreapi.com/products")).json();

// const getProducts = async () => {
//   const response: Response = await fetch("https://fakestoreapi.com/products");
//   return await response.json();
// };

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>("products", getProducts);

  const getTotalProducts = (products: CartItemType[]) => products.reduce((acc: number, product) => acc + product.quantity, 0);

  const handleAddToCart = (selectedProduct: CartItemType) => {
    setProductsInCart((prev) => {
      const isProductInCart = prev.find((product) => product.id === selectedProduct.id);

      if (isProductInCart) {
        return prev.map((product) => (product.id === selectedProduct.id ? { ...product, quantity: product.quantity + 1 } : product));
      }

      return [...prev, { ...selectedProduct, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setProductsInCart((prev) =>

      prev.reduce((acc, product) => {

        if (product.id === id) {
          
          if (product.quantity === 1) {
            return acc;
          }

          return [...acc, { ...product, quantity: product.quantity - 1 }];
        } 
        else {
          return [...acc, product];
        }

      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something when wrong</div>;

  return (
    <div className="App">
      <Wrapper>
        <Drawer anchor="right" open={cartIsOpen} onClose={() => setCartIsOpen(false)}>
          <ShoppingCart cartProducts={productsInCart} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
        </Drawer>
        <StyledButton onClick={() => setCartIsOpen(true)}>
          <Badge badgeContent={getTotalProducts(productsInCart)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map((product) => (
            <Grid item key={product.id} xs={12} sm={4}>
              <Product product={product} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
}

export default App;
