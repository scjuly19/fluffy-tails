import axios from "axios";
import { ENDPOINTS } from "./urls";
const { ALL_PRODUCTS } = ENDPOINTS;
const getProducts = async () => axios.get(ALL_PRODUCTS);
export { getProducts };
