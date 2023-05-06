import {useState} from "react";

export default function FrontPage() {
    const [Sourse,setSourse] = useState('');
    const [Destination,setDestination] = useState('');
    const [Date,setDate] = useState('');
    const [data,setData] = useState('')
    const [invalidResponse,setInvalidResponse]= useState(false)

    async function FrontPage(ev) {
      ev.preventDefault();
   const response = await fetch(`https://flightsapi-production.up.railway.app/api/flights/location/?sourse=${Sourse}&destination=${Destination}&date=${Date}`);

   if (response.ok) {
        response.json().then(userInfo => {
            setData(userInfo)
            setInvalidResponse(false)
         });
      }
      else if(response.status===404){
        setInvalidResponse(true)
      } 
    setSourse('')
    setDestination('')
    setDate('')
    }

    return (
        <>
      <div className="box__design">
      <form className="FrontPage" onSubmit={FrontPage}>
        <h1>Flight Price</h1>
        <input type="text"
            placeholder="Sourse"
            value={Sourse}
            onChange={ev => setSourse(ev.target.value)}/>
        <input type="txt"
            placeholder="Destination"
            value={Destination}
            onChange={ev => setDestination(ev.target.value)}/>
        <input type="date"
            value={Date}
            onChange={ev => setDate(ev.target.value)}/>
        <button>Check</button> 
      </form>
      </div>
      {invalidResponse? <div className="box__design">
        <h2>Data Not Found</h2>
      </div>: data?<div className="box__design">
        {data.map(data=>{
            return <h3 key={data.flight}>flight: {data.flight} , Price: {data.price}</h3>
        })}
      </div>:<></>}
      </>
    );
    
  }