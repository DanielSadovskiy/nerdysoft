import React from 'react';
import styles from '../scss/TaskItem.scss'

export const TaskItem = ({task}) => {
    return(
        <div className={styles.taskItem}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <a href={`mailto:${task.createdBy}`}>{task.createdBy}</a>
        </div>
    )
}