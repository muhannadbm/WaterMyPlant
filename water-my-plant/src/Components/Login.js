import React from 'react'
export default function Login(props) {
const {formvalues,change,submit,disabled,errors} = props
return(
    <div className="container" onSubmit={(e)=>submit(e)}>
        <h2>Login Page</h2>
        <form>
            <label> Username*:
            <input name ="username" type="text" value={formvalues.username} onChange={(e)=>change(e)}></input> 
            <p>{errors.username}</p>
            </label>
            
            <label>Password*:
                <input name="password" type="password" value={formvalues.password} onChange={(e)=>change(e)}></input>
                <p>{errors.password}</p>
                </label>
            <button disabled={disabled}>Submit</button>
        </form>
    </div>
)
}