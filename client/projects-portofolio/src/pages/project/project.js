import React, {useState, useEffect} from "react";

import ProjectSection from "./project-section";
import { useNavigate } from "react-router-dom";

import "./project.css";

function ProjectsPage()
{
    const [category, setCategory] = useState();

    const [search, setSearch] = useState("");

    const [searchPatern, setSearchPatern] = useState("");

    const nav = useNavigate();
    
    useEffect(() => {
        const storageCategory = localStorage.getItem("category");
        if (storageCategory) {
            const foundCategory = JSON.parse(storageCategory);
            setCategory(foundCategory);
        }
    }, []);

    function usedProjectSection(){
        if(search != ""){
            return (<ProjectSection key={search} getWith="getWithPattern" value={search}></ProjectSection>)
        }

       if(category){
            if(category.name != "All"){
                return (<ProjectSection key={category.name} getWith="getWithCategory" value={category.id}></ProjectSection>)
            }
            else{
                return(<ProjectSection key={"all"}></ProjectSection>)
            }
       }

       return ("");
    }

    function resultFrom(){
        if(search){
            return (
                <p>Search for: {searchPatern}</p>
            )
        }

        return(
            <p>Category: <span onClick={() => {nav("/category")}}  className="badge bg-primary"> {category ? category.name :  "All"}</span></p>
        )
    }

    function submitSearch(e){
        e.preventDefault();

        if(searchPatern != ""){
            setSearch(searchPatern);
        }
    }

    return(
        <div>
            <section className="container py-5 text-center header-projects">
                <div className="row py-lg-5">
                    <h1>Projects</h1>
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <form className="d-flex" onSubmit={submitSearch}>
                            <input onChange={({ target }) => setSearchPatern(target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        {
                            resultFrom()
                        }
                    </div>
                </div>
            </section>
            {
                usedProjectSection()
            }
        </div>
    )
}

export default ProjectsPage;