import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  tokenSelector,signInAsync } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import './signIn.css'

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signInAsync(formData));
  };

  return (
    <div className="signin-container">
      <h2>SIGN-IN</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Email'
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter Password'
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
