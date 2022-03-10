import React from 'react'
import loading from './loading.gif'

const Spinner = () => {
  return (
    <div className='text-center mt-5'>
      <img className='text-center' src={loading} alt="loading" />
    </div>
  )
}

export default Spinner