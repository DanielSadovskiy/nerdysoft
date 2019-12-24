import React, { PureComponent } from 'react';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../scss/Auth.scss';
import {jwt} from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
const customStyles = {
    content: {
        position: 'absolute',
        top: '35%',
        left: '40%',
        width: '30%',
        height: '52%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-25%, -30%)',
    },
    overlay: {
        backgroundColor: '#ffefd5dd',
    },
};

export class Register extends PureComponent {
    state = {
        registerModalIsOpen: false,
        email: '',
        login: '',
        password: '',
        confirm: '',
    };

    componentDidMount() {
        console.log(this.props);
        if (localStorage.getItem('token')) {
            console.log("hello2");
            return <Redirect to="/" />
        } else {
            console.log("hello");
            this.setState({
                registerModalIsOpen: true
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

    async registrateNewUser() {
        if (this.state.password !== this.state.confirm) {
            alert('confirm password should be equal two password');
        } else if(this.state.password.length < 6){
            alert('password should be longer than 6 symbols');
        } else{
            const hashedPass = await bcrypt.hash(this.state.password,10)
            this.props
                .addUser({
                    nickname: this.state.login,
                    email: this.state.email,
                    password: hashedPass,
                }).then(res=> window.location.href="/login")
                
        }
    }

    render() {
        console.log(this.state);
        const { registerModalIsOpen } = this.state;
        return (
            <div>
                <Modal
                    isOpen={registerModalIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <p className={styles.authTitle}>Register your account</p>
                    <form className={styles.authForm}>
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.valueChange}
                        />
                        <input
                            placeholder="Login"
                            name="login"
                            type="text"
                            onChange={this.valueChange}
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.valueChange}
                        />
                        <input
                            placeholder="Confirm password"
                            name="confirm"
                            type="password"
                            onChange={this.valueChange}
                        />
                        <button
                            className={styles.signInBtn}
                            onClick={e => {
                                e.preventDefault();
                                this.registrateNewUser();
                            }}
                            type="submit"
                        >
                            <p>Register</p>
                        </button>
                    </form>
                    <Link to="/login" className={styles.accAlready}>already have an account?</Link>
                </Modal>
            </div>
        );
    }
}
