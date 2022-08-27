import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import './App.css';


export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  titel: string,
  quantity: number
}

const getProducts = async () => {
  const response: Response = await fetch('https://fakestoreapi.com/products');
  return response.json();
}

function App() {

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts, undefined);
  console.log(data);
  return (
    <div className="App">
      <Button variant="contained">Hellow World</Button>
    </div>
  )
}

export default App
