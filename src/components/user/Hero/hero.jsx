import './hero.css'

import React from 'react'
import BASE_URL from '../../../config/config'
import { Link } from 'react-router-dom'
function Hero() {
    return (
        <>
            <div className='hero'>
                <img src={`${BASE_URL}/public/images/Banner.JPG`}
                    alt="" />
                    
                <div className="hero-text text-start">
                    <h1 >Bringing skilled Professionals To You</h1>
                   <Link to={'/services'}>
                   <button>Explore Now</button>
                   </Link> 
                </div>
            </div>
        </>
    )
}

export default Hero