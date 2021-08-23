import React, { useState } from 'react'
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';
import { useHistory } from 'react-router-dom';
const initialValues = {
    speciesID: '',
    h2oInterval: '', 
    h2oAmount: '',
    nickname: '',
    userID: '',
}
const AddNewPlantForm = (props) => {
    const [newPlant, setNewPlant] = useState(initialValues);
    const history = useHistory()
    const {trigger,setTrigger} = props
    const submitHandler = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('api/plants/', newPlant)
            .then(res => {
                // window.location.pathname = `plants/${res.data.plantID}`;
                console.log(res.data)
                setTrigger(!trigger)
            })
            .catch(err => {
                console.log('err: ', err.response)
            })

            history.push('./dashboard')
    }
    const changeHandler= (e) => {
        // e.preventDefault()
        setNewPlant({...newPlant, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
            <div className='list_div'>
                <h2>Please Add Plant</h2>
                <p>Fill out your plant's information</p>
                <form className='form' onSubmit={submitHandler}>
                    <label htmlFor="speciesId" />SpeciesID
                    <input
                        id="speciesId"
                        type="number"
                        name="speciesID"
                        placeholder="speciesId"
                        value={newPlant.speciesID}
                        onChange={changeHandler}
                    />
                    <label htmlFor="h2oInterval" /> H2OInterval
                    <input
                        id="h2oInterval"
                        type="number"
                        name="h2oInterval"
                        placeholder="h2oInterval"
                        value={newPlant.h2oInterval}
                        onChange={changeHandler}
                    />
                    <label htmlFor='h2oAmount' />H2OAmount
                    <input
                        id="h2oAmount"
                        type="text"
                        name="h2oAmount"
                        placeholder="h2oAmount"
                        value={newPlant.h2oAmount}
                        onChange={changeHandler}
                    />
                    <label htmlFor="nickname" />Nickname
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="nickname"
                        value={newPlant.nickname}
                        onChange={changeHandler}
                    />
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}
export default AddNewPlantForm