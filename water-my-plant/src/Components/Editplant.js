import React, {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';
const EditPlant = (props) => {
    const [plant, setPlant] = useState(null)
    const {push} = useHistory()
    const {id} = useParams()
    const {trigger,setTrigger} = props
    console.log(plant)
    //useEffect for initial load for plant data--GET
    useEffect(() => {
        axiosWithAuth()
            // .get(`/api/plants/${id}`)
            .get('https://wmp-api.herokuapp.com/api/plants/1627405736450')  
            .then(res => {
                setPlant(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log("GET ERR AXIOX", err)
            })
    }, [])
    //changeHandler
    const changeHandler = e => {
        e.preventDefault()
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        })
    }
    //saveItem onSubmit-->PUT
    const saveItem = e => {
        e.preventDefault()
        axiosWithAuth()
            .put(`/api/plants/${id}`, plant) 
            .then(res => {
                setPlant(plant)
                // push(`/homepage`)
            })
            .catch(err => {
                console.log("UPDATE PLANT ERR", err)
            })
    }
    const deletePlant = e => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/api/plants/${id}`)
            .then(res => {
                setPlant(plant)
                // push(`/homepage`)
            })
            .catch(err => {
                console.log("DELETE ERR", err)
            })
    }
    return(
        plant &&
        <div className='container'>
            <div className='list_div'>
                <h2>Edit Plant</h2>
                <p>Fill out the updated information</p>
                <form className='form' onSubmit={saveItem}>
                    <label htmlFor="speciesId" />SpeciesID
                    <input
                        id="speciesId"
                        type="number"
                        name="speciesId"
                        placeholder="speciesId"
                        value={plant.speciesID}
                        onChange={changeHandler}
                    />
                    <label htmlFor="h2oInterval" /> H2OInterval
                    <input
                        id="h2oInterval"
                        type="number"
                        name="h2oInterval"
                        placeholder="h2oInterval"
                        value={plant.h2oInterval}
                        onChange={changeHandler}
                    />
                    <label htmlFor='h2oAmount' />H2OAmount
                    <input
                        id="h2oAmount"
                        type="text"
                        name="h2oAmount"
                        placeholder="h2oAmount"
                        value={plant.h2oAmount}
                        onChange={changeHandler}
                    />
                    <label htmlFor="nickname" />Nickname
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="nickname"
                        value={plant.nickname}
                        onChange={changeHandler}
                    />
                    <button type='submit'>Save</button>
                    <button type='submit' onClick={deletePlant}>Delete</button>
                </form>
            </div>
        </div>
    )
}
export default EditPlant