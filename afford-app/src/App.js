import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { creds } from './cred';
import ViewTrains from './ViewTrains';
import TrainCard from './TrainCard';
function App() {
    const [trains, setTrains] = useState([])
    const [isShow, setShow] = useState(false)
    const [selectedTrain, setTrain] = useState(null)

    useEffect(e => {

        axios.post('http://20.244.56.144/train/auth', {
            "companyName": "Ram Trains",
            "ownerName": "Ram Goel",
            "rollNo": "2100",
            "ownerEmail": "ram.21b0103003@abes.ac.in",
            "clientId": creds.clientID,
            "clientSecret":creds.clientSecret
        }).then(res => {
            const config = {
                headers: { Authorization: `Bearer ${res.data.access_token}` }
            };
            axios.get('http://20.244.56.144:80/train/trains', config).then(response => {
                setTrains(response.data)
                console.log(response.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        }).catch(err => {
            console.log(err.response.data)
        })

    }, [])

    return (
        <div>
            {!isShow ? <ViewTrains data={trains} handler={(val) => {
                setTrain(val)
                setShow(1)
            }} /> : <TrainCard trainObject={selectedTrain} handler={()=>setShow(false)} />}
        </div>
    )
}

export default App