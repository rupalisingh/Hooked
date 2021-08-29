import React, { useState, useContext } from 'react'
import { Fade, MenuItem, Menu, AppBar, makeStyles, Toolbar, Avatar, createTheme, ThemeProvider } from '@material-ui/core';
import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
import { teal } from '@material-ui/core/colors';
import { UploadFile } from './UploadFile';
import { AuthContext } from '../Context/AuthProvider'
import { useHistory } from 'react-router-dom';
import Profile from './Profile'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignContent: 'center',
        // border: '1px solid red',
        width: 200,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: '50%',

    },

    text: {
        marginLeft: '5%',
        fontFamily: 'cursive',
        '& > *': {
            fontWeight: 'bold',
            fontSize: 100,
        }
    },

    fileloader: {
        marginTop: 70,
        position: 'relative',
        zIndex: 100,
    },
})


function Header(props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const {Logout} = useContext(AuthContext)
    const history = useHistory()

    const theme = createTheme({
        palette: {
            primary: {
                main: teal[500],
            },
        },
    });

    const onchange = (e) => {
        const file = e.target.files[0]
        setLoading(true)
        // console.log(loading)
        UploadFile(props, file)
    }

    const OpenMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const UserLogout = async (e) => {
        e.preventDefault()
        await Logout()
        history.push('/')
    }

    const GotoProfile = (e) => {
        e.preventDefault()
        history.push('/YourProfile')
    }
    // console.log(props)

    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <h1 className={classes.text} onClick = {() => history.push('/UsersFeed')} style = {{cursor : "pointer"}}>Hooked.</h1>
                    <div className={classes.root}>
                        <input
                            accept="video/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            onChange={onchange}
                        />
                        <label htmlFor='contained-button-file'>
                            <VideoCallRoundedIcon fontSize='large' />
                        </label>
                        <Avatar src={props.userData.profileURL} aria-controls="fade-menu" aria-haspopup="true" onClick={OpenMenu} />
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={GotoProfile}>Profile</MenuItem>
                            <MenuItem onClick={UserLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
