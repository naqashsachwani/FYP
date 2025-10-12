import React from 'react'
import Title from './Title'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center mx-4 my-20 lg:my-36'>
            <Title 
                title="Join Newsletter" 
                description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week." 
                visibleButton={false} 
            />
            <div className='flex flex-col sm:flex-row gap-4 bg-white text-sm p-2 rounded-2xl w-full max-w-2xl my-8 lg:my-12 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <input 
                    className='flex-1 px-6 py-4 sm:py-3 outline-none bg-transparent placeholder-slate-500 rounded-xl' 
                    type="email" 
                    placeholder='Enter your email address' 
                />
                <button className='font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 sm:py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-xl'>
                    Get Updates
                </button>
            </div>
        </div>
    )
}

export default Newsletter