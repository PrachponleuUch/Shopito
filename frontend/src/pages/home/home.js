import React from 'react'
import Slider from '../../components/slider/slider'
import '../../styles/Home.scss'
import HomeInfoBox from './homeInfoBox'
import { productData } from '../../components/carousel/data'
import CarouselItem from '../../components/carousel/carouselItem'
import ProductCarousel from '../../components/carousel/carousel'
import ProductCategory from './productCategory'
import FooterLinks from '../../components/footer/footerLinks'
const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className='--flex-between'>
        <h2 className='--fw-thin'>{heading}</h2>
        <button className='--btn'>{btnText}</button>
      </div>
    <div className='--hr'></div>
    </>
  )
}

const Home = () => {
  const productss = productData.map((item) => {
    return (
      <div key={item.id} >
        <CarouselItem
          name={item.name}
          url={item.imageurl}
          price={item.price}
          description={item.description}
        />
      </div>
    )
  })
  return (
    <>
      <Slider/>
      <section>
        <div className='container'>
          <HomeInfoBox/>
          <PageHeading heading={"Latest Product"} btnText={"Shop Now >>>"}/>
          <ProductCarousel products={productss}/>
        </div>
      </section>
      <section className='--bg-grey'>
        <div className='container'>
          <h3>Categories</h3>
          <ProductCategory/>
        </div>
      </section>
      <section>
        <div className='container'>
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now >>>"}/>
          <ProductCarousel products={productss}/>
        </div>
      </section>
      <FooterLinks/>
    </>
  )
}

export default Home
