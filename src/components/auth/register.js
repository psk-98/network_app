import React ,{ Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value})

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, email, password} = this.state
        const newUser = {
            username,
            email,
            password
        }
        this.props.register(newUser);
        this.setState({
            username: '',
            email: '',
            password: ''
        })
    }

    render(){
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return(
            <div className="the-form">
                <h2 className="form-header">Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="Username"
                            value={this.state.username} onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email Address"
                            value={this.state.email} onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password"
                            value={this.state.password} onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="sub-btn">Register</button>
                </form>
                <span>
                    Don't have an account? <Link className="form-redirect" to="/login">Login here.</Link>
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register }) (Register)