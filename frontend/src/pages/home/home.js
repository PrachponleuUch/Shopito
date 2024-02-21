import React from 'react'
import Slider from '../../components/slider/slider'
import styles from '../../styles/Home.scss'
import HomeInfoBox from './homeInfoBox'

const Home = () => {
  return (
    <>
      <Slider/>
      <section>
        <div className='container'>
          <HomeInfoBox/>
        </div>
      </section>
    </>
  )
}

export default Home
