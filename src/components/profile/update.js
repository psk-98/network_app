import React ,{ Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {updateProfile} from '../../actions/auth'

class Update extends Component {
    
    state = {
        username: "",
        bio: "",
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        updateProfile: PropTypes.func.isRequired
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value})

    handleFileChange = (e) => this.setState({ [e.target.name]: e.target.files[0]})

    handleSubmit = (e) => {
        e.preventDefault();
        const {user} = this.props.auth
        const {username, bio } = this.state
        const email = user.email

        if (!username) this.setState({username: user.username})
        if (!bio) this.setState({bio: user.profile.bio})
        console.log(this.state)
        
        const editUser = {
            username,
            bio,
            email
        }
        this.props.updateProfile(editUser)
    }

    render() {
        const {user, isAuthenticated} = this.props.auth

        const {username} = isAuthenticated ? user : ""
        const { bio } = isAuthenticated ? user.profile : "tell people more about yourself"

        return (
            <>
                <nav className="navbar">
                    <button onClick={() => this.props.history.goBack()} className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="back_icon" width="17" viewBox="0 0 36 32">
                            <path id="Back_icon"  data-name="Back icon" d="M20.69,32.5l-1.784,1.627a2.053,2.053,0,0,1-2.724,0L.563,19.893a1.645,1.645,0,0,1,0-2.484L16.183,3.164a2.053,2.053,0,0,1,2.724,0L20.69,4.791A1.654,1.654,0,0,1,20.658,7.3l-9.682,8.412H34.068A1.845,1.845,0,0,1,36,17.475V19.82a1.845,1.845,0,0,1-1.928,1.759H10.976l9.682,8.412A1.643,1.643,0,0,1,20.69,32.5Z" transform="translate(0.004 -2.647)" fill="#ff6f00"/>
                        </svg>                  
                    </button>
                    <p>
                        Edit Profile
                    </p>
                    <button onClick={this.handleSubmit} className="save-btn">
                        Save
                    </button> 
                </nav>
                <div className="main">
                    <div className="editpro-wrapper">
                        <div>
                            <label>Username</label>
                            <input type="text" placeholder={username}
                                onChange={this.handleChange} value={this.state.username} name="username"
                            />
                        </div>
                        <div>
                            <label>Bio</label>
                            <textarea placeholder={bio} rows="3" 
                                onChange={this.handleChange} value={this.state.bio} name="bio">
                            </textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
} 

const mapStateToProps = state => ({
    auth: state.auth 
})

export default connect(mapStateToProps, {updateProfile}) (Update)