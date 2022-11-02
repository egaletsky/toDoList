import React, {ChangeEvent, useState, KeyboardEvent } from 'react';
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
    addTask: (title:string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')

    const addTask =()=>{
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            addTask()
        }
    }
    const onFilterClickHandler =(filer:FilterValuesType)=>{
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
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { props.removeTask(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ () =>  onFilterClickHandler("all")  }>
                All
            </button>
            <button onClick={ () => onFilterClickHandler("active")  }>
                Active
            </button>
            <button onClick={ () => onFilterClickHandler("completed")  }>
                Completed
            </button>
        </div>
    </div>
}
