import React, { useEffect, useState } from 'react';
import basicStyles from '../styles/main.scss';
import { queries } from '../actions/queries';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styles from '../scss/HomePage.scss'
import jwt from 'jsonwebtoken';
import { TaskList } from './TaskList';
import { CreateUpdateModal } from './CreateUpdateModal';

const customStyles = {
    content: {
        top: '25%',
        left: '40%',
        width: '40%',
        height: '60%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-25%, -30%)',
    },
    overlay: {
        backgroundColor: '#ffefd5dd',
    },
};

export const HomePage = ({ nickname, email, setTasks, tasks, login, Logout }) => {
    const [modalIsOpen, toggleModal] = useState(false);
    const openModal = () => {
        toggleModal(true);
    };
    const closeModal = () => {
        toggleModal(false);
    };
    useEffect(() => {
        if (nickname === "" && localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const user = jwt.decode(token);
            login({ nickname: user.name, email: user.email });
        }
    }, [])
    const { data, loading, error } = useQuery(
        queries.taskQueries.GET_TASKS,
        { variables: { email:email } }
      );
    setTasks(data);
    const logout = () => {
        localStorage.removeItem("token");
        Logout();
    }
    console.log('state',modalIsOpen)
    return (
        <div className={basicStyles.wrapper}>
            {localStorage.getItem("token") ?
                <React.Fragment>
                    <nav className={styles.nav}>
                        <ul>
                            <li>
                                <button onClick={(e)=>{
                                    e.preventDefault();
                                    openModal();
                                }}>create</button>
                            </li>
                            <li>
                                <Link to="/" className={styles.nicknameBtn}>
                                    <button>{nickname ? nickname : "my name"}</button>
                                    <button onClick={logout}>Logout</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <TaskList email={email} setTasks={setTasks} tasks={tasks} />
                </React.Fragment> : <Redirect to="/register" />}
                <CreateUpdateModal 
                    modalIsOpen={modalIsOpen}
                    customStyles={customStyles}
                    closeModal={closeModal}
                />
        </div>
        
    )
}
