import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

 export const CartContext = createContext(null)

 export default function CartProvider({children}){

    const[cartInfo,setCartInfo]=useState(null)

    const{token} = useContext(UserContext)

     async function addProductToCart({productId}){
        let toastId = toast.loading("Adding this Product ....")
        try{const options = {
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"POST",
            headers: {
                token
            },
            data: {
                productId

            }
        }
        let{data}= await axios.request(options)
        if(data.status =="success"){
            toast.success(data.message)
            getCartProducts()
        }
        console.log(data)
    }
        
        catch(error){
            console.log(error)
        }
        finally{
           toast.dismiss(toastId)
        }
    }

    async function getCartProducts(){

        try {const options = {
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"GET",
            headers:{
                token
            }
        }

        let {data}=await axios.request(options)
        setCartInfo(data)
    }
        catch(error){
            console.log(error)
        }
    }

    async function removeProductFromCart({productId}){
        let id=toast.loading("Deleting Product ...")
       try{ const options = {
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method:"DELETE",
            headers:{
                token
            }
        }
     let {data} = await axios.request(options)
     toast.success("Product Deleted ")
     setCartInfo(data)
    }
    
    catch(erorr){
        console.log(erorr)
    }
    finally{
        toast.dismiss(id)
    }
}
    async function clearCart(){
        let id=toast.loading("Clearing Cart ....")
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"DELETE",
            headers:{
                token
            }
        }
        let {data}=await axios.request(options)
        toast.success("Done ^_^")
        toast.dismiss(id)
        setCartInfo({numOfCartItems:0})
    }

    async function updateProductCount({productId , count}){
        try {
            const options ={
                url :`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"PUT",
                headers:{
                    token
                },
                data:{
                    count
                }
            }
            let {data}=await axios.request(options)
            if(data.status=="success"){
            setCartInfo(data)}
        } catch (error) {
            console.log(error)
        }
    }
        
    return <CartContext.Provider value={{addProductToCart,getCartProducts,cartInfo,removeProductFromCart,clearCart,updateProductCount}}>

        {children}

    </CartContext.Provider>
 }