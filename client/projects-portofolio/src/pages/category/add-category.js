import React from "react";
import Axios from 'axios';

import { useState } from "react";
import {Modal, Button, Form} from 'react-bootstrap'

function AddCategory()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");

    const image = "/logo512.png";

    const submitAddCategory = async e => {
        e.preventDefault();
        const response = await Axios.post("http://localhost:3001/category/create", {name: name, imagePath: image});

        if(response.data){
            handleClose();
        }
    };

    return(
        <>
            <Button variant="secondary" onClick={handleShow} className="mx-2">
                Add Category
            </Button>

            <Modal show={show} onHide={handleClose} backdrop='static' centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={submitAddCategory}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control onChange={({ target }) => setName(target.value)} type="text" placeholder="New Project" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image:</Form.Label>
                            <Form.Control type="file" placeholder="Description..." />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Add Category
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddCategory;