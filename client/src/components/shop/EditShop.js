import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button, Card, Row, Col, Form, Image } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import defaultShopImg from './../../images/defaultShop.png'
import { s3, bucketName } from './../../aws-config/aws.js'
import constants from './../../utils/constants.json'

const EditShop = ({ editShop, setEditShop, shopName, shop }) => {

    const [updated, setUpdated] = useState(false)

    const [updateFormData, setUpdateFormData] = useState({})

    const [img, setImg] = useState()

    useEffect(() => {
        setUpdateFormData(shop)
    }, [])

    console.log(shop, updateFormData)

    const updateShop = async (e) => {
        e.preventDefault()
        console.log(updateFormData, shopName)
        try {
            const imageName = `shops/${shopName}/profile/${shopName}.jpg`
            console.log(imageName)
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Expires: 60,
                ContentType: 'image/*'
            }
            var uploadUrl = ""
            var imageUrl = shop.img
            if (img) {
                console.log("-------s3",s3)
                uploadUrl = await s3.getSignedUrlPromise('putObject', params)
                await fetch(new Request(uploadUrl, {
                    method: "PUT",
                    body: img[0],
                    headers: new Headers({
                        "Content-Type": 'image/*',
                    })
                }))
                imageUrl = uploadUrl.split('?')[0]
            }

            console.log( {
                name: updateFormData.name? updateFormData.name : shopName,
                email: updateFormData.email,
                ownerName: updateFormData.owner_name,
                phNumber: updateFormData.ph_number,
                sellerId: shop.seller_id,
                img: imageUrl
            })
           
            const res = await axios.post(constants.uri + "/shop/update",
                {
                    name: updateFormData.name? updateFormData.name : shopName,
                    email: updateFormData.email,
                    ownerName: updateFormData.owner_name,
                    phNumber: updateFormData.ph_number,
                    sellerId: shop.seller_id,
                    img: imageUrl
                })
            console.log(res)
            if (res.status === 200) {
                toast.success("Shop Updated")
                shop = res.data
                console.log(shop)
                setEditShop(false)
                setUpdated(true)
               // window.location.reload(false)
            }
        } catch (error) {
            console.log(error)
            toast("Failed to update shop, Try again!")
        }
    }

    const onUploadFile = (e) => {
        e.preventDefault()
        setImg([e.target.files[0]])
    }


    toast.configure()
    if (updated) {
        //window.location.reload(false)
        //return <Navigate to={`/shop/${updateFormData.name}/home`} />
    }
    return (
        <Fragment>
            {shop && (
                <Modal
                    show={editShop}
                    onHide={() => setEditShop(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Shop
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col sm={4}>Shop Name:</Col>
                                    <Col sm={5}>
                                        <Form className="d-flex" >
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Control type="text"
                                                    placeholder="Shop Name"
                                                    name="name"
                                                    value={updateFormData.name ? updateFormData.name : shopName}
                                                    onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <Image rounded width={100} height={105} src={shop.img ? shop.img : defaultShopImg} />
                                    </Col>
                                    <Col sm={5}>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Upload a new picture</Form.Label>
                                            <Form.Control type="file"
                                                onChange={(e) => onUploadFile(e)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <br />
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col sm={4}>Owner Name:</Col>
                                    <Col sm={5}>
                                        <Form className="d-flex" >
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Control type="text"
                                                    placeholder="Owner Name"
                                                    name="name"
                                                    value={updateFormData.owner_name}
                                                    onChange={(e) => setUpdateFormData({ ...updateFormData, owner_name: e.target.value })} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>Owner Email:</Col>
                                    <Col sm={5}>
                                        <Form className="d-flex" >
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Control type="text"
                                                    placeholder="Owner email"
                                                    name="email"
                                                    value={updateFormData.email}
                                                    onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>Contact Number:</Col>
                                    <Col sm={5}>
                                        <Form className="d-flex" >
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Control type="text"
                                                    placeholder="Owner Contact Number"
                                                    name="phNumber"
                                                    value={updateFormData.ph_number}
                                                    onChange={(e) => setUpdateFormData({ ...updateFormData, ph_number: e.target.value })} />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button varaint="warning" className="rounded-pill" onClick={(e) => updateShop(e)} >Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Fragment>
    )
}

export default EditShop