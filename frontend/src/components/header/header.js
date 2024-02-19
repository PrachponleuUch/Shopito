import React from 'react'
import styles from '../../styles/Header.module.scss'
import { Link, NavLink } from 'react-router-dom'

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        Shop<span>ito</span>
      </h2>
    </Link>
  </div>
)

const activeLink = ({isActive}) => {
  return isActive ? `${styles.active}`:""
}

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav>
          <ul>
            <li>
              <NavLink to="/shop" className={activeLink}>
              Shop
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <NavLink to={"login"} className={activeLink}>
                Login
              </NavLink>
              <NavLink to={"register"} className={activeLink}>
                Register
              </NavLink>
              <NavLink to={"order-history"} className={activeLink}>
                My Order
              </NavLink>
            </span>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header