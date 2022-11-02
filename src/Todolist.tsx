import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onFilterClickHandler = (filer: FilterValuesType) => {
        props.changeFilter(filer)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTask}>+</button>
        </div>

        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id)
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
                       props.changeTaskStatus(t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => onFilterClickHandler('all')}>
                All
            </button>
            <button onClick={() => onFilterClickHandler('active')}>
                Active
            </button>
            <button onClick={() => onFilterClickHandler('completed')}>
                Completed
            </button>
        </div>
    </div>
}
