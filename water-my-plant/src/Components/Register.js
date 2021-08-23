import React from 'react'

export default function Register(props){
    const {formvalues,change,submit, disabled,errors} = props
    return(
        <div className="container" >
            <h2>Registration Page</h2>
        <form onSubmit={submit}>
            <label> Username*:
            <input name ="username" type="text" value={formvalues.username} onChange={(e)=>change(e)}></input> 
            <p>{errors.username}</p></label>
            <label>Password*:
                <input name="password" type="password" value={formvalues.password} onChange={(e)=>change(e)}></input>
                <p>{errors.password}</p>
                </label>
                <label>Phone Number*:
                <input name="phoneNumber" type="text" value={formvalues.phoneNumber} onChange={(e)=>change(e)}></input>
                <p>{errors.phoneNumber}</p>
                </label>
            <button disabled={disabled}>Submit</button>
        </form>
    </div>
    )
}