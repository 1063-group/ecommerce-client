import React, { use, useEffect, useState } from 'react'
import Header from '../components/layouts/Header'
import { Outlet } from 'react-router-dom'
import ProductCard from '../components/ui/cards/ProductCard'
import ColProductCard from '../components/ui/cards/ColProductCard'
import RowProductCard from '../components/ui/cards/RowProductCard'
import PromotionBanner from '../components/ui/promotions/PromotionBanner'
import Container from '../components/shared/Container'
import SkeletonCards from '../components/shared/SkeletonCards'
import RowDiscauntCard from '../components/ui/cards/RowDiscountCard'
import ColDiscauntCard from '../components/ui/cards/ColDiscountCard'

const Home = () => {
  const [user, usetUser] = useState([])
  const [products, setProducts] = useState([])
  const [smartphones, setSmartphones] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  console.log(import.meta.env.VITE_API_URL)


  const getProducts = async () => {
    try {
      const request = await fetch(import.meta.env.VITE_API_URL + '/products')
      const response = await request.json()
      console.log("products", response)
      setProducts(response.products)
    } catch (e) {
      console.log('server error:', e)
    } finally {
      setLoadingProducts(false)
    }
  }
  const getSmartPhones = async () => {
    try {
      const request = await fetch(import.meta.env.VITE_API_URL + '/products/search?q=phone')
      const response = await request.json()
      console.log("smartphones: ", response)
      setSmartphones(response.products)
    } catch (e) {
      console.log('server error:', e)
    } finally {
      setLoadingProducts(false)
    }
  }
  useEffect(() => {
    getProducts()
    getSmartPhones()
  }, [])
  useEffect(() => {
    const a = products.filter(item => item.category === 'smartphones')
    console.log("erik gey:  ",a)
  }, [])
  return (
    <>
      <main>
        {/* Main Products */}
        {/* smartphones cards */}
        <section className='py-10'>
          <Container>
            <div className='bg-primary border border-primary rounded-2xl'>
              <div className="flex gap-2 p-5">
                {/* BILOL = FETCH BILAN QILISH */}
                <div className='max-w-[30%] flex flex-wrap flex-col justify-between'>
                  {smartphones.slice(0, 2).map((item, index) => <RowDiscauntCard key={index} title={item?.title} price={item?.price} discount={item?.discount} image={item?.thumbnail} />)}
                </div>
                <div className='flex items-center flex-wrap h-[440px] overflow-y-hidden'>
                  {smartphones.map((item, index) => <ColDiscauntCard key={index} title={item?.title} price={item?.price} discount={item?.discount} image={item?.thumbnail} />)}
                </div>
              </div>
            </div>
          </Container>
        </section>
        <PromotionBanner img={'https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/DvAmWwCXU8V2EDK0d3bFFo7YbIpfPT8euXbpAkSWU6PxaThfpP4GeGHfrLJN.jpg'} />
        <section className='py-20'>
          <Container>
            {
              loadingProducts ? (
                <div className='grid grid-cols-5 gap-5'>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => <SkeletonCards key={index} />)}
                </div>
              ) : (
                <div>
                  {
                    products.length > 0 ? (
                      <div className='grid grid-cols-5 gap-5'>
                        {products.map((item, index) => <ColProductCard key={index} card={item} />)}
                      </div>
                    ) : (
                      <div className='py-20 flex items-center justify-center text-2xl'>
                        <p>Товары не найдены</p>
                      </div>
                    )
                  }
                </div>
              )
            }
          </Container>
        </section>
        <PromotionBanner />
      </main>
    </>
  )
}

export default Home