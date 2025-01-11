// import React from 'react'
import HeroSection from '../components/HeroSection'
import MatchesList from '../components/MatchesList'
import Advertisement from '../components/Advertisement'
import NewsAndArticles from '../components/NewsAndArticles'

export default function Home() {
    return (
        <div className=' mt-10 grid grid-cols-12 gap-5 w-full '>
            <div className='hidden md:block col-span-2 h-[450px] '>
                <Advertisement />
            </div>
            <div className=' w-full md:col-span-8 col-span-12'>
                <HeroSection />
                <MatchesList />
            </div>
            <div className='mt-5  col-span-2 h-[450px]'>
                <div className='mt-7 hidden md:flex'>
                    <img
                        className='w-[91.14px] h-[91.14px] rounded-md'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                    <div className='px-2'>
                        <h1 className='text-md text-[#D9D9D9] font-bold'>RealMadrid Now</h1>
                        <p className='text-sm text-[#D9D9D9]'>Real Madrid Real  Madrid Real Madrid RealMadrid Now</p>

                    </div>
                </div>

                <div className='mt-7 hidden md:flex'>
                    <img
                        className='w-[91.14px] h-[91.14px] rounded-md'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                    <div className='px-2'>
                        <h1 className='text-md text-[#D9D9D9] font-bold'>RealMadrid Now</h1>
                        <p className='text-sm text-[#D9D9D9]'>Real Madrid Real  Madrid Real Madrid RealMadrid Now</p>

                    </div>
                </div>


            </div>


            <div className='max-w-7xl col-span-12 mx-auto  '>
                <NewsAndArticles />
            </div>
        </div>
    )
}
