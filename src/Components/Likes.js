import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase';
import { makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
const useStyles = makeStyles({
    like: {
        color:'#e74c3c',
        cursor:'pointer',
    },

    unlike: {
        cursor: "pointer",
    }
})

function Likes({ userData = null, postData = null }) {
    const classes = useStyles()
    const [Like, setLike] = useState(null)
    const handlelike = async () => {
        if (Like == true) {
            let uarr = postData.likes.filter(el => {
                return el != userData.userId
            })
            await database.posts.doc(postData.postId).update({
                likes: uarr
            })
        } else {
            let uarr = [...postData.likes, userData.userId]
            await database.posts.doc(postData.postId).update({
                likes: uarr
            })
        }
    }

    useEffect(() => {
        let check = postData.likes.includes(userData?.userId) ? true : false
        setLike(check)
    }, [postData])

    return (
        <>
            {
                Like != null ? <>
                    {Like == false ? <FavoriteOutlinedIcon fontSize="medium" onClick={handlelike} className={classes.unlike} /> : <FavoriteOutlinedIcon onClick={handlelike} className={classes.like} />}
                </> : <></>
            }
        </>
    )
}

export default Likes
