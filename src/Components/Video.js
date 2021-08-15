import React from 'react'
import  ReactDOM  from 'react-dom'
import { makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
    
    post: {
        width: '90%',
        height: '40%',
        position : 'relative',
        marginLeft :'5%'
        
    }
})


function Video(props) {
    const classes = useStyles()
    const handlemute = (e) => {
        e.preventDefault()
        e.target.muted = !e.target.muted
    }

    const handleAutoScroll = (e) => {
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        if(next){
            next.scrollIntoView({behavior : 'smooth'})
            e.target.muted = true
        }
    }
    return (
        <>
            <video className={classes.post}  onEnded = {handleAutoScroll} src={props.source} onClick={handlemute} muted='muted' type='video/mp4'></video>
        </>
    )
}

export default Video
