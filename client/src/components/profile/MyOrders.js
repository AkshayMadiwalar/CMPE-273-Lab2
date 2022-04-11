import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import constants from './../../utils/constants.json'
import { Card, Button, Row,Col,Image } from 'react-bootstrap'

const MyOrders = () => {
    const [orders, setorders] = useState([])
    const [currency,setCurrency] = useState()

    useEffect(async () => {
        const { data } = await axios.post(constants.uri + "/users/auth")
        const res = await axios.post(constants.uri + '/users/myorders', { id: data.id })
        setorders(res.data)

        const curr = window.localStorage.getItem('country_currency')
        setCurrency(curr.split(',')[1])
    }, [])

    return (
        <Fragment>
            <Card style={{marginTop:20,marginLeft:"15%",marginRight:"15%"}}>
                <Card.Header>My Orders</Card.Header>
                <Card.Body>
                    {orders && orders.length > 0 ? 
                            orders.map(order => (
                                <>
                                    <Card.Title><span style={{fontWeight:'lighter'}}>Order Id:</span> <span style={{fontWeight:'light'}}>{order.order_id}</span></Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col sm={3}>
                                                <Image src={order.product_img} style={{width:"100%",height:"210px"}}></Image>    
                                            </Col>
                                            <Col sm={1}></Col>
                                            <Col sm={5}>
                                                <br/>
                                                <Row><Col sm={3}><h5>{order.product_name}</h5></Col> </Row>
                                                <Row><Col sm={3}><span>Quantity</span></Col> <Col sm={3}><span>{order.quantity}</span></Col></Row>
                                                <Row><Col sm={3}><span>Price</span></Col><Col sm={3}><span>{order.price}{' '}<span style={{fontWeight:'lighter'}}>{currency}</span></span></Col></Row>
                                                <br/>
                                                <Row><Col sm={3}><span>Total Paid</span></Col><Col sm={3}><span>{order.price*order.quantity}{' '}<span style={{fontWeight:'lighter'}}>{currency}</span></span></Col></Row>
                                            </Col>
                                            <Col sm={2}>
                                                <br/>
                                                <Row><span>Seller: {order.shop_name}</span></Row>
                                                <br/>
                                                {order.gift_wrap && (
                                                    <Row><span>GIFT WRAPED</span><span>Text: {order.gift_description}</span></Row>
                                                )}
                                                
                                                <br/>
                                                <Row>{order.date ? (<span>Ordered on {order.date}</span>) : ''}</Row>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    <hr/>
                                </>
                            ))
                      : (
                        <span>No Orders yet!</span>
                    )}

                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default MyOrders