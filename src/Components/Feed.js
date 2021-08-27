import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { AuthContext } from '../Context/AuthProvider'
import { database } from '../firebase'
import { CircularProgress } from '@material-ui/core'
import ScrollTop from './ScrollTop'
import { Paper, makeStyles, Toolbar, createTheme, CssBaseline, Container, Fab } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ThemeProvider } from 'styled-components'
import { teal } from '@material-ui/core/colors';
import Post from './Post'
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    loader: {
        marginTop: '50vh',
        marginLeft: '50vw',
        color: '#008080'
    },

    searchbar: {
        width: "20%",
        textAlign: "center",
        position: "absolute",
        display: "flex",
        marginLeft: "67%",
        marginTop: "3%",
    }

})

function Feed(props) {
    const classes = useStyles()
    const { currentUser } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const theme = createTheme({
        palette: {
            primary: {
                main: teal[500],
            },
        },
    });
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data())
        })
    }, [currentUser])
    return (
        <>
            {
                userData == null ? <CircularProgress color="secondary" className={classes.loader} /> : <>
                    <CssBaseline />
                    <Header userData={userData} />
                    <Toolbar id="back-to-top-anchor" />
                    <Paper component="form" className={classes.searchbar}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search a Username"
                            
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Container>
                        <div className={classes.postContainer}>
                            <Post userData={userData} />
                        </div>
                    </Container>
                    <ThemeProvider theme={theme}>
                        <ScrollTop {...props}>
                            <Fab color="primary" size="small" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </ScrollTop>
                    </ThemeProvider>
                </>
            }
        </>
    )
}

export default Feed

