import React, { useState, useContext, useEffect } from 'react'
import {  Paper,Avatar, CircularProgress, makeStyles } from '@material-ui/core'
import { AuthContext } from '../Context/AuthProvider'
import "./Profile.css"
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider, useTheme } from "@material-ui/core/styles";
import { database } from '../firebase';

import Header from './Header'
import { fontSize } from '@material-ui/system';
const useStyles = makeStyles({
    loader: {
        marginTop: '50vh',
        marginLeft: '50vw',
        color: '#008080'
    },
    username : {
        fontFamily : "cursive",
        fontWeight : 600,
        fontSize : "27px",
    },

    Bio : {
        fontFamily : "cursive",
        fontSize : "20px",
        textAlign : "right",
    }

})


function Profile() {
    const theme = useTheme();
    const classes = useStyles()
    const SizedAvatar = styled(Avatar)`
    ${({ size, theme }) => `
      width: ${theme.spacing(size)}px; 
      height: ${theme.spacing(size)}px; 
    `};
  `;

    const [loading, setLoading] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [ProfileuserData, setProfileUerData] = useState(null)

    useEffect (() => {
        database.users.doc(currentUser.uid).get().then ((doc) => {
            let res = doc.data()
            setProfileUerData(res)
            console.log(ProfileuserData)
        })
    },[ProfileuserData])

    return (
        <>
            {
                ProfileuserData === null ? <CircularProgress className={classes.loader} />
                    : <>
                    <Header userData = {ProfileuserData}/>
                    <Paper elevation = {5}>
                        <div className="ProfileInfo">
                            <ThemeProvider theme={theme}>
                                <SizedAvatar size={20} src = {ProfileuserData.profileURL} />
                            </ThemeProvider>
                            <div className="text-details">
                                <p className = {classes.username} >{ProfileuserData.username}</p>
                                <p className = {classes.Bio}>Bio</p>
                            </div>

                        </div>
                        <div className="Allposts">

                        </div>
                        </Paper>
                    </>
            }
        </>
    )
}

export default Profile
