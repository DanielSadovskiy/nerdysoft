import React, { PureComponent,useState, useEffect} from 'react';
import { TaskItem } from './TaskItem';
import styles from '../scss/TaskList.scss'


export const TaskList = ({tasks}) => {
    const [taskList, setList] = useState(0);
    useEffect(()=>{

    },[tasks])
    console.log(tasks);
    return(
        <div>
        <ul className={styles.taskList}>
            {tasks && tasks['tasks'] && tasks['tasks'].map((item,index)=>(
                <li key={index}>
                    <TaskItem task={item}/>
                </li>
            ))}
        </ul>
        </div>
    )
}