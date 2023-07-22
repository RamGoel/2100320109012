import React from 'react'
import { isWithin30Minutes } from './utils'
function ViewTrains({data, handler}) {
  return (
    <>
    <h1 className='text-center bg-warning py-2'> All Trains </h1>
    <ol className='d-flex align-items-center justify-content-start flex-wrap bg-light'>
        {
            data.map(e=>{
                if(isWithin30Minutes(`${e?.departureTime.Hours}:${e?.departureTime.Minutes}:${e?.departureTime.Seconds}`)){
                    return;
                }
                return <li className='p-2 bg-dark rounded text-white w-25 mx-4' style={{
                    cursor:'pointer',
                    margin:'10px 0px'
                }} onClick={()=>handler(e)}>{e.trainName} | {e.trainNumber}</li>
            })
        }
    </ol>
    </>
  )
}

export default ViewTrains