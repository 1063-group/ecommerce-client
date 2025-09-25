import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProducts = () => {
    const { id } = useParams()

    // localhost:5000/api/v1/products/:id GET
    // https://dummyjson.com/products/:id
    return (
        <div>SingleProducts</div>
    )
}

export default SingleProducts