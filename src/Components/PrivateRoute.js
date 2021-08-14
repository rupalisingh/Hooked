import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to='/Signup' />
        }}/>
    )
}

export default PrivateRoute
