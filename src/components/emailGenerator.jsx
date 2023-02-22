/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Modal} from 'react-bootstrap';
import Select from 'react-select';
import axios from "axios";


function EmailGenerator() {
    const options = [
        { value: 'Abandon Cart', label: 'Abandon Cart' },
        { value: 'Winback Campaign', label: 'Winback Campaign' },
        { value: 'Notice Pausing', label: 'Notice Pausing' }   
    ];

    const options_a = [
        { value: 'Relief Factor 3-Week QuickStart Subscription', label: 'Relief Factor 3-Week QuickStart Subscription' },
        { value: 'Relief Factor 60-ct Bag Subscription', label: 'Relief Factor 60-ct Bag Subscription' },
        { value: 'Relief Factor 60-ct Bag Single Order', label: 'Relief Factor 60-ct Bag Single Order' }
    ];

    const options_b = [
        { value: 'Energy', label: 'Energy' },
        { value: 'Sleep', label: 'Sleep' },
        { value: 'Calm', label: 'Calm' }   
    ];

    const [show, setShow] = useState(false);
    const [userOption, SetUserOption] = useState(options[0].value);
    const [profile, SetProfile] = useState('');
    const [product, SetProduct] = useState(options_a[0].value);
    const [detail, SetDetail] = useState(options_b[0].value);
    const [form, setForm] = useState(true);
    const [loading, SetLoading] = useState(false);
    const [response, SetResponse] = useState(false);
    const [content, SetContent] = useState('');

    const handleClose = () => {
        setShow(false)
    };

    const handleSubmit = (event) => {
        event.preventDefault();         
        setShow(true);
    };

    const handleSubmitModal = async (event) => {
        event.preventDefault();         
        SetLoading(true);
        setForm(false);  
        try {       
            const response = await axios.post("https://serverchatgptvuedata.herokuapp.com/chat", {                
                req: `Subject: <${userOption}>\nTo:<${profile}>\nProduct Name:<${detail}>Suscription:<${product}>\nContent:<${userOption}>\n\n###\n\n`
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
            <div className="card p-3">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Email Content Generator</h1>              
                    <h5 className="h5 mb-3 font-weight-normal text-center">Select your Template</h5>
                    <Select 
                        value={options.value}   
                        defaultValue={options[0]}                     
                        options={options}                        
                        onChange={(option) => SetUserOption(option.value)}                        
                        />
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
                                    placeholder="User Profile Information" 
                                    onChange={(event)=>SetProfile(event.target.value)}/>
                                <Select 
                                    className="text-left mt-2"    
                                    options={options_a}      
                                    defaultValue={options_a[0]}
                                    onChange={(option)=> SetProduct(option.value)}                                     
                                    />                                    
                                <Select 
                                    className="text-left mt-2"  
                                    options={options_b}
                                    defaultValue={options_b[0]}                 
                                    onChange={(option)=> SetDetail(option.value)}
                                    />                                                                    
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
                                <textarea defaultValue={content} className="form-control" cols="30" rows='25'>
                                    
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
