import { useEffect, useState } from "react";

export default function Home() {
    const [country, setCountry] = useState("Sri Lanka");
    const [details, setDetails] = useState([]);


    function search() {
        const searchCountry = document.getElementById("search-txt").value;
        console.log(searchCountry);
        setCountry(searchCountry);
    }
    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDetails(data);
            });

    }, [country])


    return (
        <div className="container  ">
            <div className="col-4 py-5 mx-auto">
                <div className="d-flex" role="search">
                    <input className="form-control me-2" id="search-txt" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" onClick={search} type="submit">Search</button>
                </div>
            </div>
            {details && details.map(details =>
                <div className="container text-center">
                     <img src={details.flags.png} alt=".." />
                    <h4>Name :{details.name.common} </h4>
                    <h3>Democratic :{details.name.official} </h3>
                </div>

            )}



        </div>
    )
}