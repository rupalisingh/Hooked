import React, { useState, useEffect } from 'react'
import { database } from '../firebase'
import { CircularProgress, Avatar, makeStyles } from '@material-ui/core'
import './OpenPost.css'
const useStyles = makeStyles({
    dp: {
        marginLeft: "2%",
},
usercomm : {
    justifyContent : 'center',
    marginTop : '5%',
    marginLeft : "2%",

},
usernamestyle : {
    fontWeight : "bolder",
    fontFamily : "calibri"
    
}
})

function Comments(props) {
    const classes = useStyles()
    const [comments, setComments] = useState(null)

    useEffect(async () => {
        let arr = []
        for (let i = 0; i < props.postData.comments.length; i++) {
            let cid = props.postData.comments[i]
            let data = await database.comments.doc(cid).get()
            arr.push(data.data())
        }
        setComments(arr)
    }, [props.postData])
    return (
        <>
            {
                comments == null ? <CircularProgress /> :
                    comments.map((comment, index) => (
                        <div key={index} className="comment-div">
                            <Avatar src={comment.Dpurl} className={classes.dp} />
                            <p className = {classes.usercomm}><span className = {classes.usernamestyle} >{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                        </div>
                    ))
            }
        </>
    )
}

export default Comments
