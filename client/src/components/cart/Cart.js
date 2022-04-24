import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const Cart = () => {

    const [cartItems, setCartItems] = useState([])
    const [userId, setUserId] = useState()
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [currency, setCurrency] = useState()
    const [subtotal, setsubtotal] = useState(0)

    const [giftDescShow, setGiftDescShow] = useState(false)


    useEffect(async () => {
        const { data } = await axios.post(constants.uri + '/users/auth')
        const userId = data.id
        setUserId(data.id)
        const res = await axios.post(constants.uri + '/order/cart-items', { userId })
        setCartItems(res.data)
        const items = res.data

        //calculate subtotal
        var total = 0
        items.map(item => {
            total = total + item.quantity * item.price
        })
        setsubtotal(total.toFixed(2))

        const curr = window.localStorage.getItem('country_currency')
        setCurrency(curr.split(',')[1])
    }, [])

    const placeOrder = async (e) => {
        e.preventDefault()
        var i = 0;
        cartItems.map(async item => {
            i++
            console.log(item, "----------------------------")
            if(parseInt(item.quantity) > 0){
                const res = await axios.post(constants.uri + '/order/place-order', {
                    elasticId: item.elastic_id,
                    productId: item.product_id,
                    userId,
                    price: item.price,
                    quantity: item.quantity,
                    giftWrap: item.giftWrap,
                    giftDescription: item.giftDecscription
                })
            }

            console.log(cartItems.length, i)
            if (i == cartItems.length) {
                toast.success("Order Placed")
                setOrderPlaced(true)
            }
           // window.localStorage.setItem('cart', window.localStorage.getItem('cart') - 1)
        })
        toast.success()
    }

    const removeFromCart = async (item) => {
        console.log(item)
        console.log(userId)
        const res = await axios.post(constants.uri + '/order/cart/remove-item', { userId, productId: item.product_id })
        if (res.data) {
            setCartItems(cartItems.filter(ele => ele.id != item.id))
            toast('Item removed from cart')

            //Calculate subtotal
            var total = 0
            cartItems.filter(ele => ele.id != item.id).map(item => {
                total = total + item.quantity * item.price
            })
            setsubtotal(total.toFixed(2))

            window.localStorage.setItem('cart', window.localStorage.getItem('cart') - 1)
        }
    }

    const giftWrap = (e, item) => {
        e.preventDefault()
        if (e.target.checked) {
            setGiftDescShow(true)
            item.giftWrap = true
        } else {
            setGiftDescShow(false)
            item.giftWrap = false
        }
    }

    const onChangeQuanity = (e,item) => {
        e.preventDefault()
        item.quantity = e.target.value
        var total = 0
        cartItems.map(item => {
            total = total + item.quantity * item.price
        })
        setsubtotal(total.toFixed(2))
    }

    const giftDescription = (e, item) => {
        e.preventDefault()
        if (e.target.value) {
            item.giftDecscription = e.target.value
        }
    }

    if (orderPlaced) {
        return <Navigate to="/myOrders" />
    }

    return (
        <Fragment>
            <Row style={{ marginLeft: '10%', marginRight: '10%', marginTop: 25 }}>
                <Col sm={8}>
                    <Card>
                        <Card.Body>
                            <Row><h4 style={{ textAlign: 'center' }}>Cart Items</h4></Row>
                            <hr />
                            {cartItems && cartItems.map(item => (
                                <Row>
                                    <Col onSubmit={3}>
                                        <Image src={item.img} />
                                    </Col>
                                    <Col sm={5}>
                                        <Row><h4>{item.product_name}</h4></Row>
                                        <Row>
                                            <Col><span>Price per Unit:</span></Col>
                                            <Col> <span>{item.price}{' '}<span style={{ fontWeight: 'lighter' }}>{currency}</span></span></Col>
                                        </Row>
                                        <Row>
                                            <Col><span>Quantity:</span></Col>
                                            <Col> <span>
                                                {item.quantity}
                                                &nbsp;
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control type="text" placeholder="Quantity"   onChange={(e)=>onChangeQuanity(e,item)}/>
                                                </Form.Group>
                                            </span></Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col><span style={{ fontWeight: 'bold' }}>Total:</span></Col>
                                            <Col> <span style={{ fontWeight: 'bold' }}>{(item.quantity * item.price).toFixed(2)}</span></Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Gift wrap"
                                                    onChange={(e) => giftWrap(e, item)}
                                                />
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Row>
                                        {giftDescShow && (<Row>
                                            <span>
                                                <Form.Control
                                                    type="text"
                                                    placeholder='Gift Description'
                                                    onChange={(e) => giftDescription(e, item)}
                                                />
                                            </span>
                                        </Row>
                                        )}
                                        <br />
                                        <Row>
                                            <Button variant='outline-danger' onClick={() => removeFromCart(item)} className='rounded-pill'>Remove from Cart</Button>
                                        </Row>
                                    </Col>
                                    <Col sm={1}>

                                    </Col>
                                    <hr />
                                </Row>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card>
                        <Card.Body>
                            <Row><h4 style={{ textAlign: 'center' }}>Total</h4></Row>
                            <hr />
                            <Row>
                                <Col><h6>Sub Total:</h6></Col>
                                <Col><span style={{ fontWeight: 'lighter' }}>{subtotal}{' '}<span style={{ fontWeight: 'lighter' }}>{currency}</span></span></Col>
                            </Row>
                            <Row>
                                <Col><h6>Delivery:</h6></Col>
                                <Col><span style={{ fontWeight: 'lighter' }}>0.00{' '}<span style={{ fontWeight: 'lighter' }}>{currency}</span></span></Col>
                            </Row>
                            <br />
                            <Row>
                                <Col><h6>Total:</h6></Col>
                                <Col><span style={{ fontWeight: 'lighter' }}>{subtotal}{' '}<span style={{ fontWeight: 'lighter' }}>{currency}</span></span></Col>
                            </Row>
                            <br />
                            <Row>
                                <Button variant='success' onClick={(e) => { placeOrder(e) }} className='rounded-pill'>Place Order</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Cart