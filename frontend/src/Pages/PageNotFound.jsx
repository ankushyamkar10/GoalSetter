import React from 'react'
import pnf from './pagenotfound.jpg'

const PageNotFound = () => {
  const handleGoBack = () => {
    console.log("fghb n");
    window.location.href = "/"
  }
  return (
    <div className='pagenotfound'>
      <img src={pnf} alt={pnf} className='w-4 h-4'/>
      <button className='btn' onClick={handleGoBack}>Back to Dashboard</button>
    </div>
  )
}

export default PageNotFound
