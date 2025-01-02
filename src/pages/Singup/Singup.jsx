import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"

export default function Singup() {
const [accountExist,setAccountExist] = useState(null)
const navigate = useNavigate()

  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex=/^(02)?01[0125][0-9]{8}$/


   async function sendDataToRegister (values) {
   const loadingToastId = toast.loading("Waiting ....")
    try{
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
      method:"POST",
      data:values
    }
    let { data } =  await axios.request(options)
    if(data.message == "success"){
      toast.success("User Created Successfully")
      setTimeout(()=>{
        navigate("/auth/login")
      },2000)
    }
    setAccountExist(null)
    console.log(data)
    
  }
    catch(error){
      setAccountExist(error.response.data.message)
      toast.error(error.response.data.message)
      
      console.log(error.response.data.message)
    }
    finally{
      
      toast.dismiss(loadingToastId)
    }
    
  
  }

  const validation = object ({
    name: string().required("Name is Required")
    .min(3 , "Name must be at least 3 characters")
    .max(25 , "Name can not be more than 25 characters"),

    email: string().required("Email account is Required").email("Please Enter Valid Email"),
    password: string().required("Password is Required").matches(passwordRegex ,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword:string().required("Repassword is Required").oneOf([ref("password")]," Password & Repassword Dosent Match"),
    phone:string().required("Phone is Required").matches(phoneRegex,"Sorry We accept Egyptian phones only !!")

  })

  const formik = useFormik({
    initialValues:{
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
  },
    validationSchema:validation,
    onSubmit: sendDataToRegister

  });

  // hima
  return <> 
  <h1 className="text-xl text-slate-700 font-semibold mb-5"><i className='fa-regular fa-circle-user mr-2'></i> Register Now</h1>
  <form className="space-y-3" onSubmit={formik.handleSubmit}>
    <div className="name">
      <input className="form-control w-full" type="text" placeholder="Type your name"
      value={formik.values.name} 
      onChange={formik.handleChange}
      name="name"
      onBlur={formik.handleBlur}
     
      />

      {formik.errors.name && formik.touched.name && <p className="text-red-500  text-sm mt-1">*{formik.errors.name}</p>}

    </div>
    <div className="email">
      <input className="form-control w-full" type="email" placeholder="Email Address" 
      value={formik.values.email} 
      onChange={formik.handleChange}
      name="email"
      onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && <p className="text-red-500  text-sm mt-1">*{formik.errors.email}</p>}
      
      {accountExist && <p className="text-red-500  text-sm mt-1">{accountExist}</p>}

    </div>
    <div className="password">
      <input className="form-control w-full" type="password" placeholder="Password" value={formik.values.password} 
      onChange={formik.handleChange}
      name="password"
      onBlur={formik.handleBlur}
      />
      {formik.errors.password && formik.touched.password && <p className="text-red-500  text-sm mt-1">*{formik.errors.password}</p>}
    </div>
    <div className="rePassword">
      <input className="form-control w-full" type="password" placeholder="Confirm Password" value={formik.values.rePassword} 
      onChange={formik.handleChange}
      name="rePassword"
      onBlur={formik.handleBlur}
      />
      {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-500  text-sm mt-1">*{formik.errors.rePassword}</p>}
    </div>
    <div className="phone">
      <input className="form-control w-full" type="tel" placeholder="Phone Number" value={formik.values.phone} 
      onChange={formik.handleChange}
      name="phone"
      onBlur={formik.handleBlur}
      />
      {formik.errors.phone && formik.touched.phone && <p className="text-red-500  text-sm mt-1">*{formik.errors.phone}</p>}
    </div>

    <button  type="submit" className="btn w-full bg-primary-100 hover:bg-primary-200 text-white">Sign Up</button>
  </form>

  </>  
  
}
