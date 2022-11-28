import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material'
import {Checkbox, IconButton} from '@mui/material'
import Button from '@mui/material/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (toDoListID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (toDoListID: string, title: string) => void
    changeTaskStatus: (toDoListID: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID: string
    removeToDoList: (toDoListID: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const onFilterClickHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todolistID, filter)
    }

    const removeToDoListHandler = () => {
        props.removeToDoList(props.todolistID)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title}/>
            <IconButton onClick={removeToDoListHandler}>
               <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id} className={t.isDone ? 'is-done' : ''}>

                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>

                        {/*<input type="checkbox"*/}
                        {/*       checked={t.isDone}*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*/>*/}
                        <Checkbox
                            checked={t.isDone}
                            color='primary'
                            onChange={onChangeHandler}
                            size='medium'
                        />

                        <EditableSpan title={t.title}/>

                    </li>
                )
            })}
        </ul>
        <div>
            <Button variant ={props.filter==='all'?'outlined':'text'} onClick={() => onFilterClickHandler('all')} color ='primary'>All</Button>
            <Button variant ={props.filter==='active'?'outlined':'text'}  onClick={() => onFilterClickHandler('active')} color ='primary'>Active</Button>
            <Button variant ={props.filter==='completed'?'outlined':'text'}  onClick={() => onFilterClickHandler('completed')} color ='primary'>Completed</Button>
        </div>
    </div>
}
