import './App.css';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";
import schema from './validation/formSchema'
import axios from 'axios';
import Login from './Components/Login';
import Register from './Components/Register';
import { useState, useEffect } from 'react';
import {reach} from 'yup';
import loginschema from './validation/loginformSchema'
import AddNewPlantForm from './Components/NewplantForm'
import Dashboard from './Components/Dashboard'
import EditPlant  from './Components/Editplant';
import styled from 'styled-components'
import plantschema from './validation/addplantSchema'

const StyledHeader = styled.div`
  display: flex;
  width: 70%;
  margin: auto;
  align-items: center;
  background-color: ${props => props.theme.header};;
  box-shadow: 10px 5px 5px #8e9ab1;
  border-radius: 18%;
  padding: 1rem;
  justify-content: space-around;
  a {
  display: inline;
margin-right: 1rem;
background: ${props => props.theme.headerlinks};
color: white;
  flex: 1 1;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.4rem;
  border: solid;
border-radius: 50%;
padding: 1rem;
box-shadow: 5px 2px 2px #c4f8b4;
border-color: ${props => props.theme.headerlinks};
}
a:hover{
  background-color: #60c260;
  cursor: pointer;
}
img {
  width: 6rem;
}




`



const initialformvalues = {username: '', password: '',phoneNumber: ''}
const initialErrors = {username: '', password: '',phoneNumber: ''}
const initalplantErrors = {speciesID: '', h2oInterval: '', h2oAmount: '',nickname: ''}
function App() {
  const [formvalues,setFormValues] = useState(initialformvalues)
  const [errors, setErrors] = useState(initialErrors)
  const [loginerror,setLoginerror] = useState(null)
  const [registererror,setRegistererror] = useState(null)
  const [logerror, setLogerror] = useState(initialErrors)
  const [disabled, setDisabled] = useState(true)
  const [trigger,setTrigger] = useState(false)
  const [addplanterrors,setAddplanterrors] = useState(initalplantErrors)
  const [editplanterrors,setEditplanterrors] = useState(initalplantErrors)

  let history = useHistory();
  let location = useLocation();

  const validate = (name,value) => {
    if(location.pathname === '/register') {
    reach(schema,name).validate(value).then(()=> setErrors({...errors,[name]:''}))
    .catch(error => setErrors({...errors, [name]: error.errors[0]})) }
    else if(location.pathname === '/add') {
      reach(plantschema,name).validate(value).then(()=> setAddplanterrors({...addplanterrors,[name]:''}))
      .catch(error => setAddplanterrors({...addplanterrors, [name]: error.errors[0]})) }   
    else if(location.pathname === '/login'){
      reach(schema,name).validate(value).then(()=> setLogerror({...logerror,[name]:''}))
      .catch(error => setLogerror({...logerror, [name]: error.errors[0]})) } 
    else
      {
        reach(plantschema,name).validate(value).then(()=> setEditplanterrors({...editplanterrors,[name]:''}))
        .catch(error => setEditplanterrors({...editplanterrors, [name]: error.errors[0]})) }   
    }
  const change = (e)=> {
    const {value,name} = e.target
    setFormValues({...formvalues , [name] : value})
    validate(name,value)
  }

  const login = () => {
    axios.post('https://wmp-api.herokuapp.com/api/auth/login', formvalues).then( res=>{
      setLoginerror('')
      const token = res.data.token;
      localStorage.setItem('token', `"${token}"`);
      history.push('/dashboard')
    }).catch( err => setLoginerror(err.response.data['message']))
  }
  const register = () => {
    axios.post('https://wmp-api.herokuapp.com/api/auth/register', formvalues).then( res=>{
      console.log(res.data)
      const token = res.data.token;
      localStorage.setItem('token', `"${token}"`);
    }).catch( err => {setRegistererror(err.response.data['message'])})
  }

  const submit = (e) => {
    e.preventDefault()
    if(location.pathname === '/register') {
      register()
  }
    else{
      login()

    }
    setFormValues(initialformvalues)
}

useEffect(() => {
  // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
  if(location.pathname === '/register') {
  schema.isValid(formvalues).then(valid => setDisabled(!valid)) }
  else if(location.pathname === '/login'){
    loginschema.isValid(formvalues).then(valid => setDisabled(!valid))
  }
  
}, [formvalues])



const logout = ()=> {
  history.push('/login')
  localStorage.removeItem('token')
}


  return (
    <div className="App">
      <div className="maincontainer">
      <div className="header">
        <StyledHeader>
      <img src="https://www.seekpng.com/png/full/78-788239_cartoon-leaf.png"></img>


      {localStorage.getItem('token') ? <div><Link to="/add">Add Plant</Link> <Link to="/dashboard">Dashboard</Link>    <a onClick={()=> logout()}>Logout</a> </div>: <div><Link to="/login">Login</Link><Link to="/register">Register</Link></div>}

      </StyledHeader>

      <Switch>
        <Route path='/edit/:id'>
      <EditPlant editplanterrors={editplanterrors} trigger ={trigger} setTrigger= {setTrigger} validate = {validate}/>
        </Route>
     {localStorage.getItem('token') ? <div>
     <Route exact path="/add">
        <AddNewPlantForm addplanterrors={addplanterrors} trigger ={trigger} setTrigger= {setTrigger} validate = {validate}/>
        </Route>
       <Route exact path="/dashboard">
        <Dashboard trigger ={trigger} setTrigger= {setTrigger} errors = {logerror} disabled = {disabled} submit = {submit} formvalues = {formvalues} change = {change}></Dashboard>
        </Route> 
        <Redirect  to="/dashboard"/>
        </div> : <div>
        <Route path="/login">
        <Login loginerror={loginerror} errors = {logerror} disabled = {disabled} submit = {submit} formvalues = {formvalues} change = {change}></Login>
        </Route>
        <Route path="/register">
          <Register registererr={registererror} errors = {errors} disabled = {disabled} submit = {submit} formvalues = {formvalues} change = {change}></Register>
        </Route>
        <Redirect to="/login"/>

        </div> }


      </Switch>
      </div>
<footer>
  <p>Copy rights Reserved 2021</p>
</footer>
    </div> </div>
  );
}

export default App;
