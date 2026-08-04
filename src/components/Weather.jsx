import React, { useEffect, useRef, useState } from 'react'
import sunIcon from '../assets/sun.png'
import searchIcon from '../assets/loupe.png'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'
import sunnyIcon from '../assets/sunny.png'
import snowyIcon from '../assets/snowy.png'
import rainIcon from '../assets/rain.png'
import drizzleIcon from '../assets/cloudy.png'


const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const ref = useRef();
    const allIcon ={
        "01d": sunIcon,
        "01n": sunIcon,
        "02d": sunnyIcon,
        "02n": sunnyIcon,
        "03d": sunnyIcon,
        "03n": sunnyIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowyIcon,
        "13n": snowyIcon,
    }

    async function getData(city) {
        if(city === ''){
            alert("Please enter the City name")
            return;
        }
        const apiKey = import.meta.env.VITE_API_KEY.trim();
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            
            const response = await fetch(url);  
            const data = await response.json();
            
            if(!response.ok){
                alert('Please enter the correct city name');
                return;
            }

            const icon = allIcon[data.weather[0].icon] || sunnyIcon;
            setWeatherData({
                temp: data.main.temp,
                humidity: data.main.humidity,
                location: data.name,
                windSpeed: data.wind.speed,
                icon: icon,
            });
            console.log(data)
        } catch (error) {
            
        }
        
    }
    useEffect(()=>{
        getData("Delhi");
    },[]);

    const handleKeyDown = (e)=>{
        if(e.key === "Enter"){
            getData(ref.current.value);
            ref.current.value = '';
        }
    }

  return (
    <div className='relative bg-zinc-600 w-full h-screen flex justify-center items-center'>
        <div className="container bg-zinc-700 w-100 h-120 rounded-2xl p-10 flex flex-col items-center">
            <div className='w-full flex items-center gap-3'>
                <input ref={ref} className='bg-zinc-400 border-0 outline-0 pl-2 rounded-md h-8 text-zinc-800 w-70 ' type="text" placeholder='Enter City' onKeyDown={handleKeyDown}/>
                <img src={searchIcon} alt="search icon" className='h-8 w-8 cursor-pointer' onClick={()=>{getData(ref.current.value);
                  ref.current.value = ''}} />
            </div>
            {weatherData?<>
                <img className='h-30 w-30 mt-10' src={weatherData.icon} alt="weather image" />
                <h3 className='text-6xl text-zinc-300 mt-8 font-medium leading-none'>{weatherData.temp}°c</h3>
                <h3 className='text-3xl text-zinc-300 font-medium mt-1'>{weatherData.location}</h3>

                <div className="weather-data flex w-full justify-between mt-5">
                    <div className='flex'>
                        <img className='h-10' src={humidityIcon} alt="image" />
                        <div className='flex flex-col text-zinc-300 font-semibold justify-center gap-1'>
                            <p className='leading-none'>{weatherData.humidity}%</p>
                            <span className='leading-none'>Humidity</span>
                        </div>
                    </div>

                    <div className='flex gap-1'>
                        <img className='h-10' src={windIcon} alt="image" />
                        <div className='flex flex-col text-zinc-300 font-semibold justify-center leading-none gap-1'>
                            <p>{weatherData.windSpeed}Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </>:<></>}
        </div>
    </div>
  )
}

export default Weather