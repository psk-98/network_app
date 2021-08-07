import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import $ from 'jquery';
import moment from 'moment'
import { getPosts, getAllPosts, likePost } from '../../actions/posts'

class Posts extends Component {

    state = {
        button: '',
        heading: '',
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        posts: PropTypes.array.isRequired,
        getPosts: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { match, getPosts, getAllPosts } = this.props

        if (match.path.includes("global"))
        {
            getAllPosts()
            this.setState({
                heading: 'Global',
            })
        }
        else
        {
            getPosts()
            this.setState({
                heading: 'Home'
            })
        }
        
        if($(window).width() < 768){
            this.setState({
                button: <svg xmlns="http://www.w3.org/2000/svg" width="40.3" height="21" viewBox="0 0 40.3 21">
                            <g id="Burger" transform="translate(-311 -22)">
                                <rect id="Rectangle_2" data-name="Rectangle 2" width="40" height="3" transform="translate(311 22)" />
                                <rect id="Rectangle_3" data-name="Rectangle 3" width="13.3" height="3" transform="translate(338 40)" />
                                <rect id="Rectangle_4" data-name="Rectangle 4" width="26.6" height="3" transform="translate(324 31)" />
                            </g>
                        </svg>
            })
        }
        else {
            this.setState({
                button: ''
            })
        }

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props
        if (this.props !== prevProps)
        {
            console.log("changed props")
            if (match.path.includes("global"))
            {
                getAllPosts()
                this.setState({
                    heading: 'Global'
                })
            }
            else
            {
                getPosts()
                this.setState({
                    heading: 'Home'
                })
            }
        }
        else
        {
            console.log("didnt change")
        }
    }

    handleLike = (post_id) => {
        const {user} = this.props
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

    render () {

        const {posts} = this.props

        const postList = posts ? (
            posts.map(post => {
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
                <div className="float">
                    <Link to="/newpost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32">
                            <g id="add_post_btn" data-name="add post btn" transform="translate(-2 -2)">
                                <path id="Path_1" data-name="Path 1" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" fill="none" stroke="#ff6f00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                <path id="Path_2" data-name="Path 2" d="M18,12V24" fill="none" stroke="#ff6f00" strokeLinejoin="round" strokeWidth="3"/>
                                <path id="Path_3" data-name="Path 3" d="M12,18H24" fill="none" stroke="#ff6f00" strokeLinejoin="round" strokeWidth="3"/>
                            </g>
                        </svg>
                    </Link>
                </div>
                <section className="navbar">
                    <button className="nav-toggler" id="sidebarCollapse">
                        {this.state.button}
                    </button>
                    <p>{this.state.heading}</p>
                    <p></p>
                </section>
                <section className="main">
                    {postList}
                </section>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    posts: state.posts.posts
})

export default connect(mapStateToProps, {getPosts, getAllPosts, likePost}) (Posts)