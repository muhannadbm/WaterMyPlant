import React, {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';
import styled from 'styled-components'
import plantschema from '../validation/addplantSchema'

const Styledlist = styled.div`
h2 {
  background: ${props => props.theme.titlesbg};
padding: 1rem;
color: white;
border-radius: 50% 50% 0% 0%;
width: 100%;
}
p {
  background: ${props => props.theme.pbg};
  padding: 3rem 1rem;
  color: white;
  font-weight: bold;
  box-shadow: 10px 5px 5px #b1b08e;
  border-radius: 40%;
}
`
const Styledform = styled.form`
  display: flex;
  margin-bottom: 7rem;
  flex-direction: column;
  border: solid white;
  border-radius: 20%;
  padding: 3.5rem 11rem;
  background: white;
  color: #9dc738;
  font-weight: bold;
  box-shadow: 10px 5px 5px #aeaeae;
  border: solid 1px #c6bebe;

button{
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: white;
  border-color: #ccbdd5;
  border-radius: 50%;
}
p {
  background: #ffe0e3;
padding: 0.7rem;
border-left: solid 0.6rem #ff4858;
color: #ff5a69;
font-weight: bold;
}
p:empty{
display: none;
}
`
const EditPlant = (props) => {
    const [plant, setPlant] = useState(null)
    const {push} = useHistory()
    const {id} = useParams()
    const { editplanterrors,validate} = props
    const [Disabled,setDisabled] = useState(true)
    //useEffect for initial load for plant data--GET
    useEffect(() => {
        axiosWithAuth()
            // .get(`/api/plants/${id}`)
            .get(`https://wmp-api.herokuapp.com/api/plants/${id}`)  
            .then(res => {
                setPlant(res.data)
            })
            .catch(err => {
                console.log("GET ERR AXIOX", err)
            })
    }, [])

    useEffect(() => {

    plantschema.isValid(plant).then(valid => setDisabled(!valid)) 
        
      }, [plant])
    //changeHandler
    const changeHandler = e => {
        e.preventDefault()
        validate(e.target.name,e.target.value)
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
                push('/dashboard')
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
                <Styledlist>
                <h2>Edit Plant</h2>

                <p>Fill out the updated information</p>
                    <Styledform onSubmit={saveItem}>
                    <p className="alert">{editplanterrors.speciesID}</p>
                    <label htmlFor="speciesId" />Species*
                    <select
                        id="speciesId"
                        type="number"
                        name="speciesID"
                        placeholder="speciesId"
                        value={plant.speciesID}
                        onChange={changeHandler}>
                    <option value="" >--Pick a Species--</option>
                    <option  value="Garlic mustard" >Garlic mustard</option>
                    <option value="Common fig" >Common fig</option>
                    <option value="Maize" >Maize</option>
                    <option value="Purple loosestrife" >Purple loosestrife</option>
                    <option value="Common ivy" >Common ivy</option>
                    <option value="Norway maple" >Norway maple</option>
                    <option value="Autumn olive" >Autumn olive</option>
                    </select>
                    <p className="alert">{editplanterrors.h2oInterval}</p>
                    <label htmlFor="h2oInterval" /> H2OInterval(hours)*
                    <select id="h2oInterval"
                        type="number"
                        name="h2oInterval"
                        placeholder="h2oInterval"
                        value={plant.h2oInterval}
                        onChange={changeHandler}>
                    <option value="1" >Once every hour</option>
                    <option value="2" >Once every 2 hours</option>
                    <option value="3" >Once every 3 hours</option>
                    <option value="4" >Once every 4 hours</option>
                    </select>
                    <p className="alert">{editplanterrors.h2oAmount}</p>
                    <label htmlFor='h2oAmount' />H2OAmount*
                    <select id="h2oAmount"
                        type="text"
                        name="h2oAmount"
                        placeholder="h2oAmount"
                        value={plant.h2oAmount}
                        onChange={changeHandler}>
                        <option>1 Litre</option>
                        <option>2 Litre</option>
                        <option>3 Litre</option>
                        <option>4 Litre</option>
                    </select>
                    <p className="alert">{editplanterrors.nickname}</p>
                    <label htmlFor="nickname" />Nickname
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="nickname"
                        value={plant.nickname}
                        onChange={changeHandler}
                    />
                    <button  disabled={Disabled} type='submit'>Save</button>
                    </Styledform>
                </Styledlist>
        </div>
    )
}
export default EditPlant