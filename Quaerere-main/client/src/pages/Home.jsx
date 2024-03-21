import React from 'react'
import img from '../assets/img.png'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className=''>
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img class="object-cover object-center rounded" alt="hero" src={img}/>
                    </div>
                    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 class="title-font sm:text-4xl text-3xl mb-4 text-gray-900 font-extrabold"><span className='text-blue-500'>Quaerere</span> - Search Engine for Power User
                        </h1>
                        <p class="mb-8 leading-relaxed font-medium text-xl">Unlock domain-specific search precision with the unrivaled intelligence of Large Language Models</p>
                        <Link to='/search'  class="flex justify-center">
                            <button class="inline-flex text-white bg-gray-700  py-2 px-6 focus:outline-none hover:bg-gray-200 border-2 border-gray-700 hover:text-black rounded text-lg">Lets Go !</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home