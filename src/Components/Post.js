import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import { Avatar, CircularProgress } from '@material-ui/core'
import Video from './Video';


function Post({ userData = null }) {
    const [posts, Setposts] = useState(null)
    const callback = entries => {
        entries.forEach(element => {
            console.log(element)
            let el = element.target.childNode[0]
            el.play().then(() => {
                if (!el.paused && !element.isIntersecting) {
                    el.pause()
                }
            })
        })
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.9 })
    useEffect(() => {
        let postarr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            postarr = []
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                let data = { ...doc.data(), postId: doc.id }
                postarr.push(data)
            })
            Setposts(postarr)
        })
        return unsub
    }, [])
    useEffect(() => {
let elements = document.querySelectorAll('.videos')
elements.forEach(el => {
    observer.observe(el)
})
return () => {
    observer.disconnect()
}
    }, [posts])
    return (
        <>
            <div className='places'>

            </div>
            {
                posts == null ? <CircularProgress color="secondary" /> : <>
                    <div className='video-container'>
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={post.postId}>
                                    <div className='videos'>
                                        <Video source={post.pUrl} id={post.pid}></Video>
                                    <div className = 'fa'>
                                        <Avatar src = {post.uProfile}></Avatar>
                                    <h4>{post.uname}</h4>
                                    </div>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Post
