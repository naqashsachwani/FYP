'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Rs'

    return (
        <div className='mx-4 sm:mx-6'>
            <div className='flex flex-col xl:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto my-8 lg:my-12'>
                {/* Main Banner */}
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-green-200 via-emerald-100 to-teal-200 rounded-3xl xl:min-h-96 group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500'>
                    <div className='absolute inset-0 bg-black/5'></div>
                    <div className='relative p-6 sm:p-12 lg:p-16 z-10'>
                        <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-green-700 pr-4 pl-2 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm'>
                            <span className='bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md'>
                                NEWS
                            </span>
                            Free Shipping on Orders Above Rs 5000!
                            <ChevronRightIcon className='group-hover:translate-x-1 transition-transform' size={16} />
                        </div>

                        <h2 className='text-2xl sm:text-4xl lg:text-5xl leading-tight font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-600 bg-clip-text text-transparent max-w-xs sm:max-w-md lg:max-w-lg mt-4 lg:mt-6'>
                            Saving Goals for smarter shoppers
                        </h2>
                        <p className='text-slate-600 text-sm sm:text-base mt-2 max-w-md'>
                            Exclusive offers only at DreamSaver
                        </p>

                        <div className='text-slate-800 font-bold mt-6 lg:mt-8'>
                            
                        </div>

                        <button className='bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm font-semibold py-3.5 px-8 sm:py-4 sm:px-14 mt-6 lg:mt-10 rounded-xl hover:from-slate-700 hover:to-slate-600 hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg'>
                            SHOP NOW
                        </button>
                    </div>
                    <Image
                        className='sm:absolute bottom-0 right-0 w-full sm:w-auto sm:max-w-md lg:max-w-lg xl:max-w-xl h-64 sm:h-auto object-cover sm:object-contain'
                        src={assets.hero_model_img}
                        alt='DreamSaver Featured Product'
                        priority
                    />
                </div>

                {/* Side Banners */}
                <div className='flex flex-col sm:flex-row xl:flex-col gap-4 lg:gap-6 w-full xl:w-96'>
                    <div className='flex-1 flex items-center justify-between bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-200 rounded-3xl p-6 lg:p-8 group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500'>
                        <div className='relative z-10'>
                            <p className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-orange-500 bg-clip-text text-transparent max-w-36 lg:max-w-40'>
                                DreamSaver Picks
                            </p>
                            <p className='flex items-center gap-1.5 mt-4 text-slate-700 font-medium text-sm group-hover:text-slate-800 transition-colors'>
                                View more
                                <ArrowRightIcon className='group-hover:translate-x-1.5 transition-transform' size={18} />
                            </p>
                        </div>
                        <Image 
                            className='w-28 lg:w-32 transform group-hover:scale-110 transition-transform duration-500' 
                            src={assets.hero_product_img1} 
                            alt='DreamSaver product'
                        />
                    </div>

                    <div className='flex-1 flex items-center justify-between bg-gradient-to-br from-blue-200 via-sky-100 to-cyan-200 rounded-3xl p-6 lg:p-8 group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500'>
                        <div className='relative z-10'>
                            <p className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-500 bg-clip-text text-transparent max-w-36 lg:max-w-40'>
                                20% Off Deals
                            </p>
                            <p className='flex items-center gap-1.5 mt-4 text-slate-700 font-medium text-sm group-hover:text-slate-800 transition-colors'>
                                View more
                                <ArrowRightIcon className='group-hover:translate-x-1.5 transition-transform' size={18} />
                            </p>
                        </div>
                        <Image 
                            className='w-28 lg:w-32 transform group-hover:scale-110 transition-transform duration-500' 
                            src={assets.hero_product_img2} 
                            alt='DreamSaver discount product'
                        />
                    </div>
                </div>
            </div>

            <CategoriesMarquee />
        </div>
    )
}

export default Hero