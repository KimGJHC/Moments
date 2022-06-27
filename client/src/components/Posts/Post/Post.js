import React, {useState} from 'react'
import {Card, CardContent, CardActions, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem("profile"))
    const history = useHistory()
    const [likes, setLikes] = useState(post?.likes)

    const userId = user?.profile?.sub || user?.profile?._id
    const hasLikedPost = post.likes.find((like) => like === userId)

    const Likes = () => {
        if (likes.length > 0){
            return likes.find((like) => like === userId)
            ? (
                <><ThumbUpAltIcon fontSize='small' />&nbsp; {likes.length > 2 ? `You and ${likes.length-1} others`: `${likes.length} like${likes.length > 1 ? 's': ''}`}</>
            ):(
                <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length}{likes.length===1? 'Like':'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    const handleLike = async () => {
        dispatch(likePost(post._id))

        if(hasLikedPost){
            setLikes(post.likes.filter((id) => id !== userId))
        }else{
            setLikes([...post.likes, userId])
        }
    }

    return(
        <Card className={classes.card} raised elevation={6}>
                {/* <ButtonBase className={classes.cardActions} onClick={openPost}> */}
                <CardMedia className={classes.media} image = {post.selectedFile} title = {post.title}/>
                {/* </ButtonBase> */}
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.profile?.sub === post?.creator || user?.profile?._id === post?.creator) &&
                    <div className={classes.overlay2}>
                        <Button style={{color: 'white'}} size = 'small' onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize='medium'/>
                        </Button>
                    </div>
                }
                <div className={classes.details}>
                    <Typography variant='body2' color = 'textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
                </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size = 'small' color='primary' disabled={!user?.profile} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.profile?.sub === post?.creator || user?.profile?._id === post?.creator) &&
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
                }
            </CardActions>
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" variant='contained' color="primary" onClick={openPost}> Read More </Button>
            </CardActions>
        </Card>
    )
}

export default Post