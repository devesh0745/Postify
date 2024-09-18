import { useState } from "react";
import { signUpAsync } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './signUp.css';

function SignUp(){
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        contact:""
    })

    const dispatch=useDispatch();
    const navigate = useNavigate();

    function handleChange(event){
        const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    }

    async function handleSubmit(event){
        event.preventDefault();
        const result = await dispatch(signUpAsync(formData));
        if (signUpAsync.fulfilled.match(result)) {
            navigate("/sign-in");
        } else {
            console.error("Sign-up failed:", result.error.message);
        }
    }

    return(
        <div className="signup-container">
            <h2>SIGN-UP</h2>
            <form onSubmit={handleSubmit} className="signup-form">
            <input 
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input 
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input 
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input 
                type="text"
                name="contact"
                placeholder="Enter Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
            </form>
         </div>
    )
}
export default SignUp;