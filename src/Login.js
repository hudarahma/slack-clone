import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
    const [state, dispatch] = useStateValue();
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user, //push the user into data layer
            });
        })
        .catch((error) => {
            alert(error.message);
        })
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="slack-logo"/>
                <h1>Sign In to the Programmers Channel</h1>
                <p>Programmers.slack.com</p>
                <Button onClick={signIn}>Sing In with Google</Button>
            </div>
        </div>
    )
}

export default Login
