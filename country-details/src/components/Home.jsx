import { useState } from "react";

export default function Home() {
    const[country,setCountry]=useState("sri Lanka");
    const[details,setDetails]=useState({});


   function search(){
        const searchCountry=document.getElementById("search-txt").value;
        console.log(searchCountry);
    }


    return (
        <div className="container  ">
            <div className="col-4 py-5 mx-auto">
                <div className="d-flex" role="search">
                    <input className="form-control me-2" id="search-txt" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" onClick={search} type="submit">Search</button>
                </div>
            </div>
            <h4>Name : </h4>
            <h3>Democratic : </h3>


        </div>
    )
}