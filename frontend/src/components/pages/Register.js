import React , { useState } from "react";
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from "../../actions/auth";
import classes from './register.module.css';
import CSRFToken from "../csrftoken";

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({ 
        username:'',
        password:'',
        re_password:''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            register(username, password, re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Navigate to='/home' />;
    else if (accountCreated)
        return <Navigate to='/login' />;

    return (
        <div className={classes.main}>
            <div className={classes.container2}>
                <h1>Register for an Account</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <CSRFToken />

                    <div className={classes.input_section}>
                    <label>Username: </label>
                    <input
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                    </div>

                    <div className={classes.input_section}>
                    <label>Password: </label>
                    <input
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                    </div>

                    <div className={classes.input_section}>
                    <label>Confirm Password: </label>
                    <input
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                    </div>
                    
                    <button type='submit'>Register</button>
                </form>
                <p>
                    Already have an Account? <Link to='/login'>Log In</Link>
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });

export default connect(mapStateToProps, { register })(Register);