import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"
import { UserContext } from "../../context/User.context"

export default function Login() {
const [incorrectEmailOrPassword,setIncorrectEmailOrPassword] = useState(null)
const navigate = useNavigate()
let {token,setToken}=useContext(UserContext)

  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/



   async function sendDataToLogin (values) {
   const loadingToastId = toast.loading("Waiting ....")
    try{
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
      method:"POST",
      data:values
    }
    let { data } =  await axios.request(options)
    if(data.message == "success"){
      toast.success("Login Successfully .. Welcome ^_^")
      localStorage.setItem("token", data.token)
      setToken(data.token)
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
    setIncorrectEmailOrPassword(null)
    console.log(data)
    
  }
    catch(error){
      setIncorrectEmailOrPassword(error.response.data.message)
      toast.error(error.response.data.message)
      
      console.log(error.response.data.message)
    }
    finally{
      
      toast.dismiss(loadingToastId)
    }
    
  
  }

  const validation = object ({

    email: string().required("Email account is Required").email("Please Enter Valid Email"),
    password: string().required("Password is Required").matches(passwordRegex ,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
   
  })

  const formik = useFormik({
    initialValues:{
      "email":"",
      "password":"",
  },
    validationSchema:validation,
    onSubmit: sendDataToLogin

  });

  
  return <> 
  <h1 className="text-xl text-slate-700 font-semibold mb-5"><i className='fa-regular fa-circle-user mr-2'></i> Log In</h1>
  <form className="space-y-3" onSubmit={formik.handleSubmit}>
    
    <div className="email">
      <input className="form-control w-full" type="email" placeholder="Email Address" 
      value={formik.values.email} 
      onChange={formik.handleChange}
      name="email"
      onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && <p className="text-red-500  text-sm mt-1">*{formik.errors.email}</p>}
      

    </div>
    <div className="password">
      <input className="form-control w-full" type="password" placeholder="Password" value={formik.values.password} 
      onChange={formik.handleChange}
      name="password"
      onBlur={formik.handleBlur}
      />
      {formik.errors.password && formik.touched.password && <p className="text-red-500  text-sm mt-1">*{formik.errors.password}</p>}
    </div>
   
    {incorrectEmailOrPassword && <p className="text-red-500  text-sm mt-1">{incorrectEmailOrPassword}</p>}

    <button  type="submit" className="btn w-full bg-primary-100 hover:bg-primary-200 text-white">Login</button>
  </form>

  </>  
  
}
