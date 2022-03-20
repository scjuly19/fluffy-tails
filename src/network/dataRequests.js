import axios from "axios";

const getProducts=async()=>axios.get("/api/products");
export {getProducts};