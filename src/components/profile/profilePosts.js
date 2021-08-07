import React ,{ Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserPosts, getLikedPosts } from '../../actions/posts'
import { getProfile } from '../../actions/auth'
import { Link } from "react-router-dom";
import moment from 'moment'

class ProfilePosts extends Component {
    
    static propTypes = {
        auth: PropTypes.object.isRequired,
        posts: PropTypes.object
    }

    componentDidMount() {
        const {user, getUserPosts} = this.props
        getUserPosts(user)
    }

    componentDidUpdate(prevState) {
        const {tab, getLikedPosts, getUserPosts ,user} = this.props
        if (prevState.tab !== tab)
        {
            if(tab === 'likes') getLikedPosts(user)
            if(tab === 'posts') getUserPosts(user)
        }
    }

    handleLike = (post_id) => {
        const {user} = this.props.auth
        if (user) {
            for (let x = 0; x < user.liked.length; x++) 
            {
                if (post_id === user.liked[x].id)
                {
                    return "liked"
                }
            }
        } 
    }

    render() {
        const {userPosts} = this.props.posts

        const postList = userPosts ? (
            userPosts.map(post => {
                return(
                    <>
                        <div className="post" key={post.id}>
                            <div className="p-details">
                                <div className="p-author">
                                    <Link to={"/profile/" + post.author.id} >
                                        <span>{post.author.username}</span>
                                    </Link>
                                </div>
                                <div className="ago">
                                    <small >{moment(post.created).from(moment(Date.now()))}</small>
                                </div>
                            </div>
                            <div className="p-main">
                                <Link to={"/post/" + post.id}>
                                    <span>
                                        {post.body}
                                    </span>
                                </Link>
                            </div>
                            <div className="p-footer">
                                <div className="likes">
                                    <span>{post.like.length}</span>
                                    <svg className={this.handleLike(post.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.198 16" onClick={() => this.props.likePost(post.id, this.state.heading)}>
                                        <path id="Like_btn" data-name="Like btn" d="M18.195,5.823a4.525,4.525,0,0,0-6.4,0l-.872.872-.872-.872a4.526,4.526,0,1,0-6.4,6.4l.872.872,6.4,6.4,6.4-6.4.872-.872a4.525,4.525,0,0,0,0-6.4Z" transform="translate(-1.823 -3.997)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    </svg>
                                </div>
                                <div className="coms">
                                    <span>{post.comments}</span>
                                    <Link to={"/comment/" + post.id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16.011">
                                            <path id="Comment" d="M13.125,0H1.875A1.877,1.877,0,0,0,0,1.875v8.438a1.877,1.877,0,0,0,1.875,1.875H4.688v2.461a.352.352,0,0,0,.56.284l3.659-2.745h4.219A1.877,1.877,0,0,0,15,10.313V1.875A1.877,1.877,0,0,0,13.125,0Z" transform="translate(0.5 0.5)" strokeWidth="1"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-border"></div>
                    </>
                )
            })
        ):(<>No posts </>)

        return (
            <> 
                {postList} 
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
})

export default connect(mapStateToProps, {getUserPosts, getLikedPosts, getProfile }) (ProfilePosts)