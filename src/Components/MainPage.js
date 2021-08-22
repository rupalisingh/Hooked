import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { Backdrop, Modal, Fade, Paper, makeStyles, TextField, createTheme, ThemeProvider} from '@material-ui/core'
import { teal } from '@material-ui/core/colors';
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
import { AuthContext } from '../Context/AuthProvider';
import { database } from '../firebase';


const styles = makeStyles({

    container: {
        background: " #00e6b8",
        marginTop: 60,
        height: '50vh',
        width: '100%',
    },

    signin: {
        height: '40vh',
        width: '35%',
        margin: '0 auto',
        marginTop: '11rem',
        marginLeft: '65px',
        position: 'absolute',
        zIndex: 100,
    },
    credentials: {
        '& > * ': {
            margin: '0 auto',
            marginTop: '30px',
            width: '85%',
            marginLeft: '5%',
        }
    },

    Login: {
        marginTop: '20px',
        margin: '0 auto',
        display: 'flex',
        background: '#00796b',
        borderRadius: 20,

    },

    Signup: {
        margin: '0 auto',
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',

        '& > *': {
            height: '10px',
            marginTop: '5px',
            color: "#00796b",

        }
    },

    Modal: {
        height: 300,
        width: 400,
        position: 'absolute',
        marginLeft: '40%',
        marginTop: '10%',

    },

    HookedText: {
        marginLeft: '5%',
        fontFamily: 'cursive',
        '& > *': {
            fontWeight: 'bold',
            fontSize: 100,
        }

    },


})

function MainPage() {
    let history = useHistory()
    const classes = styles()
    const [Open, setOpen] = useState(false)
    const theme = createTheme({
        palette: {
            primary: {
                main: teal[500],
            },
        },
    });

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { Signup, currentUser, Login } = useContext(AuthContext)

    const OpenSignup = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const UserSignup = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let res = await Signup(Email, Password)
            const uid = res.user.uid
            console.log(uid)
            await database.users.doc(uid).set({
                email: Email,
                userId: uid,
                username: username,
                createdAt: database.getCurrentTimestamp(),
                profileURL: '',
                postIds: []
            })
            setLoading(false)
            history.push('/SetProfile')
        }

        catch (err) {
            setError(err)
            setTimeout(() => setError(''), 2000)
            setLoading(false)
        }
    };

    const UserLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await Login(Email, Password)
            // console.log(logres)
            history.push('/UsersFeed')
        }

        catch (err) {
            setError(err)
            setTimeout(() => setError(''), 2000)
            setLoading(false)
        }
    }


    const FadeInUpAnimation = keyframes`${fadeInUp}`;
    const FadeInUpDiv = styled.div`animation: infinite 5s ${FadeInUpAnimation}`;

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [])

    return (
        <>
            <div className={classes.container}>
                <div className='col-4'>
                    <Paper className={classes.signin} elevation={3}>
                        <div className='col-12'>
                            <form className={classes.credentials} noValidate autoComplete="on">
                                <ThemeProvider theme={theme}>
                                    <TextField onChange={(e) => setEmail(e.target.value)}
                                        id="Email"
                                        label="Email id"
                                        color="primary"
                                    />
                                </ThemeProvider>
                            </form>
                        </div>
                        <div className='col-12'>
                            <form className={classes.credentials} noValidate autoComplete="on">
                                <ThemeProvider theme={theme}>
                                    <TextField onChange={(e) => setPassword(e.target.value)}
                                        id="Password"
                                        label="Password"
                                        color="primary"
                                    />
                                </ThemeProvider>

                            </form>
                        </div>
                        <div className='col-12'>
                            <ThemeProvider theme={theme}>
                                <Button className={classes.Login} variant="contained" color="primary" onClick={UserLogin} >
                                    Login
                                </Button>
                            </ThemeProvider>

                        </div>
                        <div className='col-11'>
                            <h6 className={classes.Signup}>Not Registered yet?<Button color="primary" onClick={OpenSignup} >Sign up</Button>
                            </h6>
                        </div>
                    </Paper>
                </div>
                {
                    Open == true ? < Modal
                        aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={Open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    ><Fade in={Open}>
                            <Paper className={classes.Modal} elevation={4}>
                                <div className='col-12'>
                                    <form className={classes.credentials} noValidate autoComplete="on">
                                        <ThemeProvider theme={theme}>
                                            <TextField onChange={(e) => { setUsername(e.target.value) }}
                                                id="username"
                                                label="Username"
                                                color="primary"
                                            />
                                        </ThemeProvider>
                                    </form>
                                </div>
                                <div className='col-12'>
                                    <form className={classes.credentials} noValidate autoComplete="on">
                                        <ThemeProvider theme={theme}>
                                            <TextField onChange={(e) => { setEmail(e.target.value) }}
                                                id="Email"
                                                label="Email id"
                                                color="primary"
                                            />
                                        </ThemeProvider>

                                    </form>
                                </div>
                                <div className='col-12'>
                                    <form className={classes.credentials} noValidate autoComplete="on">
                                        <ThemeProvider theme={theme}>
                                            <TextField onChange={(e) => { setPassword(e.target.value) }}
                                                id="setPassword"
                                                label="Set Password"
                                                color="primary"
                                            />
                                        </ThemeProvider>

                                    </form>
                                </div>
                                <div className='col-12'>
                                    <ThemeProvider theme={theme}>
                                        <Button className={classes.Login} variant="contained" color="primary" onClick={UserSignup}>
                                            Signup
                                        </Button>
                                    </ThemeProvider>

                                </div>
                            </Paper>
                        </Fade>
                    </Modal>
                        : <div>

                        </div>
                }
                <FadeInUpDiv className={classes.HookedText}>
                    <h1>Hooked.</h1>
                </FadeInUpDiv>
            </div>
        </>
    )
}

export default MainPage
