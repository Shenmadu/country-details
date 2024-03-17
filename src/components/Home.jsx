import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
        <div className="container  mt-5">
            <div className="col-4 py-5 mx-auto">
                <div className="d-flex" role="search">
                    <TextField  id="search-txt" className="form-control me-2" label="Standard" variant="standard" />                   
                    <Button variant="outlined" onClick={search}>Search</Button>
                </div>
            </div>
            {details && details.map(details =>
                <div className="container text-center">
                    <img src={details.flags.png} alt=".." />
                    <h4>Name :{details.name.common} </h4>
                    <h4>Capital :{details.capital} </h4>
                    <h3>Democratic :{details.name.official} </h3>
                </div>

            )}



        </div>
    )
}