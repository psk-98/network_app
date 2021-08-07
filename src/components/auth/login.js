import React ,{ Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value})

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        this.setState({
            username: '',
            password: ''
        })
    }

    render(){
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return(
            <div className="the-form">
                <h2 className="form-header">Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="Username"
                            value={this.state.username} onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password"
                            value={this.state.password} onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="sub-btn">Login</button>
                </form>
                <span>
                    Don't have an account? <Link className="form-redirect" to="/register">Register here.</Link>
                </span>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login}) (Login)