import { Button, Paper, makeStyles, TextField, createTheme, ThemeProvider } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import React, { useState,  useContext } from 'react'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import { database, storage } from '../firebase'
import { AuthContext } from '../Context/AuthProvider'
import { useHistory } from 'react-router-dom';



const styles = makeStyles({
    root: {
        background: '#00e6b8',
        height: '100vh',
        width: '100hv',
    },
    nextBtn: {

    },

    details: {
        background: 'white',
        height: '60%',
        width: '40%',
        display: 'flex',
        marginLeft: '30%',
        marginTop: '7%',
        position: 'absolute',
    },


    profile: {
        border: '1px solid red',
        height: '100%',
    },
    bio: {
        // border: '1px solid yellow',
        height: '100%',
        marginLeft: 40,
        '& > * ': {
            marginTop: 100,
            width: '85%',
            marginLeft: 5,
            // border: '1px solid red',

        }
    },

    input: {
        display: 'none',
    },

    ImgGrid: {
        height: '80%',
        width: '100%',
        '& > *': {
            height: '80%',
            width: '80%',
            borderRadius: 250,
            marginLeft: 40,
            marginTop: 20,
        }
    }
})


function SetProfile() {
    const classes = styles()
    const history = useHistory()
    const theme = createTheme({
        palette: {
            primary: {
                main: teal[500],
            },
        },
    });

    const[ProfilePic, setProfilePic] = useState(null)
    const [ViewFile, SetViewFile] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [Error, setError] = useState('')

    const viewPic = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const Preview = URL.createObjectURL(file)
        SetViewFile(Preview)
        setProfilePic(file)
        console.log(file)
    };
    
    const submitProfile = async (e) => {
        e.preventDefault()
        const uploadTaskListener = storage.ref(`/users/${currentUser.uid}/ProfileImage`).put(ProfilePic)
        uploadTaskListener.on('state_changed', progress, fail, success)

        function progress(snapshot) {
            var status = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(status)
        }

        function fail(error) {
            setError(error)
            setTimeout(() => {
                setError('')
            }, 2000)
        }

        async function success() {
            let downloadurl = await uploadTaskListener.snapshot.ref.getDownloadURL()
            console.log(downloadurl)
            await database.users.doc(currentUser.uid).update({
                profileURL: downloadurl
            })
            history.push('/UsersFeed')
        }
    }


    return (
        <>
            <div className={classes.root}>
                <h1>Few Touchups before Signing in...</h1>
                <div className='col-12'>
                    <ThemeProvider theme={theme}>
                        <Paper className={classes.details} elevation={3}>
                            <div className='col-6'>
                                <div className={classes.ImgGrid}>
                                    {ViewFile == null ? <AccountCircleRoundedIcon></AccountCircleRoundedIcon> : <img src={ViewFile} />}
                                </div>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={viewPic}
                                />

                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span" style={{ marginLeft: '120%' }}>
                                        Upload
                                    </Button>
                                </label>
                            </div>
                            <div className='col-6'>
                                <form className={classes.bio}>

                                    <TextField
                                        inputProps={{ maxlength: 100 }}
                                        placeholder="Bio"
                                        color="primary"
                                        multiline='true'
                                    />
                                    <Button onClick={submitProfile}
                                        variant="contained" color="primary" component="span" style={{ marginLeft: '30%' }, { marginTop: '80%' }}>
                                        Done
                                    </Button>
                                </form>

                            </div>
                        </Paper>
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}

export default SetProfile
