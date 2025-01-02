import { useFormik, validateYupSchema } from "formik"
import { useContext, useState } from "react"
import { object, string } from "yup"
import { CartContext } from "../../context/Cart.context"
import { UserContext } from "../../context/User.context"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/Loading"

export default function Checkout() {

const {token}= useContext(UserContext)
const {cartInfo}= useContext(CartContext)
const navigate = useNavigate()
const[paymentMethod,setPaymentMethod]=useState(null)
const phoneRegex=/^(02)?01[0125][0-9]{8}$/



    async function createCashOrder(values){
         let toastId =toast.loading("We are creating your order .....")
       try {
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
            method:"POST",
            headers:{
                token
            },
            data:values
        }
        let {data}=  await axios.request(options)
        console.log(data)
        if(data.status == "success") {toast.success("Done ^_^")
            setTimeout(()=>{
                navigate("/allorders")
            },2000)
        }
        
       } catch (error) {
        console.log(error)
       }
       finally {toast.dismiss(toastId)}
    }

    async function createOnlinePayment(values){
        let toastId=toast.loading("We are creating your order .....")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method:"POST",
                headers:{
                    token
                },
                data:values
            }
            let {data}= await axios.request(options)
            console.log(data)
        if(data.status == "success") {toast.success("Redirecting you to Stripe ....")
            setTimeout(()=>{
               location.href=data.session.url
            },2000)
        }
        } catch (error) {
            console.log(error)
        }
        finally {
            toast.dismiss(toastId)
        }

    }

   
  const validation = object().shape({
    shippingAddress: object().shape({
        details: string(),
        phone:string().required("Phone is required.. !").matches(phoneRegex,"Accep Egyptian Numbers Only ! "),
        city:string().required("City is required .. !")
    })
  })
    
    const formik= useFormik({
        initialValues: {
            "shippingAddress":{
                "details": "",
                "phone": "",
                "city": ""
                }
        },
        validationSchema:validation,
        onSubmit:(values)=>{
            if(paymentMethod=="cash") createCashOrder(values);
            else createOnlinePayment(values)
        }
    })  
    

  return <>
  <section>
    <h1 className="text-xl text-gray-600 font-semibold mb-6">Shipping Adress</h1>
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="city">
            <input type="text" className="form-control w-full"  placeholder="city" value={formik.values.shippingAddress.city} onChange={formik.handleChange} onBlur={formik.handleBlur} name="shippingAddress.city"/>
            <p className="text-red-500  text-sm mt-1">{formik.errors.shippingAddress?.city}</p>
        </div>
        <div className="phone">
            <input type="tel" className="form-control w-full"  placeholder="Phone" value={formik.values.shippingAddress.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="shippingAddress.phone"/>
            <p className="text-red-500  text-sm mt-1">{formik.errors.shippingAddress?.phone}</p>
        </div>
        <div className="details">
            <textarea className="form-control w-full"  placeholder="Details" name="shippingAddress.details" onChange={formik.handleChange} value={formik.values.shippingAddress.details} id=""></textarea>
        </div>
        <button onClick={()=>{setPaymentMethod("cash")}} type="submit" className=" mr-2 btn bg-blue-500 hover:bg-blue-700 text-white font-semibold">Cash Order</button>
        <button onClick={()=>{setPaymentMethod("online")}} type="submit" className="btn bg-lime-500 hover:bg-lime-700 text-white font-semibold">Online Payment</button>
    </form>
  </section>
  
  
  
  
  </>
}
