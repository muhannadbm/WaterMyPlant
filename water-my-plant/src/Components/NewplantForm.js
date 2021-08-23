import React, {useEffect, useState} from "react"
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';
import { useHistory } from 'react-router-dom';
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
}`

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
.alert{
    background: #ffe0e3;
padding: 0.7rem;
border-left: solid 0.6rem #ff4858;
color: #ff5a69;
font-weight: bold;
}


`
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
    const {trigger,setTrigger, addplanterrors,validate} = props
    const [Disabled,setDisabled] = useState(true)
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
                console.log('err: ', err.response.data['message'])
            })

            history.push('./dashboard')
    }
    const changeHandler= (e) => {
        // e.preventDefault()
        setNewPlant({...newPlant, [e.target.name]: e.target.value})
        validate(e.target.name,e.target.value)
    }

    useEffect(() => {

        plantschema.isValid(newPlant).then(valid => setDisabled(!valid)) 
            
          }, [newPlant])
    return (

        <div className='container'>
      
            <div className='list_div'>
                <Styledlist>
                <h2>Add Plant</h2>
                <p>Fill out your plant's information</p>
                <Styledform  onSubmit={submitHandler}>
                    <p className="alert">{addplanterrors.speciesID}</p>
                    <label htmlFor="speciesId" />Species*
                    <select
                        id="speciesId"
                        type="text"
                        name="speciesID"
                        placeholder="speciesId"
                        value={newPlant.speciesID}
                        onChange={changeHandler}>
                    <option value="" >--Pick a Species--</option>
                    <option value="Garlic mustard" >Garlic mustard</option>
                    <option value="Common fig" >Common fig</option>
                    <option value="Maize3" >Maize</option>
                    <option value="Purple loosestrife4" >Purple loosestrife</option>
                    <option value="Common ivy" >Common ivy</option>
                    <option value="Norway maple" >Norway maple</option>
                    <option value="Autumn olive" >Autumn olive</option>
                    </select>
                    <p className="alert">{addplanterrors.h2oInterval}</p>
                    <label htmlFor="h2oInterval" /> H2OInterval(hours)*
                    <select id="h2oInterval"
                        type="number"
                        name="h2oInterval"
                        placeholder="h2oInterval"
                        value={newPlant.h2oInterval}
                        onChange={changeHandler}>
                    <option value="" >--Pick Interval--</option>        
                    <option value="1" >Once every hour</option>
                    <option value="2" >Once every 2 hours</option>
                    <option value="3" >Once every 3 hours</option>
                    <option value="4" >Once every 4 hours</option>
                    </select>
                    <p className="alert">{addplanterrors.h2oAmount}</p>
                    <label htmlFor='h2oAmount' />H2OAmount*
                    <select id="h2oAmount"
                        type="text"
                        name="h2oAmount"
                        placeholder="h2oAmount"
                        value={newPlant.h2oAmount}
                        onChange={changeHandler}>
                        <option value="" >--Pick Amount--</option>  
                        <option>1 Litre</option>
                        <option>2 Litre</option>
                        <option>3 Litre</option>
                        <option>4 Litre</option>
                    </select>
                    <p className="alert">{addplanterrors.nickname}</p>
                    <label htmlFor="nickname" />Nickname
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="nickname"
                        value={newPlant.nickname}
                        onChange={changeHandler}
                    />
                    <button disabled={Disabled} type='submit'>Save</button>
            </Styledform>
            </Styledlist>
            </div>
            
        </div>
    )
}
export default AddNewPlantForm