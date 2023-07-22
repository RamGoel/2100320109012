import axios from 'axios'
import { useState, useEffect } from 'react';
import { isTimeBehindCurrent } from './utils';
import { creds } from './cred';

export default function TrainCard({ trainObject, handler }) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    console.log(trainObject)
    useEffect(e => {
        setLoading(true)
        axios.post('http://20.244.56.144/train/auth', {
            "companyName": "Ram Trains",
            "ownerName": "Ram Goel",
            "rollNo": "2100",
            "ownerEmail": "ram.21b0103003@abes.ac.in",
            "clientId": creds.clientID,
            "clientSecret": creds.clientSecret
        }).then(res => {
            const config = {
                headers: { Authorization: `Bearer ${res.data?.access_token}` }
            };
            axios.get(`http://20.244.56.144:80/train/trains/${trainObject.trainNumber}`, config).then(response => {
                setData(response.data)
                console.log(response.data)
                setLoading(false)
            }).catch(err => {
                console.log(err.response.data)
                setLoading(false)
            })
        }).catch(err => {
            console.log(err.response.data)
            setLoading(false)

        })
    }, [])

    if (isLoading) {
        return <p>Loading....</p>
    }

    return <div className='m-0'>
        <div className="header bg-dark py-4 px-3">

            <button className="btn btn-warning" onClick={handler}>Go Back</button>
        </div>
        <div className='p-4'>
            <h1 className="py-2 mx-2">{data?.trainName}</h1>
            <p className="mx-2 my-1">
                {data?.trainNumber} | 
                {
                    isTimeBehindCurrent(
                        `${data?.departureTime.Hours}:${data?.departureTime.Minutes}:${data?.departureTime.Seconds}`)
                        ? <span className='text-danger'> {`Departed on ${data?.departureTime.Hours}:${data?.departureTime.Minutes}:${data?.departureTime.Seconds}`}</span>
                        : <span className='text-success'> {`Departing on ${data?.departureTime.Hours}:${data?.departureTime.Minutes}:${data?.departureTime.Seconds}`}</span>
                }
            </p>
            <p className="mx-2 my-1"> Delayed by - {`${data.delayedBy} minutes`}</p>

            <table className="table mr-auto w-50">
                <tr>
                    <td className="col text-left border px-2">Name</td>
                    <td className="col text-left border px-2">Seats Available</td>
                    <td className="col text-left border px-2">Price</td>
                </tr>
                <tr>
                    <td className='text-left border px-2 py-2'>Sleeper</td>
                    <td className='text-left border px-2 py-2'>{data?.seatsAvailable.sleeper}</td>
                    <td className='text-left border px-2 py-2'>{data?.price.sleeper}</td>
                </tr>
                <tr>
                    <td className='text-left border px-2 py-2'>AC</td>
                    <td className='text-left border px-2 py-2'>{data?.seatsAvailable.AC}</td>
                    <td className='text-left border px-2 py-2'>{data?.price.AC}</td>
                </tr>
            </table>

        </div>
    </div>
}