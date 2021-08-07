import React, {Component} from 'react'
import { connect } from 'react-redux'
import {newPost, comment} from '../../actions/posts'
import PropTypes from 'prop-types'

class New extends Component {

    state = {
        heading: null,
        post: null
    }

    static propTypes = {
        posts: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.handleHeading()
    }

    handleHeading = () => {
        const {history} = this.props
        let heading = null
        if(history.location.pathname === "/newpost")
        {
            this.setState({heading: "Post"})
        }
        else {
            this.setState({heading: "Comment"})
        }
        return heading
    }

    componentDidUpdate() {
        const { posted, posted_res} = this.props.posts
        const {history, match} = this.props
        console.log(posted)
        if(posted)
        {   
            if(history.location.pathname === "/newpost")
            {
                history.push(`/post/${posted_res.id}`)
            }
            else
            {
                history.push(`/post/${match.params.post_id}`)
            }
        }
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value})

    handleSubmit = () => {
        const {history, match, post, newPost, comment} = this.props
        console.log(post)
        if(history.location.pathname === "/newpost")
        {
            newPost(this.state.post)
        }
        else {
            comment(this.state.post, match.params.post_id)
        }
    }

    render () {
        console.log(this.props.history)
        return (
            <>
                <nav className="navbar">
                    <button onClick={() => this.props.history.goBack()} className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15"  viewBox="0 0 10 27">
                            <text id="x" fill="#ff6f00" fontSize="20"><tspan x="0" y="22">x</tspan></text>
                        </svg>
                    </button>
                    <button className="post-btn" onClick={this.handleSubmit}>
                        {this.state.heading}
                    </button>
                </nav>
                <div className="main">
                    <textarea name="post" className="new-textarea" placeholder="What's on your mind" 
                                value={this.state.post} maxLength="280" onChange={this.handleChange}>
                    </textarea>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts
})

export default connect(mapStateToProps, {newPost, comment}) (New)