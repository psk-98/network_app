import React ,{ Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { follow, getProfile } from '../../actions/auth'
import { Link } from 'react-router-dom'

class Follows extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.getProfile(this.props.match.params.user_id)
    }

    handleRoute = () => {
        const { auth, match } = this.props

        if (match.path.includes("following"))
        {
            return auth.profile.follows
        }
        if (match.path.includes("followers"))
        {
            return auth.profile.followers
        }
    }

    handleObject = (follow) => {
        const { match } = this.props

        if (match.path.includes("following"))
        {
            return follow.followe
        }
        if (match.path.includes("followers"))
        {
            return follow.follower
        }
    }

    handleBtn = (follow) => {
        const {user, isMyProfile, profile} = this.props.auth

        const { match } = this.props
        let id

        if (match.path.includes("following"))
        {
            id = follow.followe.id
        }
        if (match.path.includes("followers"))
        {
            id = follow.follower.id
        }

        if (user && profile)
        {
            if (user.follows)
            {
                for (let i = 0; i < user.follows.length; i++) {
                    if(user.follows[i].followe.id === id)
                    {
                        return (
                            <button className="follow_prof">
                                Unfollow
                            </button>
                        )
                    }
                    
                }
            }
        }
        
        if (user)
        {   
            if(user.id === id)
            {
                return(
                    <div></div>
                )
            }
            else
            {
                return(
                    <button className="follow_prof">
                        Follow
                    </button>
                )
            }
        }
        
    }

    handleHeader = () => {
        const { match } = this.props

        if (match.path.includes("following"))
        {
            return "Following"
        }
        if (match.path.includes("followers"))
        {
            return "Followers"
        }
    }

    render () {

        const { auth } = this.props

        const followList = auth.profile ? (
            this.handleRoute().map(follow => {
                return (
                    <>
                        <div className="follows_row" key={follow.follower.id}>
                            <div className="follows_user">
                                <Link to={"/profile/" + follow.follower.id}>
                                    <span>{this.handleObject(follow).username}</span>
                                </Link>
                            </div>
                            <div className="follows_btn">
                                {this.handleBtn(follow)}
                            </div>
                            
                        </div>
                        <div className="bottom-border"></div>
                    </>
                )
            })
        ): (<p></p>)

        return (
            <>
                <nav className="navbar">
                    <button onClick={() => this.props.history.goBack()} className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="back_icon" width="17" viewBox="0 0 36 32">
                            <path id="Back_icon"  data-name="Back icon" d="M20.69,32.5l-1.784,1.627a2.053,2.053,0,0,1-2.724,0L.563,19.893a1.645,1.645,0,0,1,0-2.484L16.183,3.164a2.053,2.053,0,0,1,2.724,0L20.69,4.791A1.654,1.654,0,0,1,20.658,7.3l-9.682,8.412H34.068A1.845,1.845,0,0,1,36,17.475V19.82a1.845,1.845,0,0,1-1.928,1.759H10.976l9.682,8.412A1.643,1.643,0,0,1,20.69,32.5Z" transform="translate(0.004 -2.647)" fill="#ff6f00"/>
                        </svg>                  
                    </button>
                    <p>{this.handleHeader()}</p>
                    <p></p>
                </nav>
                {followList}
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getProfile}) (Follows)