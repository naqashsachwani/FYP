'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {
  const displayQuantity = 4
  const products = useSelector((state) => state.product.list || [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 my-24 max-w-7xl mx-auto">
      <Title
        title="Latest from DreamSaver"
        description={`Showing ${
          products.length < displayQuantity ? products.length : displayQuantity
        } of ${products.length} new arrivals`}
        href="/shop"
      />
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <div
              key={index}
              className="hover:-translate-y-2 hover:shadow-xl transition duration-300 rounded-xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default LatestProducts
