import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/shared/Container'

const FilteredProducts = () => {
    const { category } = useParams()

    console.log(category)

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
                    <div>
                        <select name="" id="" className="select"></select>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default FilteredProducts