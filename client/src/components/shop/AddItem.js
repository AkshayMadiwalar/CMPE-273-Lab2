import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Modal, Image, Row, Col, Card, Button, Form } from 'react-bootstrap'
import defaultProfileImg from './../../images/defaultProfileImg.png'
import { s3, bucketName } from './../../aws-config/aws.js'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const AddItem = ({ addItem, setAddItem, sellerId, shop }) => {
    const [formData, setFormData] = useState({
        name: "",
        category: "Clothing",
        price: "",
        description: "",
        quantity: "",
        sellerId: ""
    })

    const [img, setImg] = useState()

    const [othersCategory, setOthersCategory] = useState(false)

    const { name, category, price, description, quantity } = formData

    const onChangeFormData = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onChangeCategoryData = (e) => {
        e.preventDefault()
        if (e.target.value === 'Others') {
            setOthersCategory(true)
        } else {
            setOthersCategory(false)
            setFormData({ ...formData, category: e.target.value })
        }
    }

    const saveItem = async (e) => {
        e.preventDefault()
        try {
            const imageName = `shops/${shop.name}/${name}.jpg`
            console.log(imageName)
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Expires: 60,
                ContentType: 'image/*'
            }
            const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
            console.log(uploadUrl)
            await fetch(new Request(uploadUrl, {
                method: "PUT",
                body: img[0],
                headers: new Headers({
                    "Content-Type": 'image/*',
                })
            }))
            const imageUrl = uploadUrl.split('?')[0]
            console.log(imageUrl)
            const res = await axios.post(constants.uri+"/shop/addItem", { ...formData, sellerId, img: imageUrl })
            if (res.data) {
                toast.success("New Item added")
                setAddItem(false)
                //window.location.reload(false)
            }
        } catch (error) {
                toast("Failed to save new item!")
        }

    }

    const onUploadFile = async (e) => {
        setImg([e.target.files[0]])
    }


    return (
        <Modal
            show={addItem}
            onHide={() => setAddItem(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: 350, overflowY: 'auto' }}>
                <Card>
                    <Card.Body>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                <Image rounded width={100} height={105} src={defaultProfileImg} />
                            </Col>
                            <Col sm={3}></Col>
                            <Col>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload a picture</Form.Label>
                                    <Form.Control type="file"
                                        onChange={(e) => onUploadFile(e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                Name of Item
                            </Col>
                            <Col sm={3}></Col>
                            <Col>
                                <Form className="d-flex" >
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control type="text"
                                            placeholder="Item Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => onChangeFormData(e)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                Category of item
                            </Col>
                            <Col sm={3}></Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Select onChange={(e) => onChangeCategoryData(e)}>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Jewelley">Jewelley</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Home Decor">Home Decor</option>
                                        <option value="Art">Art</option>
                                        <option value="Others">Others</option>
                                    </Form.Select>
                                </Form.Group>
                                {othersCategory && (
                                    <Form className="d-flex" >
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Control type="text"
                                                placeholder="Enter your Category"
                                                name="category"
                                                value={category}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, category: e.target.value })
                                                }}
                                            />
                                        </Form.Group>
                                    </Form>
                                )}
                            </Col>
                        </Row>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                Describe your item
                            </Col>
                            <Col sm={3}></Col>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} name="description" value={description} onChange={(e) => onChangeFormData(e)} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                Price of Item
                            </Col>
                            <Col sm={3}></Col>
                            <Col>
                                <Form className="d-flex" >
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control
                                            placeholder="Item Price"
                                            name="price"
                                            type="number"
                                            value={price}
                                            onChange={(e) => onChangeFormData(e)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                Quantity
                            </Col>
                            <Col sm={3}></Col>
                            <Col>
                                <Form className="d-flex" >
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control
                                            placeholder="Quantity"
                                            name="quantity"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => { onChangeFormData(e) }}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Modal.Body>
            <Modal.Footer>
                <Button varaint="warning" className="rounded-pill" onClick={(e) => saveItem(e)} >Save Changes</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default AddItem