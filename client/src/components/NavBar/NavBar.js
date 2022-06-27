import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import useStyles from './styles'
import moments from '../../images/Moment.png'
import momentsText from '../../images/MomentText.jpg'

const NavBar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(() =>{
        const token = user?.token
        
        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>
                <img src={momentsText} alt="icon" height='60px'/>
                <img className={classes.image} src = {moments} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt= {user.profile.name} src={user.profile.picture}>{user.profile.name.charAt[0]}</Avatar>
                        <Typography className={classes.userName} variant = 'h6'>{user.profile.name}</Typography>
                        <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar