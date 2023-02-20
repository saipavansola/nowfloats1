import React,{Component} from "react"
import {RiCelsiusLine} from 'react-icons/ri'
import {ImLocation2} from 'react-icons/im'
import "./index.css"

class Weather extends Component {
  state={
    searchInput:"hyderabad",
    city:"",
    weather:''
  }
 
  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    const ApiKey="1adfdd8f7e8a5a4159e0d8aa8bda9cc3"
    const {searchInput}=this.state

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${ApiKey}`;
    const response = await fetch(apiUrl);
    if (response.ok === true) {
      const fetchedData = await response.json();
          const tempData=fetchedData.main
          
          const weatherData=fetchedData.weather[0].description
          console.log(tempData)
          console.log(weatherData)
          this.setState({city:tempData})
          this.setState({weather:weatherData})
    }
  };
 

  async componentDidUpdate (_,prevState)  {
    const ApiKey="1adfdd8f7e8a5a4159e0d8aa8bda9cc3"
    const {searchInput}=this.state

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${ApiKey}`;
    if(searchInput!== prevState.searchInput){
      try{
        const response = await fetch(apiUrl); 
        if (response.ok === true) {
          const fetchedData = await response.json();
          const tempData=fetchedData.main
          const weatherData=fetchedData.weather[0].description
          console.log(tempData)
          console.log(weatherData)
          this.setState({city:tempData})
          this.setState({weather:weatherData})
        }
      }catch(error){
        console.log(error)
      }
    }
    };

  onChangeName=(e)=>{
    this.setState({searchInput:e.target.value})
  }

  render(){
    const {searchInput,city,weather}=this.state
    return (
      <div className="bg-con">
      <input type="search"  value={searchInput} onChange={this.onChangeName} />

      {searchInput.length===0 ? (<p>search for city</p>) : ""}
      
      {
        !city ? (<p>City Not Found</p>) :
        (
        <div className="inner-con">
          <h2>Weather report</h2>
        <p><ImLocation2 />City: <span className="data">{searchInput}</span></p>
        <p>Current temperature :<span className="data">{city.temp}</span> <RiCelsiusLine className="temp-icon" /></p>
        <p>Current weather :<span className="data">{weather}</span></p>
        <p>max-temp :<span className="data">{city.temp_max}</span> <RiCelsiusLine /> | min-temp:<span className="data">{city.temp_min}</span> <RiCelsiusLine /></p>
      </div>
        )
      }

     
      </div>
      )
  }
}

export default Weather