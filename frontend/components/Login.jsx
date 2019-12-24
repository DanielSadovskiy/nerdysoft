import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../scss/Auth.scss';
import jwt from 'jsonwebtoken';

const customStyles = {
    content: {
        position: 'absolute',
        top: '35%',
        left: '40%',
        width: '30%',
        height: '40%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-25%, -30%)',
    },
    overlay: {
        backgroundColor: '#ffefd5dd',
    },
};

export class Login extends PureComponent {
    state = {
        loginModalIsOpen: false,
        email: '',
        login: '',
        password: '',
        confirm: '',
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/" />
        } else {
            console.log("hello");
            this.setState({
                loginModalIsOpen: true
            })
            Modal.setAppElement('body');
        }

    }

    valueChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    login() {
        this.props.loginUser({email: this.state.email, password: this.state.password})
            .then(res => {
                if(res.data.loginUser !== null){
                    const token = res.data.loginUser.token
                    localStorage.setItem("token",token);
                    const user = jwt.decode(token);
                    console.log(user);
                    this.props.login({nickname: user.name, email: user.email});
                    this.props.history.push('/');
                }else{
                    alert("Password is wrong");
                }
            });
    }

    render() {
        console.log(this.state);
        const { loginModalIsOpen } = this.state;
        return (
            <div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <p className={styles.authTitle}>Login</p>
                    <form className={styles.authForm}>
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.valueChange}
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.valueChange}
                        />
                        <button
                            className={styles.signInBtn}
                            onClick={e => {
                                e.preventDefault();
                                this.login();
                            }}
                            type="submit"
                        >
                            <p>Login</p>
                        </button>
                    </form>
                    <Link to="/register" className={styles.accAlready}>have no account?</Link>
                </Modal>
            </div>
        );
    }
}
