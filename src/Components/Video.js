import React from 'react'
import  ReactDOM  from 'react-dom'
import { makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
    
    post: {
        width: '100%',
        height: '100%',
        
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
    console.log(props)
    return (
        <>
            <video className={classes.post} controls  onEnded = {handleAutoScroll} src={props.source} onClick={handlemute} muted='muted' type='video/mp4'></video>
        </>
    )
}

export default Video
