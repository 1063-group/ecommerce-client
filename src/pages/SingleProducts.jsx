import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProducts = () => {
    const { id } = useParams()

    // /api/v1/products/:id GET
    return (
        <div>SingleProducts</div>
    )
}

export default SingleProducts