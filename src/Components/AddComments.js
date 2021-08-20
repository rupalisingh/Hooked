import React, { useState } from 'react'
import "./OpenPost.css"
import { Button, TextField, makeStyles} from '@material-ui/core';
import {database} from '../firebase'

function AddComments({userData = null, postData = null}) {
    const [text, setText] = useState(null)
    const manageText = (e) => {
        let comment = e.target.value
        setText(comment)
    }
    const handleonEnter = () => {
        let obj = {
            text : text,
            uName : userData.username,
            Dpurl : userData.profileURL

        }

        console.log(obj)
        console.log(postData.postId)
        database.comments.add(obj).then(docRef => {
            database.posts.doc(postData.postId).update({
                comments : [...postData.comments, docRef.id]
            }).then(() => {
                setText('')
            }).catch(e => {
                console.log(e + " ")
            })
        })

    }
    return (
        <>
        <div className="add-comment">
            <TextField value = {text} className="col-9" onChange = {manageText} id="standard-basic" label="Add a Comment" style={{ marginBottom: "5%" },{ marginLeft: "1%" }} />
            <Button className="col-3" onClick = {handleonEnter} disabled = {text == '' ? true : false} color="primary">Post</Button>
            </div>
        </>
    )
}

export default AddComments
