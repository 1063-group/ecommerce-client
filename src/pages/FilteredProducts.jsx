import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/shared/Container'

const FilteredProducts = () => {
    const { category } = useParams()

    console.log(category)

    const requestProducts =  async () => {
        try {
            const request = await fetch(import.meta.env.VITE_API_URL + `/products/category/${category}`)
            const response = await request.json()
            console.log("azim dumba: ", response)
        } catch(e) {
            console.log("Server error:" , e)
        } finally {

        }
    }

    useEffect(() => {
        requestProducts()
    },[])

    return (
        <Container>
            <div className='flex relative min-h-screen'>
                <div className='w-1/4  bg-red-400 h-full sticky top-0 left-0'>
                    <ul className='menu'>
                        <li className='menu-item'>Tashoq</li>
                        <li className='menu-item'>Tashoq</li>
                        <li className='menu-item'>Tashoq</li>
                        <li className='menu-item'>Tashoq</li>
                        <li className='menu-item'>Tashoq</li>
                        <li className='menu-item'>Tashoq</li>
                        <li className='menu-item'>Tashoq</li>
                    </ul>
                </div>
                <div className='bg-green-400 flex-1'>
                    <p>Category: {category}</p>
                    <div>
                        <select name="" id="" className="select"></select>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default FilteredProducts