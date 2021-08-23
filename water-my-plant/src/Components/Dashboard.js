import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useLocation,
    useHistory
  } from "react-router-dom";

export default function Dashboard(props) { 
    const [plants,setPlants] = useState(null)
    const [waterd,setWater] = useState(null)
    const {trigger,setTrigger} = props
    const history = useHistory()
    // const myfunction = ()=> {
    //     axios.get('https://wmp-api.herokuapp.com/api/plants').then(res => console.log(res.data))
    // }
    useEffect(()=> {
        axiosWithAuth().get('https://wmp-api.herokuapp.com/api/plants').then(res => 
        setPlants(res.data)
        )
        console.log('Inside UseEffect')
    },[waterd,trigger])

    const deletePlant = (e,id) => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/api/plants/${id}`)
            .then(res => {
                // push(`/homepage`)
                console.log('Delete success')
                setPlants([...plants])
                history.push('/dashboard')
                setTrigger(!trigger)
            })
            .catch(err => {
                console.log("DELETE ERR", err)
            })
    }



    
    const water = (id)=> {
        axiosWithAuth().put(`https://wmp-api.herokuapp.com/api/plants/${id}`,{lastWatered: new Date().toString()})
        .then(res =>{ console.log(res.data);
            var myDate = new Date();
            setWater(myDate.toString())})
        .catch(e=> console.log(e)) }
    return(
    <div>   
            <h2>My Plants</h2> 
        <div className="tablecontainer">
        {console.log(plants)}
        <table>
            <tr><th>Species</th><th>Nick name</th><th>H2o Interval</th><th>H2o Amount</th><th>Last Watered</th><th>Date/Time to be watered</th><th>Water</th><th>Edit</th></tr>
            {plants && plants.map(el => {
                return  <tr><td>{el.speciesID}</td><td>{el.nickname}</td><td>{el.h2oInterval}</td><td>{el.h2oAmount}</td><td>{el.lastWatered}</td><td><button onClick={()=>water(el.plantID)}>Water</button><Link to={`/edit/${el.plantID}`}>Edit</Link> <button onClick={(e)=> deletePlant(e,el.plantID)}>Delete</button></td></tr>
            })}
            

        </table> 
    </div>
    </div>
)
}