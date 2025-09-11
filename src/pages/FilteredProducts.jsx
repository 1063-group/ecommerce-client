import React from 'react'
import { useParams } from 'react-router-dom'

const FilteredProducts = () => {
    const { category } = useParams()

    console.log(category)

    return (
        <div>FilteredProducts</div>
    )
}

export default FilteredProducts