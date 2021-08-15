import React, { useState, useEffect } from 'react'
import { Paper, CircularProgress, Container, makeStyles, Avatar } from '@material-ui/core';
import { database } from '../firebase';
import Video from './Video'
const useStyles = makeStyles({
    loader: {
        marginTop: '40vh',
        marginLeft: '40vw',
        color: '#008080'
    },
    videoCard: {
        width: '70%',
        height: '50%',
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
    }



})


function Post({ userData = null }) {
    const [posts, setPosts] = useState(null)
    const classes = useStyles()
    const callback = entries => {
        entries.forEach(element => {
            let el = element.target.childNodes[0]
            console.log(el)
            el.play().then(() => {
                if(!el.paused && !element.isIntersecting){
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

    return (

        <>
            {
                posts == null ? <CircularProgress color="secondary" className={classes.loader} /> : <>
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
                                    </Paper>

                                </React.Fragment>
                            ))
                        }
                    </Container>
                </>
            }
        </>
    )
}

export default Post
