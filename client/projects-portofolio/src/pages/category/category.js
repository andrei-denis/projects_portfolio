import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./category.css"

function CategoryPage()
{
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/category").then((data) => {
            setCategories(data.data)
        });
    }, []);

    if(categories.length == 0){
        return (
            <section className="container py-5 text-center header-projects">
                <div className="row py-lg-5">
                    <h1>There are no categories</h1>
                </div>
            </section>
        )
    }

    return(
        <main>
            <section className="container py-5 text-center header-projects">
                <div className="row py-lg-5">
                    <h1>Category</h1>
                </div>
            </section>

            <div className='container category-card-group'>
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="col">
                        <CategoryCard name="All" id="0" imgSrc="./logo192.png"></CategoryCard>
                    </div>
                    {categories.map((cat, key) => {
                            return (
                                <div key={key} className="col">
                                    <CategoryCard name={cat.name} imgSrc={cat.image} id={cat.id}></CategoryCard>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    );
}

function CategoryCard({name, imgSrc, id})
{
    const nav = useNavigate();

    return(
        <div className='card category-card' onClick={() => {localStorage.setItem('category', JSON.stringify({"id":id, "name":name})); nav("/projects"); }} >
            <img className='card-img' src={imgSrc}></img>
            <div className='card-img-overlay'>
                <h1 className='card-title'>{name}</h1>
            </div>
        </div>
    )
}

export default CategoryPage;

