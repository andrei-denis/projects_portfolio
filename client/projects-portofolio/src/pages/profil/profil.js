import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import ProjectSection from "../project/project-section";
import AddProject from "../project/add-project";
import AddCategory from "../category/add-category";

function ProfilPage()
{
    const [user, setUser] = useState();

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
        else{
            nav("/signin");
        }
    }, []);

    function disconnect(){
        localStorage.clear();
        nav("/signin");
    }

    return(
        <main>
            <section className="container py-5 text-center header-projects">
                <div className="row py-lg-5">
                    <h1>Hi {user ? user.name : ""}!</h1>
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <p>
                        {user ? (
                            <AddProject id_user={user.id} />
                            ) : (
                                <Button disabled>AddProject</Button>
                            )}
                            <AddCategory />
                            <Button onClick={disconnect} variant="danger" className='mx-2'>Disconnect</Button>
                        </p>
                    </div>
                </div>
            </section>
            <div className="container mb-5">
                <h2>This are all your projects:</h2>
            </div>
            {
                user ? (
                    <ProjectSection getWith={'getWithOwner'} value={user.id}></ProjectSection>
                ) : ""
            }
        </main>
    )
}

export default ProfilPage;

