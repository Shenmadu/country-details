import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



export default function Home() {
    const [country, setCountry] = useState("Sri Lanka");
    const [details, setDetails] = useState([]);


    function search() {
        const searchCountry = document.getElementById("search-txt").value;
        setCountry(searchCountry);
    }


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                        const countryName = response.data.countryName;
                        setCountry(countryName);
                    } catch (error) {
                        console.error('Error fetching country data:', error);
                    }
                },
                error => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported');
        }
    }, []);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            .then((res) => {
                console.log(res.data);
                setDetails(res.data);
            })
            .catch(error => {
                console.error('Error fetching country details:', error);
            });

    }, [country])


    return (
        <div className="container  mt-5 bg-cyan-50">
            <div className="col-4 py-5 mx-auto">
                <div className="d-flex" role="search">
                    <TextField id="search-txt" className="form-control me-2" label="Standard" variant="standard" />
                    <Button variant="outlined" onClick={search}>Search</Button>
                </div>
            </div>
            {details && details.map(details =>
                <div className="container" key={details}>
                    <h3 className="text-orange-400 text-center">{details.name.common}</h3>
                    <div className="row  justify-content-center">
                        <div className="col-lg-4 col-md-10  col-sm-10 mx-auto  ">
                            <Card sx={{ maxWidth: 400 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={details.flags.png}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {details.name.common} Flag
                                        </Typography>
                                        <Typography variant="body2" className="text-stone-950">
                                            {details.flags.alt}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div className="col-lg-4 col-md-10 col-sm-auto ">
                            <img className="max-w-32 " src={details.coatOfArms.png} alt=".." />
                        </div>

                    </div>
                    <div className="col-8 mx-auto">
                        <ul className="font-sans mt-3 ">
                            <li> <h4 >Country Name : <span className="text-black ">{details.name.common} </span> </h4></li>
                            <li> <h4 >Capital :{details.capital} </h4></li>
                            <li> <h4>Region :{details.region} </h4></li>
                            <li> <h4>Sub Region :{details.subregion} </h4></li>
                            <li> <h4>Democratic :{details.name.official} </h4></li>
                            <li> <h4>Area :{details.area}</h4></li>
                            <li> <h4>population :{details.population} </h4></li>
                            <li> <h4>Idd :{details.idd.root}{details.idd.suffixes} </h4></li>
                            <li> <h4>Time Zone :{details.timezones} </h4></li>
                            <li> <h4>Start Of Week :{details.startOfWeek} </h4></li>
                            <li><h4>Languages :</h4></li>
                            {Object.values(details.languages).map(value => {
                                return (
                                    <div key={value}>
                                        <li className="list-disc list-inside text-lg font-semibold">{value}</li>
                                    </div>);

                            })}
                            <li><h4>Currencies :</h4></li>
                            {Object.values(details.currencies).map(value => {
                                return (
                                    <div key={value}>
                                        <li className="list-disc list-inside text-lg font-semibold">{value.name}</li>
                                        <li className=" list-inside text-lg font-semibold">{value.symbol}</li>

                                    </div>);

                            })}

                        </ul>
                    </div>

                </div>
            )}
        </div>
    )
}