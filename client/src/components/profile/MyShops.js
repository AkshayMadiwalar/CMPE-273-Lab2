import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultShop from './../../images/defaultShop.png'
import constants from './../../utils/constants.json'

const MyShops = () => {

    const [shops, setShops] = useState([])

    useEffect(async () => {
        const token = window.localStorage.getItem("userdetails")
        const { data } = await axios.post(constants.uri+"/users/auth", { token })
        const ownerId = data.id
        const res = await axios.post(constants.uri+"/shop/myShops", { ownerId })
        setShops(res.data)
    }, [])

    return (
        <Fragment>
            {shops && (
                <Card style={{ marginLeft: "20%", marginRight: "20%", marginTop: 30 }}>
                    <Card.Body>
                        {shops.map(shop => (
                            <Row>
                                <Col sm={3}>
                                    <Image src={shop.img ? shop.img : defaultShop} rounded width={80} height={85} />
                                </Col>
                                <Col sm={4}>
                                    <Row>
                                        <Link to={`/shop/${shop.name}/home`}><h5>{shop.name}</h5></Link>
                                    </Row>

                                </Col>
                            </Row>
                        ))}

                    </Card.Body>
                </Card>
            )}

        </Fragment>
    )
}

export default MyShops