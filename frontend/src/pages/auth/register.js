import React, { useState } from 'react'
import styles from '../../styles/auth.module.scss'
import registerImg from '../../assets/register.png'
import Card from '../../components/card/card'
import { Link } from 'react-router-dom'

const initialState = {
  name : "",
  email : "",
  password : "",
  cPassword : ""
}

const Register = () => {
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, cPassword } = formData

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const registerUser = () => { }
  return (
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
              name={email}
              required
              value={email}
              onChange={handleInputChange} 
            />
            <input 
              type="password"
              placeholder='Password'
              name={password}
              required
              value={password}
              onChange={handleInputChange} 
            />
            <input 
              type="text"
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
  )
}

export default Register