import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Carousel, Row, Col, Form, Button } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const ItemOverview = () => {

    const [product, setProduct] = useState({})
    const [quantity,setQuantity] = useState(1)
    const [buyNowEnabled,setBuyNowENabled] = useState(false)

    const params = useParams()

    useEffect(async () => {
        const id = params.id
        const { data } = await axios.get(constants.uri+`/users/product/${id}`)
        setProduct(data)
    }, [])

    const onChangeQuantity = (e) => {
        e.preventDefault()
        setQuantity(e.target.value)
    }

    const addToCart = async (e) => {
        e.preventDefault()
        const productId = params.id
        try {
            const {data} = await axios.post(constants.uri+'/users/auth')
            const userId = data.id
            const price = product.price
            const res = await axios.post(constants.uri+'/order/add-to-cart',{productId,userId,quantity,price})
            console.log(window.localStorage.getItem('cart'))
            window.localStorage.setItem('cart',window.localStorage.getItem('cart')+1)
            toast('Item added to your Cart!')
        } catch (error) {
            toast('Failed to add to Cart')
        }
    }

    const buyNow = async (e) => {
        e.preventDefault()
        const productId = params.id
        try {
            const {data} = await axios.post(constants.uri+'/users/auth')
            const userId = data.id
            const price = product.price
            const res = await axios.post(constants.uri+'/order/add-to-cart',{productId,userId,quantity,price})
            console.log(window.localStorage.getItem('cart'))
            window.localStorage.setItem('cart',window.localStorage.getItem('cart')+1)
            toast('Item added to your Cart!')
            setBuyNowENabled(true)
        } catch (error) {
            toast('Failed to add to Cart')
        }
    }

    if(buyNowEnabled){
        return <Navigate to="/cart"/>
    }

    return (
        <Fragment>
            {product && (
                <Row style={{ marginLeft: "15%", marginRight: "15%", marginTop: 20 }}>
                    <Col sm={7}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={product.img}
                                    alt="First slide"
                                    style={{width:"100%",height:"400px"}}
                                />

                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={4}>
                        <h4>{product.product_name}</h4>
                        <h5>${product.price}</h5>
                        <br />
                        {product.quantity > 0 ? (<span style={{color:'green',fontWeight:'bold'}}> In Stock ({product.quantity} available)</span>) : <span style={{color:'red',fontWeight:'bold'}}>Out of Stock</span>}
                        <br/><br/>
                        <Form.Group className="mb-3">
                            <Form.Label>Number of Items</Form.Label>
                            <Form.Control placeholder="Enter Quantity"  value={quantity} onChange={(e)=>onChangeQuantity(e)}/>
                        </Form.Group>
                        <Button variant='outline-warning' className='rounded-pill' onClick={(e)=>buyNow(e)} style={{width:"100%"}} disabled={quantity>0 &&  product.quantity > 0 ? false : true}>Buy it now</Button>
                        <br/>
                        <br/>
                        <Button variant='warning' className='rounded-pill' onClick={(e)=>addToCart(e)} style={{width:"100%"}} disabled={quantity>0 && product.quantity > 0 ? false : true}>Add to cart</Button>
                    </Col>
                </Row>
            )}

        </Fragment>
    )
}

export default ItemOverview