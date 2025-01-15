// import React from 'react'

import HeroSection from "../components/HeroSection"
import MatchesList from '../components/MatchesList'
import TabButton from "../components/TapsButton"
import Advertisement from '../components/Advertisement'



export default function Matches() {
    return (
        <div className='  mx-auto mt-10 grid gap-5 w-full '>
            <div className="flex justify-end">
            </div>
            <HeroSection />
            <MatchesList />
            <Advertisement />


        </div>
    )
}
