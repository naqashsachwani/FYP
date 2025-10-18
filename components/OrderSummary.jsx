import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import AddressModal from './AddressModal'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const OrderSummary = ({ totalPrice = 0, items = [] }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
  const router = useRouter()

  // Safely access address list (fallback to empty array)
  const addressList = useSelector((state) => state.address?.list || [])

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [couponCodeInput, setCouponCodeInput] = useState('')
  const [coupon, setCoupon] = useState(null)

  // =====================
  // Handle Coupon Logic
  // =====================
  const handleCouponCode = async (event) => {
    event.preventDefault()

    if (!couponCodeInput.trim()) {
      toast.error('Please enter a coupon code.')
      return
    }

    try {
      // You can replace this with your API call
      if (couponCodeInput.toLowerCase() === 'save10') {
        setCoupon({
          code: 'SAVE10',
          discount: 10,
          description: '10% Off',
        })
        toast.success('Coupon applied successfully!')
      } else {
        toast.error('Invalid coupon code!')
      }
    } catch (err) {
      toast.error('Error validating coupon')
      console.error(err)
    }
  }

  // =====================
  // Handle Place Order
  // =====================
  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!selectedAddress) {
      toast.error('Please select or add an address.')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

    toast.loading('Placing your order...')
    setTimeout(() => {
      toast.dismiss()
      toast.success('Order placed successfully!')
      router.push('/orders')
    }, 1500)
  }

  // =====================
  // Render Component
  // =====================
  return (
    <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-600 text-sm rounded-xl p-7 shadow-sm'>
      <h2 className='text-xl font-semibold text-slate-700'>Payment Summary</h2>

      {/* Payment Method */}
      <p className='text-slate-400 text-xs my-4'>Payment Method</p>
      <div className='flex flex-col gap-2'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            id='COD'
            checked={paymentMethod === 'COD'}
            onChange={() => setPaymentMethod('COD')}
            className='accent-blue-500'
          />
          Cash on Delivery
        </label>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            id='STRIPE'
            name='payment'
            checked={paymentMethod === 'STRIPE'}
            onChange={() => setPaymentMethod('STRIPE')}
            className='accent-blue-500'
          />
          Stripe Payment
        </label>
      </div>

      {/* Address Section */}
      <div className='my-4 py-4 border-y border-slate-200 text-slate-500'>
        <p className='text-slate-400 text-sm mb-2'>Address</p>
        {selectedAddress ? (
          <div className='flex justify-between items-center'>
            <p className='text-xs'>
              {selectedAddress.name}, {selectedAddress.city},{' '}
              {selectedAddress.state}, {selectedAddress.zip}
            </p>
            <SquarePenIcon
              onClick={() => setSelectedAddress(null)}
              className='cursor-pointer hover:text-blue-600 transition'
              size={18}
            />
          </div>
        ) : (
          <div>
            {addressList.length > 0 ? (
              <select
                className='border border-slate-300 p-2 w-full my-2 outline-none rounded text-sm'
                onChange={(e) =>
                  setSelectedAddress(addressList[e.target.value])
                }
              >
                <option value=''>Select Address</option>
                {addressList.map((address, index) => (
                  <option key={index} value={index}>
                    {address.name}, {address.city}, {address.state},{' '}
                    {address.zip}
                  </option>
                ))}
              </select>
            ) : (
              <p className='text-xs text-slate-400'>
                No saved addresses yet. Please add one below.
              </p>
            )}
            <button
              className='flex items-center gap-1 text-blue-600 mt-2 hover:underline'
              onClick={() => setShowAddressModal(true)}
            >
              <PlusIcon size={16} /> Add Address
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className='pb-4 border-b border-slate-200'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1 text-slate-400'>
            <p>Subtotal:</p>
            <p>Shipping:</p>
            {coupon && <p>Coupon:</p>}
          </div>
          <div className='flex flex-col gap-1 font-medium text-right'>
            <p>
              {currency}
              {totalPrice.toLocaleString()}
            </p>
            <p>Free</p>
            {coupon && (
              <p>
                -{currency}
                {(coupon.discount / 100 * totalPrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Coupon Section */}
        {!coupon ? (
          <form
            onSubmit={handleCouponCode}
            className='flex justify-center gap-2 mt-3'
          >
            <input
              onChange={(e) => setCouponCodeInput(e.target.value)}
              value={couponCodeInput}
              type='text'
              placeholder='Coupon Code'
              className='border border-slate-300 p-1.5 rounded w-full outline-none text-sm'
            />
            <button
              type='submit'
              className='bg-blue-600 text-white px-3 rounded hover:bg-blue-700 active:scale-95 transition-all text-sm'
            >
              Apply
            </button>
          </form>
        ) : (
          <div className='w-full flex items-center justify-between text-xs mt-2'>
            <div>
              <p>
                Code: <span className='font-semibold'>{coupon.code}</span> —{' '}
                {coupon.description}
              </p>
            </div>
            <XIcon
              size={16}
              onClick={() => setCoupon(null)}
              className='hover:text-red-600 cursor-pointer transition'
            />
          </div>
        )}
      </div>

      {/* Total and Place Order */}
      <div className='flex justify-between py-4'>
        <p>Total:</p>
        <p className='font-semibold text-slate-800'>
          {currency}
          {coupon
            ? (totalPrice - (coupon.discount / 100) * totalPrice).toFixed(2)
            : totalPrice.toLocaleString()}
        </p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className='w-full bg-blue-700 text-white py-2.5 rounded hover:bg-blue-800 active:scale-95 transition-all font-medium'
      >
        Place Order
      </button>

      {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
    </div>
  )
}

export default OrderSummary
