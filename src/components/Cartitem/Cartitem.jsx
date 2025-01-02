import { useContext } from "react"
import { CartContext } from "../../context/Cart.context"
import { Link } from "react-router-dom"

 export default function Cartitem({productInfo}) {
    let{removeProductFromCart , updateProductCount ,}=useContext(CartContext)
    const {count,price,product} = productInfo
    const {title , imageCover , category, id}= product
  return <>
    <div className="flex gap-2">
    <div className="card-item flex-grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center">
        <img className="w-24 h-24 rounded-full border-4 border-white object-cover" src={imageCover} alt={title} />
        <Link to={`/product/${id}`} className="text-lg text-gray-700 font-semibold hover:text-primary-200">{title.split(" ").slice(0,3).join("")}</Link>
        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
        <div className="count flex items-center gap-5">
            <span className="text-xl text-gray-500 font-semibold">{count}</span>
            <div className="icons space-y-3">
                <div onClick={()=>{
                    updateProductCount({productId:id , count:count+1})
                }}
                 className="plus w-6 h-6 rounded-full cursor-pointer bg-gray-700 text-white flex justify-center items-center hover:bg-gray-500 transition-colors duration-300">
                    <i className="fa-solid fa-plus"></i>
                </div>
                <div onClick={()=>{
                    updateProductCount({productId:id , count:count-1})
                }}
                className="minus w-6 h-6 rounded-full cursor-pointer bg-gray-700 text-white flex justify-center items-center hover:bg-gray-500 transition-colors duration-300">
                    <i className="fa-solid fa-minus"></i>
                </div>
            </div>
        </div>
        <span className="font-bold text-gray-700">{price} L.E</span>
    </div>
    <button 
    onClick={()=>{
        removeProductFromCart({productId:id})
    }} 
    className="rounded-md bg-gray-100 w-8 hover:bg-gray-200 transition-colors duration-300">
        <i className="fa-solid fa-xmark"></i>
    </button>
    </div>
    
    </>
}

