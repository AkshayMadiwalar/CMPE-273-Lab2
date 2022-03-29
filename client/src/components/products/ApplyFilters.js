import React from 'react'
import { Col, Form, Modal, Button, Row } from 'react-bootstrap'
import axios from 'axios'
import constants from './../../utils/constants.json'

const ApplyFilters = ({ showApplyFilter, setShowApplyFilter, filters, setFilters, products, setProducts }) => {

    const getCategoryValue = (e) => {
        e.preventDefault()
        if(e.target.value === "All"){
            setFilters({ ...filters, category: "" })
            return 
        }
        setFilters({ ...filters, category: e.target.value })
    }

    const getPriceValue = (e) => {
        e.preventDefault()
        setFilters({ ...filters, price: e.target.value })
    }

    const apply = async () => {
        const {category, price} = filters
        const {data} = await axios.post(constants.uri+"/products/filter",{category,price})
        const grid = []
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
            grid.push(ar)
        }
        setProducts(grid)
        setShowApplyFilter(false)
    }

    return (
        <Modal
            show={showApplyFilter}
            onHide={() => setShowApplyFilter(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={2}>Category</Col>
                    <Col sm={1}></Col>
                    <Col>
                        <Form>
                            <Form.Check type='radio' label='All' onClick={(e) => { getCategoryValue(e) }} value="All" />
                            <Form.Check type='radio' label='Clothing' onClick={(e) => { getCategoryValue(e) }} value="Clothing" />
                            <Form.Check type='radio' label='Jewelry' onClick={(e) => getCategoryValue(e)} value="Jewelry" />
                            <Form.Check type='radio' label='Entertainment' onClick={(e) => getCategoryValue(e)} value="Entertainment" />
                            <Form.Check type='radio' label='Art' onClick={(e) => getCategoryValue(e)} value="Art" />
                            <Form.Check type='radio' label='Home Decor' onClick={(e) => getCategoryValue(e)} value="Home Decor" />
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={2}>Price Range</Col>
                    <Col sm={1}></Col>
                    <Col>
                        <Form>
                            <Form.Check type='radio' label='Any Price' onClick={(e) => getPriceValue(e)} value="999999999" />
                            <Form.Check type='radio' label='Under $50' onClick={(e) => getPriceValue(e)} value="50" />
                            <Form.Check type='radio' label='Under $75' onClick={(e) => getPriceValue(e)} value="75" />
                            <Form.Check type='radio' label='Under $100' onClick={(e) => getPriceValue(e)} value="100" />
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowApplyFilter(false)}>Cancel</Button>
                <Button onClick={() => apply()}>Apply</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplyFilters