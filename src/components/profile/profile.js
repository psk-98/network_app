import React, { Component } from 'react'
import moment from 'moment';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { getProfile, follow, unfollow } from '../../actions/auth'
import Posts from './profilePosts'

class Profile extends Component {
    state = {
        posts_tab: 'navs-link selected',
        comments_tab: 'navs-link',
        likes_tab: 'navs-link',
        userBtn: '',
        userBtnClass: '',
        btn: '',
        open_tab: 'posts',
    }

    static propTypes = {
        auth: PropTypes.object,
        follow: PropTypes.func.isRequired,
        unfollow: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getProfile(this.props.match.params.user_id)
    }

    handlePosts = () => {
        this.setState({
            posts_tab: 'navs-link selected',
            comments_tab: 'navs-link',
            likes_tab: 'navs-link',
            open_tab: 'posts'
        })
    }

    handleLikes = () => {
        this.setState({
            likes_tab: 'navs-link selected',
            posts_tab: 'navs-link',
            comments_tab: 'navs-link',
            open_tab: 'likes'
        })
    }

    handleBtn = () => {
        const {user, isMyProfile, profile} = this.props.auth
        const {unfollow, follow} = this.props 

        if (isMyProfile)
        {
            return(
                <Link to="/update_profile">
                    <button className="edit-profile">
                        Edit profile
                    </button>
                </Link>
            )
        }
        else
        {   if (user && profile)
            {
                if (profile.followers)
                {
                    for (let i = 0; i < profile.followers.length; i++) {
                        if(profile.followers[i].follower.id === user.id)
                        {
                            return (
                                <button className="follow-prof" onClick = {() => unfollow(profile.id)}>
                                    Unfollow
                                </button>
                            )
                        }
                        
                    }
                }
            }
            return(
                <button className="follow-prof" onClick = {() => follow(profile.id)}>
                    Follow
                </button>
            )
        }
    }

    render() {
    
        const {profile, isMyProfile} = this.props.auth

        const bio = profile ? profile.profile.bio : ""

        const newBtn = isMyProfile ? (
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
        ):(
            <></>
        )

        if (profile) {
            return (
                <div className="pro-wrapper">
                    {newBtn}
                    <section className="navbar">
                        <button onClick={() => this.props.history.goBack()} className="back-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" width="17" viewBox="0 0 36 32">
                                <path id="Back-icon"  data-name="Back icon" d="M20.69,32.5l-1.784,1.627a2.053,2.053,0,0,1-2.724,0L.563,19.893a1.645,1.645,0,0,1,0-2.484L16.183,3.164a2.053,2.053,0,0,1,2.724,0L20.69,4.791A1.654,1.654,0,0,1,20.658,7.3l-9.682,8.412H34.068A1.845,1.845,0,0,1,36,17.475V19.82a1.845,1.845,0,0,1-1.928,1.759H10.976l9.682,8.412A1.643,1.643,0,0,1,20.69,32.5Z" transform="translate(0.004 -2.647)" fill="#ff6f00"/>
                            </svg>                  
                        </button>
                    </section>
                    <section className="main">
                        <div className="profile">
                            <div className="pro-owner">
                                <span>{profile.username}</span>
                            </div>
                            <div className="pbd">
                                {this.handleBtn()}
                            </div>
                        </div>
                        <div className="pro-des">
                            <span>{bio}</span>
                        </div>
                        <div className="det-r">
                            <div className="detail">
                                <span className="det-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 8">
                                        <path id="calendar-icon" data-name="calendar icon" d="M0,7.25A.75.75,0,0,0,.75,8h5.5A.75.75,0,0,0,7,7.25V3H0ZM5,4.188A.188.188,0,0,1,5.188,4h.625A.188.188,0,0,1,6,4.188v.625A.188.188,0,0,1,5.813,5H5.188A.188.188,0,0,1,5,4.813Zm0,2A.188.188,0,0,1,5.188,6h.625A.188.188,0,0,1,6,6.188v.625A.188.188,0,0,1,5.813,7H5.188A.188.188,0,0,1,5,6.813Zm-2-2A.188.188,0,0,1,3.188,4h.625A.188.188,0,0,1,4,4.188v.625A.188.188,0,0,1,3.813,5H3.188A.188.188,0,0,1,3,4.813Zm0,2A.188.188,0,0,1,3.188,6h.625A.188.188,0,0,1,4,6.188v.625A.188.188,0,0,1,3.813,7H3.188A.188.188,0,0,1,3,6.813Zm-2-2A.188.188,0,0,1,1.188,4h.625A.188.188,0,0,1,2,4.188v.625A.188.188,0,0,1,1.813,5H1.188A.188.188,0,0,1,1,4.813Zm0,2A.188.188,0,0,1,1.188,6h.625A.188.188,0,0,1,2,6.188v.625A.188.188,0,0,1,1.813,7H1.188A.188.188,0,0,1,1,6.813ZM6.25,1H5.5V.25A.251.251,0,0,0,5.25,0h-.5A.251.251,0,0,0,4.5.25V1h-2V.25A.251.251,0,0,0,2.25,0h-.5A.251.251,0,0,0,1.5.25V1H.75A.75.75,0,0,0,0,1.75V2.5H7V1.75A.75.75,0,0,0,6.25,1Z" fill="#707070"/>
                                    </svg>                     
                                </span>
                                <span className="det-text">
                                    Joined {moment(profile.date_joined).format("DD MMM YY")}
                                </span>
                            </div>
                        </div>
                        <div className="det-r">
                            <Link to={"/followers/" + profile.id}>
                                <div className="detail">
                                    <span className="bold">
                                        {profile.followers.length}                                                     
                                    </span>
                                    <span className="det-text">
                                        Followers
                                    </span>
                                </div>
                            </Link>
                            <Link to={"/following/" + profile.id}>
                                <div className="detail">
                                    <span className="bold">
                                        {profile.follows.length}                     
                                    </span>
                                    <span className="det-text">
                                        Following
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="navs">
                            <div className={this.state.posts_tab} onClick={this.handlePosts} name="Posts">
                                Posts
                            </div>
                            <div className={this.state.likes_tab} onClick={this.handleLikes} name="Likes">
                                Likes
                            </div>
                        </div>
                        <Posts user={this.props.match.params.user_id} tab={this.state.open_tab}/>
                    </section>
                </div>
            )
        }
        else 
        {
            return (
                <></>
            )
        }
        
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps,  {getProfile, follow, unfollow}) (Profile)