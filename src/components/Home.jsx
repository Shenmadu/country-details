import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const logoStyle = {
    width: '100px',
    height: 'auto',
};


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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("location");
            console.log(position.coords);

        })


    }, [])


    return (
        <div className="container  mt-5">
            <div className="col-4 py-5 mx-auto">
                <div className="d-flex" role="search">
                    <TextField id="search-txt" className="form-control me-2" label="Standard" variant="standard" />
                    <Button variant="outlined" onClick={search}>Search</Button>
                </div>
            </div>
            {details && details.map(details =>
                <div className="container" key={details}>
                    <div className=" text-center ">
                        <img src={details.flags.png} alt=".." />
                        <img style={logoStyle} src={details.coatOfArms.png} alt=".." />
                    </div>
                    <ul>
                        <li> <h4>Country Name :{details.name.common} </h4></li>                        
                        <li> <h4>Capital :{details.capital} </h4></li>
                        <li> <h4>Region :{details.region} </h4></li>
                        <li> <h4>Sub Region :{details.subregion} </h4></li>
                        <li> <h4>Democratic :{details.name.official} </h4></li>
                        <li> <h4>About Flag: {details.flags.alt}</h4></li>
                        <li> <h4>Area :{details.area} </h4></li>
                        <li> <h4>population :{details.population} </h4></li>
                        <li> <h4>Time Zone :{details.timezones} </h4></li>
                        <li> <h4>Start Of Week :{details.startOfWeek} </h4></li>
                        <li><h4>Languages :</h4></li>
                        {Object.values(details.languages).map(value => {
                            return (
                            <div key={value}>                               
                                <h4>{value}</h4>
                            </div>);

                        })}                       
                        <li><h4>Currencies :</h4></li>
                        {Object.values(details.currencies).map(value => {
                            return (
                            <div key={value}>                               
                                <h4>{value.name}</h4>
                                <h4>{value.symbol}</h4>
                            </div>);

                        })}

                    </ul>

                </div>

            )}



        </div>
    )
}