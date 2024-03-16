import React from 'react'
import loading from './loading2.gif'

const Spinner = () => {

  return (
      <div className='text-center'>
          <img className='my-3' style={{width:'150px'}} src={loading} alt="Loading" />
      </div>
    )
  
}

export default Spinner
