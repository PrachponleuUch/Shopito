import React, { useEffect, useState } from 'react'
import styles from '../../styles/auth.module.scss'
import registerImg from '../../assets/register.png'
import Card from '../../components/card/card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import { useDispatch, useSelector } from "react-redux"
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/loader'

const initialState = {
  name : "",
  email : "",
  password : "",
  cPassword : ""
}

const Register = () => {
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, cPassword } = formData
  const dispatch = useDispatch()
  const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const registerUser = async (e) => { 
    e.preventDefault() 
    // console.log(name, email, password, cPassword)
    if (!email || !password) {
      return toast.error("All fields are required.")
    }
    if (password.length < 6) {
      return toast.error("Password must be 6 characters or more.")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.")
    }
    if (password !== cPassword) {
      return toast.error("Passwords must match.")
    }

    const userData = {
      name,
      email,
      password
    }

    await dispatch(register(userData))
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/")
    }

    // Refresh states except loggedIn
    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <>
    {(isLoading && <Loader/>)}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input 
                  type="text"
                  placeholder='Name'
                  name="name"
                  required
                  value={name}
                  onChange={handleInputChange} 
              />
              <input 
                type="text"
                placeholder='Email'
                name='email'
                required
                value={email}
                onChange={handleInputChange} 
              />
              <input 
                type="password"
                placeholder='Password'
                name='password'
                required
                value={password}
                onChange={handleInputChange} 
              />
              <input 
                type="password"
                placeholder='Confirm Password'
                name="cPassword"
                required
                value={cPassword}
                onChange={handleInputChange} 
              />
              <button type='submit' className="--btn --btn-danger --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="registerImage" width={400} />
        </div>
      </section>
    </>
  )
}

export default Register