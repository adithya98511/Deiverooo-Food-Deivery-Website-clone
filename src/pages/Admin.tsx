import React from 'react'

const Admin : React.FC = () => {
  return (
    <div className='pt-32 pb-16 pr-8 pl-8'>
      <div className='grid grid-cols-3 font-bold text-center  '>
        <div className='border border-red-400 m-3 bg-red-300 '>
          
        </div>
        <div className='border border-blue-400 m-3 bg-blue-300'>Add to Popular</div>
        <div className='border border-yellow-400 m-3 bg-yellow-300'>Average Order Values</div>
      </div>
    </div>
  )
}

export default Admin
