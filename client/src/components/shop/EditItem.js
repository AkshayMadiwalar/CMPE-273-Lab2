import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form,Row,Col,Modal,Button,Card,Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const EditItem = ({ editItem, setEditItem, item }) => {
    const [editFormData, setEditFormData] = useState({})
    const [category,setCategory] = useState("")
    const [othersCategory, setOthersCategory] = useState(false)

    useEffect(() => {
        setEditFormData(item)
    }, [item])

    const onChangeFormData = (e) => {
        e.preventDefault()
        setEditFormData({...editFormData,[e.target.name]:e.target.value})
    }

    const onUploadFile = (e) => {

    }

    const onChangeCategoryData = (e) => {
        e.preventDefault()
        setEditFormData({...editFormData,category:e.target.value})
    }

    const saveChanges = async (e) => {
        e.preventDefault()
        console.log(editFormData)
        const res = await axios.post(constants.uri+"/shop/updateItem",
            {
                productId: editFormData.product_id,
                name:editFormData.product_name,
                category:editFormData.category,
                description:editFormData.description,
                img:editFormData.img,
                price:editFormData.price,
                quantity:editFormData.quantity,
            })
        if(res.data){
            toast.success("Item Updated")
            setEditItem(false)
            window.location.reload(false);
        }
    }



    return (
        <>
        { editFormData && (
            <Modal
                show={editItem}
                onHide={() => setEditItem(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit {editFormData.product_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: 350, overflowY: 'auto' }}>
                    <Card>
                        <Card.Body>
                            <Row style={{ margin: 20 }}>
                                <Col sm={3}>
                                    <Image rounded width={100} height={105} src={editFormData.img} />
                                </Col>
                                <Col sm={3}></Col>
                                <Col>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload a new picture</Form.Label>
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
                                                name="product_name"
                                                value={editFormData.product_name}
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
                                            <option value="Clothing" selected={editFormData.category === "Clothing" ? true : false }>Clothing</option>
                                            <option value="Jewellery" selected={editFormData.category === "Jewellery" ? true : false }>Jewelley</option>
                                            <option value="Entertainment" selected={editFormData.category === "Entertainment" ? true : false }>Entertainment</option>
                                            <option value="Home Decor" selected={editFormData.category === "Home Decor" ? true : false }>Home Decor</option>
                                            <option value="Art" selected={editFormData.category === "Art" ? true : false }>Art</option>
                                            <option value="Others" selected={editFormData.category === "Others" ? true : false }>Others</option>
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
                                                        setEditFormData({ ...editFormData, category: e.target.value })
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
                                            <Form.Control as="textarea" rows={3} name="description" value={editFormData.description} onChange={(e) => onChangeFormData(e)} />
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
                                                value={editFormData.price}
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
                                                value={editFormData.quantity}
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
                    <Button varaint="outline-warning" className="rounded-pill"  onClick={(e)=>saveChanges(e)}>Save Changes</Button>
                </Modal.Footer>
            </Modal >
        )}
      </>
    )
}

export default EditItem