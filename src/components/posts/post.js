import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, likePost, getComments } from '../../actions/posts'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from "react-router-dom"

class Post extends Component {
    
    static propTypes = {
        getPost: PropTypes.func.isRequired,
        likePost: PropTypes.func.isRequired,
        getComments: PropTypes.func.isRequired,
        posts: PropTypes.object,
        auth: PropTypes.object
    }

    componentDidMount() {
        const {getPost, getComments, match} = this.props
        getPost(match.params.post_id)
        getComments(match.params.post_id)
    }

    handleLike = (post_id) => {
        const {auth} = this.props
        if (auth.isAuthenticated) {
            for (let x = 0; x < auth.user.liked.length; x++) 
            {
                if (post_id === auth.user.liked[x].id)
                {
                    return "liked"
                }
            }
        } 
    }

    render() {

        const { post, comments } = this.props.posts

        const postContent = post ? (
            <>
                <div className="post">
                    <div className="t-details">
                        <Link to={"/profile/" + post.author.id} className="p_author">
                            <span>{post.author.username}</span>
                        </Link>
                    </div>
                    <div className="t-main">
                        <span>
                            {post.body}
                        </span>
                    </div>
                    <div class="dt">
                        <span>{moment(post.created).format("LT")}</span><span className="day"> {moment(post.created).format("DD MMM YY")}</span>
                    </div>
                    <div className="t-footer">
                        <div className="no_likes footer-item">
                            <span className="inter_title">{post.like.length} Likes</span>
                        </div>
                        <div className="no_com footer-item" >
                            <span className="inter_title">{post.comments} Comments</span>
                        </div>
                    </div>
                    <div className="p-footer">
                        <div className="likes" onClick={() => this.props.likePost(post.id, "post")}>
                            <svg className={this.handleLike(post.id)} xmlns="http://www.w3.org/2000/svg" width="18.198" height="16" viewBox="0 0 18.198 16">
                                <path id="Like_btn" data-name="Like btn" d="M18.195,5.823a4.525,4.525,0,0,0-6.4,0l-.872.872-.872-.872a4.526,4.526,0,1,0-6.4,6.4l.872.872,6.4,6.4,6.4-6.4.872-.872a4.525,4.525,0,0,0,0-6.4Z" transform="translate(-1.823 -3.997)"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </svg>
                        </div>
                        <Link to={"/comment/" + post.id} className="coms">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16.011" viewBox="0 0 16 16.011">
                                <path id="Comment" d="M13.125,0H1.875A1.877,1.877,0,0,0,0,1.875v8.438a1.877,1.877,0,0,0,1.875,1.875H4.688v2.461a.352.352,0,0,0,.56.284l3.659-2.745h4.219A1.877,1.877,0,0,0,15,10.313V1.875A1.877,1.877,0,0,0,13.125,0Z" transform="translate(0.5 0.5)" strokeWidth="1"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="bottom-border"></div>
            </>
        ):(<>No post</>)

        const commentList = comments ? (
            comments.map(comment => {
                return(
                    <>
                        <div className='post' key={comment.id}>
                            <div className="p-details">
                                <div className="p-author">
                                    <Link to={"/profile/" + comment.author.id} className="p_author">
                                        <span>{comment.author.username}</span>
                                    </Link>
                                </div>
                                <div className="ago">
                                    <small >{moment(comment.created).from(moment(Date.now()))}</small>
                                </div>
                            </div>
                            <div className="p-main">
                                <span>
                                    {comment.body}
                                </span>
                            </div>
                        </div>
                        <div className="bottom-border"></div>
                    </>
                )
            })
        ): (
            <p>no comments</p>
        )

        return (
            <>
                <section className="navbar">
                    <button onClick={() => this.props.history.goBack()} className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="back_icon" width="17" viewBox="0 0 36 32">
                            <path id="Back_icon"  data-name="Back icon" d="M20.69,32.5l-1.784,1.627a2.053,2.053,0,0,1-2.724,0L.563,19.893a1.645,1.645,0,0,1,0-2.484L16.183,3.164a2.053,2.053,0,0,1,2.724,0L20.69,4.791A1.654,1.654,0,0,1,20.658,7.3l-9.682,8.412H34.068A1.845,1.845,0,0,1,36,17.475V19.82a1.845,1.845,0,0,1-1.928,1.759H10.976l9.682,8.412A1.643,1.643,0,0,1,20.69,32.5Z" transform="translate(0.004 -2.647)" fill="#ff6f00"/>
                        </svg>                  
                    </button>
                    <p>Post</p>
                    <p></p>
                </section>
                <div className="main">
                    {postContent}
                    {commentList}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
})

export default connect(mapStateToProps, {getPost, likePost, getComments}) (Post)
