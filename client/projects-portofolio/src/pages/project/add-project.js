import React from "react";
import { useState } from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import Axios from 'axios';

function AddProject({id_user})
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const [categories, setCategories] = useState("");

    const image = "/logo512.png";
    const date = new Date();

    const submitAddProject = async e => {
        e.preventDefault();
        const response = await Axios.post("http://localhost:3001/project/create", 
        {title: title, imagePath: image, description: description, link:link, start_date:date, end_date:date, id_user: id_user});

        if(response.data && response.data.id){
            addCategoryToProject(response.data.id);
            handleClose();
        }
    };

    const addCategoryToProject = (projectId) => {
        const category = categories.split(",");

        for(let i in category){
            const categoryName = category[i].replace(" ", "");
            Axios.post("http://localhost:3001/project/addCategory", {idProject: projectId, category: categoryName});
        }
    }

    return(
        <>
            <Button variant="primary" onClick={handleShow} className="mx-2">
                Add project
            </Button>

            <Modal show={show} onHide={handleClose} backdrop='static' centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={submitAddProject}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control onChange={({ target }) => setTitle(target.value)} type="text" placeholder="New Project" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image:</Form.Label>
                            <Form.Control type="file" placeholder="Description..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Link:</Form.Label>
                            <Form.Control onChange={({ target }) => setLink(target.value)} type="text" placeholder="www.yourproject.you" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control onChange={({ target }) => setDescription(target.value)} as="textarea" placeholder="Description..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categories:</Form.Label>
                            <Form.Control onChange={({ target }) => setCategories(target.value)} type="text" placeholder="html, css, site" />
                            <Form.Text muted>Please put a comma between the categories.</Form.Text>
                            <Form.Text muted>*If a category doesn't exist it will not be added.*</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Add Project
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddProject;