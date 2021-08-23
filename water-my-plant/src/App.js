
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

const initialformvalues = {username: '', password: '',phoneNumber: ''}
const initialErrors = {username: '', password: '',phoneNumber: ''}
function App() {
  const [formvalues,setFormValues] = useState(initialformvalues)
  const [errors, setErrors] = useState(initialErrors)
  const [logerror, setLogerror] = useState(initialErrors)
  const [disabled, setDisabled] = useState(true)
  const [trigger,setTrigger] = useState(false)
  let history = useHistory();
  let location = useLocation();

  const validate = (name,value) => {
    if(location.pathname === '/register') {
    reach(schema,name).validate(value).then(()=> setErrors({...errors,[name]:''}))
    .catch(error => setErrors({...errors, [name]: error.errors[0]})) }
    else{
      reach(schema,name).validate(value).then(()=> setLogerror({...logerror,[name]:''}))
      .catch(error => setLogerror({...logerror, [name]: error.errors[0]})) }
    }
  const change = (e)=> {
    const {value,name} = e.target
    setFormValues({...formvalues , [name] : value})
    validate(name,value)
  }

  const login = () => {
    axios.post('https://wmp-api.herokuapp.com/api/auth/login', formvalues).then( res=>{
      console.log(res.data)
      const token = res.data.token;
      localStorage.setItem('token', `"${token}"`);
      history.push('/dashboard')
    }).catch( err => {console.log(err)})
  }
  const register = () => {
    axios.post('https://wmp-api.herokuapp.com/api/auth/register', formvalues).then( res=>{
      console.log(res.data)
      const token = res.data.token;
      localStorage.setItem('token', `"${token}"`);
    }).catch( err => {console.log(err)})
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


// useEffect(() => {
//   // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
// setFormValues(initialformvalues)
// console.log(formvalues)
// console.log('use effect tken is working')
// }, [localStorage.getItem('token')])

const logout = ()=> {
  history.push('/login')
  localStorage.removeItem('token')
}


  return (
    <div className="App">
      <div className="header">
      <img src="https://www.seekpng.com/png/full/78-788239_cartoon-leaf.png"></img>


      {localStorage.getItem('token') ? <div><Link to="/add">Add Plant</Link> <Link to="/dashboard">Dashboard</Link>    <a onClick={()=> logout()}>Logout</a> </div>: <div><Link to="/login">Login</Link><Link to="/register">Register</Link></div>}

      </div>

      <Switch>
        <Route path='/edit/:id'>
      <EditPlant trigger ={trigger} setTrigger= {setTrigger}/>
        </Route>
     {localStorage.getItem('token') ? <div>
     <Route exact path="/add">
        <AddNewPlantForm trigger ={trigger} setTrigger= {setTrigger} />
        </Route>
       <Route exact path="/dashboard">
        <Dashboard trigger ={trigger} setTrigger= {setTrigger} errors = {logerror} disabled = {disabled} submit = {submit} formvalues = {formvalues} change = {change}></Dashboard>
        </Route> 
        <Redirect  to="/dashboard"/>
        </div> : <div>
        <Route path="/login">
        <Login errors = {logerror} disabled = {disabled} submit = {submit} formvalues = {formvalues} change = {change}></Login>
        </Route>
        <Route path="/register">
          <Register errors = {errors} disabled = {disabled} submit = {submit} formvalues = {formvalues} change = {change}></Register>
        </Route>
        <Redirect to="/login"/>

        </div> }


      </Switch>

    </div>
  );
}

export default App;
