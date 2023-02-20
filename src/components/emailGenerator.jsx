/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Modal} from 'react-bootstrap';
import axios from "axios";
import templates from './template.json';


function EmailGenerator() {
    const [show, setShow] = useState(false);
    const [userOption, SetUserOption] = useState('abandoned');
    const [form, setForm] = useState(true);
    const [loading, SetLoading] = useState(false);
    const [response, SetResponse] = useState(false);
    const [content, SetContent] = useState('');

    const handleClose = () => {
        setShow(false)
    };
    const handleChange = (event) => {
        console.log(event.target.value, 'Diego');
        SetUserOption(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();       
        setShow(true);
    };
    const handleChangeTa = (event) => {
        console.log(event.target.value);
    }
    const handleSubmitModal = async (event) => {
        event.preventDefault();
        console.log(userOption);
        SetLoading(true);
        setForm(false);        
        try {
            const response = await axios.post("https://serverchatgptvuedata.herokuapp.com/chat", {
                req: (userOption == 'abandoned') ? templates.abandoned : (userOption == 'left') ? templates.left : templates.paused,
            });
            const res = response.data.message;
            SetContent(res);
            SetLoading(false);
            SetResponse(true);          
        } catch (error) {
           
        }
    };

    return (
        <>
            <div className="card p-3">{/*col-lg-4 col-md-12*/}
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Email Content Generator</h1>              
                    <h5 className="h5 mb-3 font-weight-normal text-center">Select your Template</h5>
                    <select className="form-control" onChange={handleChange}>
                        <option value="abandoned">Abandon Cart</option>
                        <option value="left">Winback Campaign</option>
                        <option value="paused">Notice Pausing</option>
                    </select>
                    <div className="d-grid gap-2 mt-4">
                        <Button variant="outline-secondary" className="btn btn-lg btn-primary btn-block" type="submit">
                            Generate
                        </Button>
                    </div>            
                    <p className="mt-5 mb-3 text-muted text-center">Copyright © {new Date().getFullYear()} Vuedata</p>
                </form>    
            </div>
            <Modal show={show} onHide={handleClose} centered backdrop="static">                   
                <Modal.Body className="d-inline text-center" closebutton="true">
                    <div className="modalForm">
                        {
                            form  && 
                            <><Modal.Title className="mb-3">Specify following Parameters</Modal.Title><form onSubmit={handleSubmitModal}>
                                <input
                                    type="text"
                                    className="w-full border border-gray-400 p-2 rounded-lg"
                                    placeholder="User Profile Information" />
                                <select className="form-control mt-2" onChange={handleChange} required>
                                    <option value="winback">Relief Factor 3-Week QuickStart Subscription</option>
                                    <option value="pausing">Relief Factor 60-ct Bag Subscription</option>
                                    <option value="pausing">Relief Factor 60-ct Bag Single Order</option>
                                </select>
                                <select className="form-control mt-2" onChange={handleChange} required>
                                    <option value="winback">Energy</option>
                                    <option value="pausing">Sleep</option>
                                    <option value="pausing">Calm</option>
                                </select>
                                <Button variant="outline-secondary" className="btn mt-3 d-inline text-center btn-md btn-primary btn-block" type="submit">
                                    Continue
                                </Button>
                            </form></>                             
                        } 
                        {
                            loading &&
                            <>
                                <h1>Generating Content</h1>
                                <b>Loading...</b>
                            </>
                        }
                        {
                            response &&
                            <>
                                <textarea value={content} className="form-control" onChange={handleChangeTa} cols="30" rows='25'>
                                    
                                </textarea>
                            </>
                        }                       
                    </div>                                  
                </Modal.Body>                
            </Modal>
        </>            
    );
}

export default EmailGenerator;
