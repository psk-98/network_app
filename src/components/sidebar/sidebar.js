import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import $ from 'jquery';

class Sidebar extends Component {
    state = {
        closeBtn: ''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    componentDidMount() {
        $('#dismiss, .overlay').on('click', function () {
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
        });

        if($(window).width() < 768){
            this.setState({
                closeBtn: <svg onClick={this.handleDismiss} xmlns="http://www.w3.org/2000/svg" className="back_icon" width="17" viewBox="0 0 36 32">
                            <path id="Back_icon"  data-name="Back icon" d="M20.69,32.5l-1.784,1.627a2.053,2.053,0,0,1-2.724,0L.563,19.893a1.645,1.645,0,0,1,0-2.484L16.183,3.164a2.053,2.053,0,0,1,2.724,0L20.69,4.791A1.654,1.654,0,0,1,20.658,7.3l-9.682,8.412H34.068A1.845,1.845,0,0,1,36,17.475V19.82a1.845,1.845,0,0,1-1.928,1.759H10.976l9.682,8.412A1.643,1.643,0,0,1,20.69,32.5Z" transform="translate(0.004 -2.647)" fill="#fff"/>
                        </svg>
            })
        }
        else {
            this.setState({
                closeBtn: ''
            })
        }

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    }

    handleDismiss = () => {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    }

    handleClickDismiss = () => {
        if($(window).width() < 768)
        {
            this.handleDismiss()
        }
    }

    render() {

        const { isAuthenticated, user} = this.props.auth

        const username = user ? (user.username) : ("")

        const authLinks = isAuthenticated ? (
            <>
                <li>
                    <Link to={"/profile/" + user.id} onClick={this.handleClickDismiss}>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <span className="li-span" onClick={this.handleClickDismiss} onClick={this.props.logout}>
                        Logout
                    </span>
                </li>
            </>
        ):(
            <>
                <li>
                    <Link to="/register" className="li-span" onClick={this.handleClickDismiss}>
                        Register
                    </Link>
                </li>
                <li>
                    <Link to="/login" onClick={this.handleClickDismiss} className="li-span">
                        Login
                    </Link>
                </li>
            </>
        )
        const userprofile = isAuthenticated ? (
            <div className="side-profile">
                <Link to={"/profile/" + user.id} className="pro_owner">
                    <span><span>Hi</span> {user.username}</span>
                </Link>
            </div>
        ): (<> </>)
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <div className="ntwrk-hdng">
                        <h2>Network</h2>
                    </div>
                    <div id="dismiss">
                        {this.state.closeBtn}
                    </div>
                </div>
                <ul className="list-unstyled components">
                    {userprofile}
                    <li>
                        <Link to="/" onClick={this.handleClickDismiss}>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/global" onClick={this.handleClickDismiss}>
                            <span>Global</span>
                        </Link>
                    </li>
                    {authLinks}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout}) (Sidebar)