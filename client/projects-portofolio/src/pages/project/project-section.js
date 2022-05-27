import React, {useState, useEffect} from "react";
import Axios from 'axios';

import ProjectCard from "./project-card";

function ProjectSection({getWith, value})
{
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        console.log(getWith)
        selectProjects();
    }, []);

    async function selectProjects(){
        let response;
        if(getWith && value){
            
            response = await Axios.get(`http://localhost:3001/project/${getWith}/${value}`);
        }
        else{
            response = await Axios.get(`http://localhost:3001/project`);
        }

        let data = response.data;
        for(let i in data){
            const prId = data[i].id;
            const categ = await Axios.get(`http://localhost:3001/project/category/getWithid/${prId}`);
            data[i].categories = categ.data;
        }
        setProjects(data);
    }

   // console.log(projects)

    return (
        <div className="container projects">
            <div className="row row-cols-1 row-cols-md-4 g-3">
                {projects.map((project, key) => {
                    return(
                        <div key={key} className="col">
                            <ProjectCard
                                name={project.title} 
                                imgSrc={project.image} 
                                desc={project.description}  
                                link={project.link} 
                                tags={project.categories}
                                owner={project.creator} ></ProjectCard>
                        </div>
                    )
                })}
            </div>
            <div className="d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#1">1</a></li>
                    <li className="page-item"><a className="page-link" href="#2">2</a></li>
                    <li className="page-item"><a className="page-link" href="#3">3</a></li>
                    <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
            </div>
        </div>
    )
}

export default ProjectSection;