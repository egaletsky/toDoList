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
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}

        </div>

        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id} className={t.isDone?'is-done':''}>
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
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => onFilterClickHandler('all')}>
                All
            </button>

            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => onFilterClickHandler('active')}>
                Active
            </button>

            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => onFilterClickHandler('completed')}>
                Completed
            </button>
        </div>
    </div>
}
