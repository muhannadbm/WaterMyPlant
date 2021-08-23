import React from 'react'
import styled from 'styled-components'

 const Styledform = styled.form`
  display: flex;
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
export default function Login(props) {
const {formvalues,change,submit,disabled,errors,loginerror} = props
return(
    <div className="container" onSubmit={(e)=>submit(e)}>
        <h2>Login Page</h2>

        <Styledform>
        {loginerror ? <p>{loginerror}</p> : null}
            <label> Username*:
            <input name ="username" type="text" value={formvalues.username} onChange={(e)=>change(e)}></input> 
            <p>{errors.username}</p>
            </label>
            
            <label>Password*:
                <input name="password" type="password" value={formvalues.password} onChange={(e)=>change(e)}></input>
                <p>{errors.password}</p>
                </label>
            <button disabled={disabled}>Login <img src="https://mpng.subpng.com/20180203/qyq/kisspng-pink-flowers-clip-art-cartoon-flower-cliparts-5a75a69000aa24.7329708715176597920027.jpg"></img></button>
        </Styledform>
    </div>
)
}