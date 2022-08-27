import { Grid, LinearProgress } from "@mui/material";
import { useQuery } from "react-query";
// import { Wrapper } from "./App.styles";
import './App.css';
//Components
import Product from "./components/Product";

//Styles
import { Wrapper } from "./App.styles";

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

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts, undefined);

  console.log(data);

  const getTotalItems: Function = () => null;

  const handleAddToCart: Function = (selectedProduct: CartItemType) => null;

  const handleRemoveFromCart: Function = () => null;

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>something when wrong</div>


  return (
    <div className="App">
      <Wrapper>
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
