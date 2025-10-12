import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 my-24 max-w-7xl mx-auto">
      <Title
        visibleButton={false}
        title="Our Specifications"
        description="We deliver premium-quality service and convenience — making every shopping experience smooth, secure, and stress-free."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {ourSpecsData.map((spec, index) => (
          <div
            key={index}
            className="relative bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center group"
          >
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 flex items-center justify-center rounded-xl shadow-md text-white group-hover:scale-110 transition"
              style={{ backgroundColor: spec.accent }}
            >
              <spec.icon size={22} />
            </div>
            <h3 className="mt-8 font-semibold text-lg text-slate-800">{spec.title}</h3>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              {spec.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurSpecs
