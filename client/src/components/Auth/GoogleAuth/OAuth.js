import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import jwt_decode from 'jwt-decode'

const OAuth = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const googleSuccess = async (res) => {
        console.log(res.credential)

        const profile = jwt_decode(res.credential)
        const token = res.credential

        try {
            dispatch({ type: 'AUTH', data: {profile, token} })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googlefailure = (error) => {
        console.log(error)
        console.log('Google Sign In was unsuccessful. Try Again later')
    }
    
    return (
        <GoogleLogin
            onSuccess={googleSuccess}
            onError={googlefailure}
            type = 'standard'
            theme = 'filled_blue'
            size = 'large'
            width = '380'
        />
    )
}

export default OAuth