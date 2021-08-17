import React, { useState } from 'react'
import { AppBar, makeStyles, Toolbar, Avatar, createTheme, ThemeProvider } from '@material-ui/core';
import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
import { teal } from '@material-ui/core/colors';
import { UploadFile } from './UploadFile';


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
        position : 'relative',
        zIndex : 100,
    },
})


function Header(props) {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)

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
        console.log(loading)
        UploadFile(props, file)
    }


    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <h1 className={classes.text}>Hooked.</h1>
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
                        <Avatar src={props.userData.profileURL} />
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
