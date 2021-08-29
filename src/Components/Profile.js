import React, { useState, useContext, useEffect } from 'react'
import { Paper, Avatar, CircularProgress, makeStyles } from '@material-ui/core'
import { AuthContext } from '../Context/AuthProvider'
import "./Profile.css"
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { database } from '../firebase';
import Header from './Header'
import Video from './Video'
import Likes from './Likes'
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';


const useStyles = makeStyles({
    loader: {
        marginTop: '50vh',
        marginLeft: '50vw',
        color: '#008080'
    },
    username: {
        fontFamily: "cursive",
        fontWeight: 600,
        fontSize: "27px",
    },

    Bio: {
        fontFamily: "cursive",
        fontSize: "20px",
        textAlign: "right",
    },

    post: {
        display: "flex",
        border: "1px solid red",

    },
    actionbtns: {
        position: 'absolute',
        zIndex: "100",

    }

})


function Profile() {
    const theme = useTheme();
    const classes = useStyles()
    const SizedAvatar = styled(Avatar)`
    ${({ size, theme }) => `
      width: ${theme.spacing(size)}px; 
      height: ${theme.spacing(size)}px; 
    `};
  `;

    const { currentUser } = useContext(AuthContext)
    const [ProfileuserData, setProfileUserData] = useState(null)
    const [videourl, setvideourl] = useState([])
    const [OpenModal, setOpenModal] = useState(null)
    const [isModalOpened, setisModalOpened] = useState(false)

    useEffect(async () => {
        database.users.doc(currentUser.uid).get().then((doc) => {
            let res = doc.data();
            setProfileUserData(res)
        })
    }, [])


    useEffect(() => {
        let newarr = []
        if(ProfileuserData){
            const sub = database.posts.orderBy("createdAt", "desc").onSnapshot(querysnapshot => {
                newarr = []
                querysnapshot.forEach((doc)=> {
                    console.log(doc.data())
                    let data = {...doc.data(), postId : doc.id}
                    newarr.push(data)
                })
                setvideourl(newarr)

            })

            return sub
        }
    }, [ProfileuserData])

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
                ProfileuserData === null ? <CircularProgress className={classes.loader} />
                    : <>
                        <Header userData={ProfileuserData} />
                        <Paper elevation={5}>
                            <div className="ProfileInfo">
                                <ThemeProvider theme={theme}>
                                    <SizedAvatar size={20} src={ProfileuserData.profileURL} />
                                </ThemeProvider>
                                <div className="text-details">
                                    <p className={classes.username}>{ProfileuserData.username}</p>
                                    <p className={classes.Bio}>Bio</p>
                                </div>
                            </div>
                        </Paper>

                        <div className="post-div">
                            {
                                videourl.map((post, index) => (
                                    <React.Fragment>
                                        <Paper className="AllPost" elevation={5}>
                                            <Video source={post.pUrl} />
                                            <div className={classes.actionbtns}>
                                                <ChatBubbleOutlineRoundedIcon fontSize="medium" onClick={() => ModalOpen(post.pid)} />
                                                <Likes userData={ProfileuserData} postData={post} />
                                            </div>
                                        </Paper>
                                    </React.Fragment>
                                ))

                            }
                        </div>
                    </>
            }
           
        </>
    )
}

export default Profile
