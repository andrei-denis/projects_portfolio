import React from "react";
import { useState } from "react";

import defImg from "../../img/logo192.png"

function ProjectCard({owner, name, imgSrc=defImg, desc, tags, link, pr_id})
{
    const [id, setId] = useState(-1);

    if(id == -1){
        setId(pr_id);
    }

    return(
        <div className="card h-100">
            <div className="card-header">
                {name}
            </div>
            <img className="card-img-top" src={imgSrc} alt="Imagien"></img>
            <div className="card-body d-flex flex-column">
                <p className="card-text">{desc}</p>
                <a className="btn btn-primary mt-auto" href={link}>Check it</a>
                <p className="card-text">
                    <small className="text-muted">
                        {tags.map((tag, key) => {
                            return(
                                <span key={key} className="badge bg-secondary mx-1 mt-2">{tag.name}</span>
                            )
                        })}
                    </small>
                </p>
            </div>
            {
                owner ? (
                    <div className="card-footer">
                        <small className="text-muted">Created by: {owner}</small>
                    </div>
                ) : ""
            }
            
        </div>
    )
}

export default ProjectCard;