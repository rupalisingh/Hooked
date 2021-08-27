import React, { useState, useEffect } from 'react'
import { Modal, Backdrop, Fade,  ThemeProvider, createTheme, Paper, CircularProgress, Container, makeStyles, Avatar } from '@material-ui/core';
import { database } from '../firebase';
import Video from './Video'
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import { teal } from '@material-ui/core/colors';
import './backdrop.css'
import "./OpenPost.css"
import Likes from './Likes'
import AddComments from './AddComments'
import Comments from './Comments'



const useStyles = makeStyles({
    loader: {
        marginTop: '40vh',
        marginLeft: '40vw',
        color: '#008080'
    },
    videoCard: {
        width: '70%',
        height: '100%',
        background: 'white',
        postion: 'absolute',
        marginBottom: '2%',


    },
    Userinfo: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '5%',

        '& > *': {
            marginTop: '5%',
        }
    },

    username: {
        marginLeft: '5%',
        fontFamily: "cursive",
    },
    commentBox: {
        display: "flex",
        marginTop: '3%',
        width: '100%',
        paddingBottom: "4%",
        '& > *': {
            minWidth : "100%",
        },
    },

    actionbtns: {
        display: 'flex',
        alignItems: 'center',
        width: "20%",
        marginLeft: "2%",
        justifyContent: "space-evenly",
        cursor : "pointer",
    },

    PostModal: {
        height: "70%",
        width: "60%",
        position: 'absolute',
        marginLeft: '20%',
        marginTop: '10%',
        display: 'flex',

    },

})


function Post({ userData = null }) {

    const theme = createTheme({
        palette: {
            primary: {
                main: teal[500],
            },
        },
    });
    const [posts, setPosts] = useState(null)
    const [OpenModal, setOpenModal] = useState(null)
    const [isModalOpened, setisModalOpened] = useState(false)
    const classes = useStyles()
    const callback = entries => {
        entries.forEach(element => {
            let el = element.target.childNodes[0]
            el.play().then(() => {
                if (!el.paused && !element.isIntersecting) {
                    el.pause()
                }
            })
        })
    }

    const observer = new IntersectionObserver(callback, { threshold: 0.7 })

    useEffect(() => {
        let postarr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            postarr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                postarr.push(data)
            })
            setPosts(postarr)
        })
        return unsub
    }, [])

    useEffect(() => {
        let element = document.querySelectorAll('.videos')
        element.forEach(el => {
            observer.observe(el)
        })
        return () => {
            observer.disconnect()
        }
    }, [posts])

    const ModalOpen = (id) => {
        setOpenModal(id)
        setisModalOpened(true)
    }

    const ModalClose = () => {
        setOpenModal(null)
        setisModalOpened(false)
    }

    return (

        <>
            {
                posts == null ? <CircularProgress color="secondary" className={classes.loader} /> : <>
                    <ThemeProvider theme={theme}>
                        <Container maxWidth="sm">
                            {
                                posts.map((post, index) => (
                                    <React.Fragment key={post.postId}>
                                        <Paper className={classes.videoCard} elevation={5}>
                                            <div className={classes.Userinfo}>
                                                <Avatar src={post.uProfile} className={classes.large}></Avatar>
                                                <h4 className={classes.username}>{post.uname}</h4>
                                            </div>
                                            <div className='videos'>
                                                <Video source={post.pUrl} id={post.pid} ></Video>
                                            </div>

                                            <div className={classes.actionbtns}>
                                                <ChatBubbleOutlineRoundedIcon fontSize="medium" onClick={() => ModalOpen(post.pid)} />
                                                <Likes userData={userData} postData={post} />
                                            </div>
                                            <div className={classes.commentBox} style={{ marginBottom: "5%" }}>
                                                {/* <TextField className="col-9" id="standard-basic" label="Add a Comment" style={{ marginBottom: "5%" }, { marginLeft: "1%" }} />
                                                <Button className="col-3" color="primary">Post</Button> */}
                                                <AddComments userData = {userData} postData = {post}/>
                                            </div>
                                        </Paper>
                                        {
                                            < Modal
                                                className={classes.modal}
                                                open={OpenModal === post.pid}
                                                onClose={ModalClose}
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}

                                            ><Fade in={isModalOpened}>
                                                    <Paper className={classes.PostModal} elevation={4}>
                                                        <div className='col-6'>
                                                            <div className="video-part">
                                                                <Video source={post.pUrl}></Video>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="info-part">
                                                                <div className="user-info">
                                                                    <Avatar src={post.uProfile} className="profilepic"></Avatar>
                                                                    <h4 className="user-name">{post.uname}</h4>
                                                                </div>
                                                                <div className="comments-history">
                                                                    <Comments postData = {post}></Comments>
                                                                </div>
                                                                <AddComments userData = {userData} postData = {post} ></AddComments>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </Fade>
                                            </Modal>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Container>
                    </ThemeProvider>
                </>
            }
        </>
    )
}

export default Post
