import React, { useState } from 'react'
import "./OpenPost.css"
import { Button, TextField, makeStyles} from '@material-ui/core';

function AddComments() {
    const [text, setText] = useState(null)
    const manageText = (e) => {
        let comment = e.target.value
        setText(comment)
    }
    const handleonEnter = () => {

    }
    return (
        <>
        <div className="add-comment">
            <TextField className="col-9" onChange = {manageText} id="standard-basic" label="Add a Comment" style={{ marginBottom: "5%" }, { marginLeft: "1%" }} />
            <Button className="col-3" onClick = {handleonEnter} disabled = {text == '' ? true : false} color="primary">Post</Button>
            </div>
        </>
    )
}

export default AddComments
