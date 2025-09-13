import React from 'react'

const Infobar = () => {
  return (
    <div className='bg-white m-5'>
       <div className="bg-red-600 text-white flex items-center justify-between px-4 py-5 text-sm">
        <div className="flex items-center gap-4">
          <span>Предложение от Olcha</span>
          <span className="font-bold">Всё дешевле</span>
        </div>
        <button className="bg-white text-red-600 rounded-full px-4 py-1 font-semibold hover:bg-gray-100">
          Начать покупку
        </button>
      </div>
    </div>
  )
}

export default Infobar
