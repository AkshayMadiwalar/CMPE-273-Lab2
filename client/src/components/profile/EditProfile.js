import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Button, Row, Col, Image, Form, Modal } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import defaultProfileImg from './../../images/defaultProfileImg.png'
import countries from './../utils/countries.json'
import {s3,bucketName} from './../../aws-config/aws.js'
import constants from './../../utils/constants.json'

const EditProfile = () => {

    const [userId, setUserId] = useState()
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [editName, setEditName] = useState(false)
    const [profileImg,setProfileImg] = useState()
    const [nameForm, setNameForm] = useState({
        fNmae: "", lName: ""
    })
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        contactNumber: "",
        city: "",
        address: "",
        zipcode: "",
        country: "",
        about: "",
        dob: "",
        profileImg:""
    })



    useEffect(async () => {
        const { data } = await axios.post(constants.uri+"/users/auth")
        setUserId(data.id)
        setFormData({
            ...formData,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            gender: data.gender,
            city: data.city,
            dob: data.dob,
            about: data.about,
            country: data.country,
            address: data.address,
            zipcode: data.zipcode,
            contactNumber: data.contact_number,
            profileImg:data.profile_img
        }
        )
    }, [])



    const updateName = () => {
        setFormData({
            ...formData,
            firstName: nameForm.fName,
            lastName: nameForm.lName
        })
        setEditName(false)
    }


    const { fName, lName } = nameForm


    const { firstName, lastName, gender, email, contactNumber, city, address, zipcode, country, about, dob } = formData

    const updateFormData = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const genderUpdate = (e) => {
        e.preventDefault()
        if (e.target.checked) {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const onUploadFile = (e) => {
        e.preventDefault()
        setProfileImg([e.target.files[0]])
    }

    const saveChanges = async () => {
        const imageName = `profile/${formData.firstName}_${formData.lastName}/${userId}.jpg`
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
            ContentType: 'image/*'
        }
        const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
        await fetch(new Request(uploadUrl, {
            method: "PUT",
            body: profileImg[0],
            headers: new Headers({
                "Content-Type": 'image/*',
            })
        }))
        const imageUrl = uploadUrl.split('?')[0]
        console.log("Image URL: ",imageUrl)
        const res = await axios.post(constants.uri+"/users/update-profile", { ...formData, id: userId, profileImg: imageUrl })
        console.log(res)
        if (res.status === 200) {
            toast.success("User Profile Updated")
            setProfileUpdated(true)
        }
    }

    if (profileUpdated) {
        return <Navigate to="/profile" />
    }

    return (
        <Fragment>
            <h4 style={{ marginLeft: "20%", marginRight: "20%", marginTop: 20 }}>Your Public Profile</h4>
            <Card style={{ marginLeft: "20%", marginRight: "20%", marginTop: 20 }}>

                <Card.Header>Update your Profile</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Row style={{ margin: 20 }}>
                            <Col sm={3}>
                                <Image rounded width={175} height={150} src={formData.profileImg ? formData.profileImg : defaultProfileImg} />
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
                        <Row style={{ margin: 20 }}><span style={{ fontWeight: "lighter", fontSize: 14 }}>Must be .jpg or .png file, smaller than 20MB</span></Row>

                        <hr />

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>
                                Your Name: {firstName}
                            </Col>
                            <Col> <span style={{ textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setEditName(true)}>Change Name</span></Col>
                        </Row>

                        <hr />

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}><span>Gender:</span></Col>
                            <Col sm={6}>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Check onChange={(e) => genderUpdate(e)}
                                                type='radio'
                                                label="Male"
                                                value="Male"
                                                name="gender"
                                            /></Col>
                                        <Col>
                                            <Form.Check onChange={(e) => genderUpdate(e)}
                                                type='radio'
                                                label="Female"
                                                name="gender"
                                                value="Female"
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>

                        <hr />

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>Email</Col>
                            <Col>
                                <Form className="d-flex" >
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control type="email" placeholder="" name="email" value={email} onChange={(e) => updateFormData(e)} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        <hr />
                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>Contact Number</Col>
                            <Col>
                                <Form className="d-flex" >
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control type="number" placeholder="" name="contactNumber" value={contactNumber} onChange={(e) => updateFormData(e)} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        <hr />

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>BirthDay</Col>
                            <Col>
                                <Form className="d-flex" >
                                    <Form.Group className="mb-3" controlId="formBasicDate">
                                        <Form.Control type="date" placeholder="" name="dob" value={dob} onChange={(e) => updateFormData(e)} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        <hr />

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>Full Address</Col>
                            <Col>
                                <Row>
                                    <Form className="d-flex" >
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Control type="text" placeholder="Street Address" name="address" value={address} onChange={(e) => updateFormData(e)} />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row>
                                    <Form className="d-flex" >
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Control type="text" placeholder="City" name="city" value={city} onChange={(e) => updateFormData(e)} />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row>
                                    <Form className="d-flex" >
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Control type="text" placeholder="Zip Code" name="zipcode" value={zipcode} onChange={(e) => updateFormData(e)} />
                                        </Form.Group>
                                    </Form>
                                </Row>
                            </Col>
                        </Row>

                        <hr />

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>Country</Col>
                            <Col>
                                <Form.Select aria-label="Default select example" name="country" value={country} onChange={(e) => updateFormData(e)}>
                                    <option>Choose your country</option>
                                    {countries && countries.map(country => (
                                        <option value={country}>{country}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row style={{ margin: 20 }}>
                            <Col sm={6}>
                                <Row>About</Row>
                                <Row style={{ fontWeight: "lighter", fontSize: 14 }}>Tell people a little about yourself</Row>
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} name="about" value={about} onChange={(e) => updateFormData(e)} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Text>
                    <Button style={{ width: "100%" }} className="rounded-pill" variant="warning" onClick={() => saveChanges()}>Save Changes</Button>
                </Card.Body>
            </Card>

            <Modal
                show={editName}
                onHide={() => setEditName(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="First Name" name="fName" value={fName} onChange={(e) => setNameForm({ ...nameForm, [e.target.name]: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder='Last Name' name="lName" value={lName} onChange={(e) => setNameForm({ ...nameForm, [e.target.name]: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" className='rounded-pill' onClick={() => setEditName(false)}>
                        Close
                    </Button>
                    <Button variant="outline-warning" className='rounded-pill' onClick={() => updateName()}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default EditProfile