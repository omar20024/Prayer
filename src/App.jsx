import { useEffect, useState } from "react"
import Prayer from "./componant/prayer"
function App() {

  const [prayerTimes , setPrayerTimes] =useState([])
  const [dataTime , setDataTime]=useState("")
  const [city , setCity]=useState("cairo")


  const cities =[
    {name:"القاهره",value:"Cairo"},
    {name:"الاسكندرايه",value:"Alex"},
    {name:"الجيزه",value:"Giza"},
    {name:"المنصوره",value:"Mansoura"},
    {name:"طنطا",value:"Tanta"},
    {name:"السويس",value:"Suez"},
    {name:"الاقصر",value:"Luxor"},
    {name:"اسوان",value:"Aswan"},
    {name:"شرم الشيخ",value:"Sharm El Sheikh"},
    {name:"الغردقه",value:"Hurghada"},
  ]

  
  

  useEffect(()=>{
    
   const fetchPrayerTimes = async()=>{
    try{

      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`)
      const data_Prayer = await response.json()

      setPrayerTimes(data_Prayer.data.timings)

      setDataTime(data_Prayer.data.date.gregorian.date)

      
      console.log(data_Prayer.data.date.gregorian.date)


    }catch(error){
      console.error("Error fetching prayer times:",error);
    }  
      
  }
    fetchPrayerTimes();

  },[city])

  

  const formatTime = (time) => {
    if (!time){
       return "00:00";
    }
    let [hours , minutes] = time.split(":").map(Number)
    const perd = hours >=12 ? "PM" : "AM"; 
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0"+ minutes : minutes} ${perd}`;
  }



  return (
    
    <section>
      <div className="container">

        <div className="top-sec">

          <div className="city">
            <h3>المدينه</h3>

            <select name="" id="" onChange={(e)=>setCity(e.target.value)}>
              {cities.map((city_Obj)=>(
                <option key={city_Obj.value}  value={city_Obj.value}>{city_Obj.name}</option>
              ))}
            </select>
          </div>

          <div className="data">
            <h3>التاريخ</h3>
            <h4>{dataTime}</h4>
          </div>

        </div>
        <Prayer name="الفجر" time={formatTime( prayerTimes.Fajr)}/>
        <Prayer name="الظهر" time={formatTime( prayerTimes.Dhuhr)}/>
        <Prayer name="العصر" time={formatTime( prayerTimes.Asr)}/>
        <Prayer name="المغرب" time={formatTime( prayerTimes.Maghrib)}/>
        <Prayer name="العشاء" time={formatTime( prayerTimes.Isha)}/>

      </div>
    </section>
    
  )
}

export default App
