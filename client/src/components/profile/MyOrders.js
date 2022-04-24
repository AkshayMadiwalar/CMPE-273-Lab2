import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import constants from './../../utils/constants.json'
import { Card, Button, Row, Col, Image, Pagination, Form } from 'react-bootstrap'


const MyOrders = () => {
    const [orders, setorders] = useState([])
    const [ordersData, setOrdersData] = useState([])
    const [currency, setCurrency] = useState()

    const [pageCount, setPageCount] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [currentPage,setCurrentPage] = useState(1)


    useEffect(async () => {
        const { data } = await axios.post(constants.uri + "/users/auth")
        const res = await axios.post(constants.uri + '/users/myorders', { id: data.id })
        var orders = res.data
        setOrdersData(res.data)

        const curr = window.localStorage.getItem('country_currency')
        setCurrency(curr.split(',')[1])

        let active = 2;
        var list = []

        var no_of_pages = orders.length / itemsPerPage
        if (orders.length % itemsPerPage != 0) {
            no_of_pages = no_of_pages + 1
        }
        orders = orders.slice(0, itemsPerPage )
        setorders(orders)
        for (let number = 1; number <= no_of_pages; number++) {
            list.push(number);
        }
        setPageCount(list)

    }, [])

    const handlePageClick = (index) => {
        setCurrentPage(index)
        console.log("Items per page:", itemsPerPage)
        const start = itemsPerPage * (index - 1) + 1
        const end = itemsPerPage * (index - 1) + itemsPerPage + 1
        setorders(ordersData.slice(start, end))
    }

    const onChangeItemsPerPage = (e) => {
        e.preventDefault()
        setItemsPerPage(parseInt(e.target.value))
        const itemsPP = parseInt(e.target.value)
        var no_of_pages = ordersData.length / itemsPP
        if (ordersData.length % itemsPP != 0) {
            no_of_pages = no_of_pages + 1
        }
        var list = []
        for (let number = 1; number <= no_of_pages; number++) {
            list.push(number);
        }
        setPageCount(list)
        
        if(currentPage!=1){
            const start = itemsPP * (currentPage - 1) + 1
            const end = itemsPP * (currentPage - 1) + itemsPP + 1
            setorders(ordersData.slice(start, end))
        }else{
            console.log(itemsPP-1)
            setorders(ordersData.slice(0, itemsPP))
        }
        
    }

    return (
        <Fragment>
            <Card style={{ marginTop: 20, marginLeft: "15%", marginRight: "15%" }}>
                <Card.Header>
                    <Row>
                        <Col sm={2}>My Orders</Col>
                        <Col sm={8}></Col>
                        <Col sm={2}>
                            <Form.Select aria-label="Default select example" name="itemsPerPage" value={itemsPerPage} onChange={(e)=>onChangeItemsPerPage(e)} >
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    {orders && orders.length > 0 ?
                        orders.map(order => (
                            <>
                                <Card.Title><span style={{ fontWeight: 'lighter' }}>Order Id:</span> <span style={{ fontWeight: 'light' }}>{order.order_id.split("-")[0]}</span></Card.Title>
                                <Card.Text>
                                    <Row>
                                        <Col sm={3}>
                                            <Image src={order.product_img} style={{ width: "100%", height: "210px" }}></Image>
                                        </Col>
                                        <Col sm={1}></Col>
                                        <Col sm={5}>
                                            <br />
                                            <Row><Col sm={3}><h5>{order.product_name}</h5></Col> </Row>
                                            <Row><Col sm={3}><span>Quantity</span></Col> <Col sm={3}><span>{order.quantity}</span></Col></Row>
                                            <Row><Col sm={3}><span>Price</span></Col><Col sm={3}><span>{order.price}{' '}<span style={{ fontWeight: 'lighter' }}>{currency}</span></span></Col></Row>
                                            <br />
                                            <Row><Col sm={3}><span>Total Paid</span></Col><Col sm={3}><span>{order.price * order.quantity}{' '}<span style={{ fontWeight: 'lighter' }}>{currency}</span></span></Col></Row>
                                        </Col>
                                        <Col sm={3}>
                                            <br />
                                            <Row><span>Seller: {order.shop_name}</span></Row>
                                            <br />
                                            {order.gift_wrap && (
                                                <Row><span style={{color:"green",fontWeight:'bold'}}>GIFT WRAPED</span><span>Text: <span style={{color:"green",fontWeight:'bold'}}>{order.gift_description}</span></span></Row>
                                            )}

                                            <br />
                                            <Row>{order.createdAt ? (<span>Ordered on {order.createdAt.split(":")[0].split("T")[0]}</span>) : ''}</Row>
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <hr />
                            </>
                        ))
                        : (
                            <span>No Orders yet!</span>
                        )}

                    <Pagination>
                        <Pagination.Prev />

                        {pageCount.map((item, index) => (
                            <Pagination.Item onClick={() => handlePageClick(index + 1)}>{index + 1}</Pagination.Item>
                        ))}

                        <Pagination.Next />
                    </Pagination>
                </Card.Body>
            </Card>





        </Fragment>
    )
}

export default MyOrders