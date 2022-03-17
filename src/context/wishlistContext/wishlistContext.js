import React,{useContext,useReducer,createContext} from "react";
import { actionTypes } from "./actionTypes";
import WishlistReducer from "./wishlistReducer";

const WishlistContext=createContext();
const intitalState = {
    wishlistData: [],
  };
const useWishlistContext=()=>useContext(WishlistContext);

const useWishlist=()=>{
    const[state,dispatch]=useReducer(WishlistReducer,intitalState);
    const addToWishlist=payload=>dispatch({type:actionTypes.addItem,payload});
    const removeFromWishlist=payload=>dispatch({type:actionTypes.removeItem,payload});
    const updateWishlist=payload=>dispatch({type:actionTypes.updateData,payload});
    return [state,addToWishlist,removeFromWishlist,updateWishlist]
}

const WishlistProvider=({children})=>{
    const [state,addToWishlist,removeFromWishlist,updateWishlist]=useWishlist();
    const value={state,addToWishlist,removeFromWishlist,updateWishlist};
    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}
export {useWishlistContext,WishlistProvider}