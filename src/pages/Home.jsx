// import React from 'react'
import HeroSection from '../components/HeroSection'
import MatchesList from '../components/MatchesList'
import Advertisement from '../components/Advertisement'
import NewsAndArticles from '../components/NewsAndArticles'

export default function Home() {
    return (
        <div className=' mt-10 grid grid-cols-12 gap-5 w-full '>
            <div className='col-span-2 h-[450px] '>
                <Advertisement />
            </div>
            <div className=' w-full col-span-8 '>
                <HeroSection />
                <MatchesList />
            </div>
            <div className='col-span-2 h-[450px]'>
                <Advertisement />
            </div>
            <div className='max-w-7xl col-span-12 mx-auto  '>
                <NewsAndArticles />
            </div>
        </div>
    )
}
