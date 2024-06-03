import React, { useEffect } from 'react'
import './Portfolio.css'
import Djan from '../../../assets/djanEcom.png'
import Ecom from '../../../assets/reactEcom.png'
import PHP from '../../../assets/php.png'
import Book from '../../../assets/book.png'
import Movie from '../../../assets/movie.png'
import FullStack from '../../../assets/fullStack.png'
import 'aos/dist/aos.css'
import Aos from 'aos'

export default function Portfolio() {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (
    <div className='portfolio'>
      <h1 data-aos='slide-down'>Projects</h1>

      <div data-aos='slide-up' className='list me-4 mx-4'>

        <div  className='detail'>
          <a href='https://github.com/TintHtooKo/DjangoEcommerce'><img src={Djan}/></a>
          <p>E-commerce Project Using Django</p>
        </div>

        <div  className='detail'>
          <a href='https://github.com/TintHtooKo/movie_website'><img src={Movie}/></a>
          <p>Movie Website Project using React and TMDB</p>
        </div>

        <div  className='detail'>
          <a href='https://github.com/TintHtooKo/food_delivery'><img src={PHP}/></a>
          <p>Food Delivery Project Using Pure PHP</p>
        </div>

        <div  className='detail'>
          <a href='https://github.com/TintHtooKo/EcommerceUsingReact'><img src={Ecom}/></a>
          <p>E-commerce Project using React</p>
        </div>

        <div className='detail'>
          <a href='https://github.com/TintHtooKo/BookStore'><img src={Book}/></a>
          <p>Book Store FullStack Project Using React and Django</p>
        </div>

        <div className='detail'>
          <a href='#'><img src={FullStack}/></a>
          <p>My Portfolio Using MERN stack</p>
        </div>

      </div>

        
        
        <div className='more'>
          <a href='https://github.com/tinthtooko'>More <i className="fas fa-angle-double-right" style={{backgroundColor:'transparent'}}></i></a>
        </div>
    </div>
  )
}