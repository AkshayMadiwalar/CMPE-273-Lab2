import React, { Fragment, useEffect, useState } from 'react'
import { Button, Row, Col, Image, Card, FormControl } from 'react-bootstrap'
import defaultShop from './../../images/defaultShop.png'
import shopOwner from './../../images/shopowner.png'
import { useParams } from 'react-router-dom'
import EditShop from './EditShop'
import axios from 'axios'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'
import EditItem from './EditItem'
import constants from './../../utils/constants.json'

const Shop = () => {

    const [shopName, setShopName] = useState("")
    const [editShop, setEditShop] = useState(false)
    const [addItem, setAddItem] = useState(false)
    const [editItem,setEditItem] = useState(false)
    const [itemToEdit,setItemToEdit] = useState({})
    const [shop, setShop] = useState({})
    const params = useParams()

    const [arrGrid, setArrGrid] = useState([])

    useEffect(async () => {
        setShopName(params.name)
        const n = params.name
        const res = await axios.post(constants.uri+"/shop/byname", { name: n })
        const sellerId = res.data.seller_id
        const { data } = await axios.post(constants.uri+"/shop/getItems", { sellerId })
        setShop(res.data)
        var grid = []
        for (var i = 0; i < data.length; i = i + 3) {
            var ar = []
            if (data[i]) {
                ar.push(data[i])
            }
            if (data[i + 1]) {
                ar.push(data[i + 1])
            }
            if (data[i + 2]) {
                ar.push(data[i+2])
            }
            grid.push(ar)
        }
        console.log(grid)
        setArrGrid(grid)
    }, [])

    console.log(arrGrid)



    const onEditItem = (item) => {
        setEditItem(true)
        setItemToEdit(item)
    }



    return (
        <Fragment>
            {shop && (
                <>
                    <Card style={{ margin: 20 }}>
                        <Card.Body>
                            <Row>
                                <Col sm={2}>
                                    <Image rounded width={150} height={120} src={shop.img ? shop.img : defaultShop} />
                                </Col>
                                <Col sm={3}>
                                    <Row><h4>{shopName}</h4></Row>
                                    <Row><span style={{ fontWeight: 'lighter', fontSize: 14 }}>0 Sales | Joined in 2022</span><br /></Row>

                                    <Row><Button style={{ width: 'auto' }} className='rounded-pill' variant='outline-warning' onClick={() => setEditShop(true)}>Edit Shop</Button></Row>
                                </Col>
                                <Col sm={5}></Col>
                                <Col sm={2}>
                                    <Row><h6 >Shop Owner</h6></Row>
                                    <Image rounded width={50} height={55} src={shopOwner} />
                                    <Row><span style={{ fontWeight: 'lighter' }}>{shop.owner_name}</span></Row>
                                    <Row><span style={{ fontWeight: 'lighter' }}>{shop.email}</span></Row>
                                    <Row><span style={{ fontWeight: 'lighter' }}>{shop.ph_number}</span></Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card style={{ margin: 20 }}>
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <h5>Items</h5>
                                    <FormControl
                                        type="search"
                                        placeholder="Search items"
                                        className="me-1"
                                        aria-label="Search"
                                    />
                                    <br />
                                    <Button style={{ width: "100%", textAlign: "left" }} variant="outline-secondary">All</Button>
                                    <br />
                                    <br />
                                    <Button style={{ width: "100%", textAlign: "left" }} variant="warning" onClick={(e) => setAddItem(true)}>Add new Item</Button>

                                    <br />
                                    <hr />
                                    <span style={{ fontWeight: 'lighter' }}>{shop.sales} Sales (Total)</span>
                                </Col>
                                <Col sm={9}>
                                    {arrGrid && arrGrid.length > 0 && arrGrid.map(arr => (
                                        <Row>
                                            {arr && arr.map(item => (
                                                <Col sm={3}>
                                    
                                                            <Card.Body onClick={()=>onEditItem(item)}>
                                                                <Card.Text>
                                                                    <Card style={{ width: '13rem', height: '13rem' }}>
                                                                        <Card.Img variant="top" width={70} height={100} src={item.img} />
                                                                        <Card.Body>
                                                                            <Card.Title><span style={{ fontWeight: 'bold' }}>{item.name}</span> | <span style={{ fontWeight: 'lighter', fontSize:15 }}>{item.sales} Sales</span></Card.Title>
                                                                            <Card.Text>
                                                                                $ {item.price} | {item.quantity > 0 ? (<span style={{ fontWeight: 'lighter' }}>{item.quantity} available</span>) : (<span style={{ fontWeight: 'lighter', color: 'red' }}>Out of Stock</span>)}
                                                                     
                                                                            </Card.Text>
                                                                            {/* <Button variant="primary">Go somewhere</Button> */}
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Card.Text>
                                                            </Card.Body>
                                                
                                                </Col>
                                            ))}
                                        </Row>
                                    ))}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <EditShop
                        editShop={editShop}
                        setEditShop={setEditShop}
                        shopName={shopName}
                        shop={shop}
                    />

                    <AddItem
                        addItem={addItem}
                        setAddItem={setAddItem}
                        sellerId={shop.seller_id}
                        shop={shop}
                    />

                    <EditItem 
                        editItem={editItem}
                        setEditItem={setEditItem}
                        item = {itemToEdit}
                    />
                </>
            )}

        </Fragment>
    )
}

export default Shop