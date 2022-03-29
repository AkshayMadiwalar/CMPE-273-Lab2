import React, { Fragment, useEffect, useState } from 'react'
import { Card, Row, Col, Image, Form, FormControl, Button, OverlayTrigger,Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultProfileImg from './../../images/defaultProfileImg.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const UserProfile = props => {

    const arr = [1, 2, 3, 4, 5, 6, 7]

    const [profile, setProfile] = useState({})
    const [favorites, setFavorites] = useState([])
    const [searchFav,setSearchFav] = useState()
    const [currency,setCurrency] = useState()

    useEffect(async () => {
        const { data } = await axios.post(constants.uri+"/users/auth")
        setProfile(data)
        const res = await axios.post(constants.uri+'/users/myFavorites', { id: data.id })
        setProductGrid(res.data)
        
        
        const curr = window.localStorage.getItem('country_currency')
        setCurrency(curr.split(',')[1])

    }, [])

    const setProductGrid = (data) => {
        const favItemsGrid = []
        for (var i = 0; i < data.length; i = i + 3) {
            var ar = []
            if (data[i]) {
                ar.push(data[i])
            }
            if (data[i + 1]) {
                ar.push(data[i + 1])
            }
            if (data[i + 2]) {
                ar.push(data[i + 2])
            }
            favItemsGrid.push(ar)
        }
        setFavorites(favItemsGrid)
    }

    const removeFromFavorites = async (item) => {
        const res = await axios.post(constants.uri+"/users/remove-from-favorites", { id: profile.id, productId: item.product_id })
        if (res.data) {
            toast.success("Removed from your favorites collection!")
            const {data} = await axios.post(constants.uri+'/users/myFavorites', { id: profile.id })
            setProductGrid(data)
        }
    }

    const search = async () => {
        console.log(searchFav)
        const {data} = await axios.post(constants.uri+'/users/myFavorites', { id: profile.id })
        var favs = []
        favs  =data
        favs = favs.filter(item=> item.product_name === searchFav)
        setProductGrid(favs)
    }

    const onChangeSearchFav = async (e) => {
        e.preventDefault()
        if(e.target.value.length == 0){
            console.log(e.target.value,"no value")
            setSearchFav("")
            const res = await axios.post(constants.uri+'/users/myFavorites', { id: profile.id })
            setProductGrid(res.data)
        }
        else{
            setSearchFav(e.target.value)
        }
    }



    return (
        <Fragment>
            <Card style={{ margin: 20 }}>
                <Card.Body>
                    <Row>
                        <Col sm={3}>
                            <Image rounded width={175} height={150} src={profile.profile_img ? profile.profile_img : defaultProfileImg} />
                        </Col>
                        <Col>
                            <Row>
                                <h4>{profile.first_name}{' '}{profile.last_name}</h4>
                            </Row>
                            <Row>
                                <span>{profile.email}</span>
                                {profile.contact_number && (
                                    <span>{profile.contact_number}</span>
                                )}
                                {profile.city && profile.country && (
                                    <span>{profile.city}, {profile.country}</span>
                                )}
                            </Row>

                        </Col>
                        <Col>
                            <Link to={`/profile/edit`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card style={{ margin: 20 }}>
                <Card.Header>
                    <Row>
                        <Col>
                            <h5>Favorite Items</h5>
                        </Col>
                        <Col>
                            <Form className="d-flex" >
                                <FormControl
                                    type="search"
                                    placeholder="Search your favorites"
                                    className="me-1"
                                    aria-label="Search"
                                    name="searchFav"
                                    value={searchFav}
                                    onChange={(e)=>onChangeSearchFav(e)}
                                />
                                <Button variant="outline-warning" onClick={()=>search()}> <i class="fa fa-search" aria-hidden="true"></i></Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Header>


                {favorites && favorites.map(arr => (
                    <Row>
                        {arr && arr.map(item => (
                            <Col sm={4}>
                                <Card.Body>
                                    <Card.Text>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" style={{ width: "100%", height: "230px" }} src={item.img ? item.img : defaultProfileImg} />
                                            <Card.Body>
                                                <Card.Title>
                                                    <Row>
                                                        <Col>
                                                            {item.product_name}
                                                        </Col>
                                                        <Col>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={<Tooltip id="button-tooltip-2">Remove From favorites</Tooltip>}
                                                            >
                                                                <Button
                                                                    variant="light"
                                                                    className="d-inline-flex align-items-center"
                                                                    onClick={() => removeFromFavorites(item)}
                                                                >
                                                                    <i style={{ color: 'red' }} className="fa fa-heart" aria-hidden="true"></i>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </Col>
                                                    </Row>
                                                </Card.Title>
                                                <Card.Text>
                                                    <Row>
                                                        <Col>
                                                            <span style={{ fontWeight: 'bold' }}>{item.price}{' '}<span style={{fontWeight:'lighter'}}>{currency}</span></span>
                                                        </Col>
                                                        <Col>
                                                            {item.quantity > 0 ? <span>In Stock</span> : <span style={{ color: 'red' }}>Out of Stock</span>}
                                                        </Col>
                                                    </Row>
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

                {favorites.length == 0 && (
                    <Row style={{textAlign:'center',margin:"10%"}}>
                        <br/>
                        <h4>Sorry! Favorites not found</h4>
                    </Row>
                )}


            </Card>
        </Fragment>
    )
}


export default UserProfile