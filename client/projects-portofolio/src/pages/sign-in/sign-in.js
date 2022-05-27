import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import logo from "../../img/logo512.png"

import "./sign-in.css"

function SignInPage()
{
    const [username, setUsername] = useState("");

    const nav = useNavigate();

    const submitSignIn = async e => {
        e.preventDefault();
        const response = await Axios.get(`http://localhost:3001/user/getWithName/${username}`);

        if(response.data && response.data.length > 0){
            localStorage.setItem('user', JSON.stringify(response.data[0]));
            nav("/profil");
        }
        else{
            Axios.post("http://localhost:3001/user/create", {username: username}).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                nav("/profil");
            });
        }
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            nav("/profil")
        }
      }, []);

    return(
        <main className="d-flex align-items-center">
            <div className="container text-center form-signin">
                <form onSubmit={submitSignIn}>
                    <img src={logo} alt="logo" width="72"></img>
                    <h3>Please sign in</h3>
                    <div className="form-floating mt-5 mb-3">
                        <input id="usernameInput" className="form-control" type="text" placeholder="username" onChange={({ target }) => setUsername(target.value)}></input>
                        <label htmlFor="usernameInput" className="form-label">Username</label>
                    </div>
                    <Button variant="primary" className="w-100" type="submit">
                        Sign In
                    </Button>
                </form>
                <p className="mt-5 mb-3 text-muted">Proiect PLF 2022 - Denis Andrei</p>
            </div>
        </main>
    )
}

export default SignInPage;