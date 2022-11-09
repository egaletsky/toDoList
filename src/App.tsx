import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}



type  StateTaskType = {
    [key:string]:TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, setTodolists] = useState<TodoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<StateTaskType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeToDoList = (toDoListID: string)=>{
        setTodolists(todolists.filter(el=>el.id!==toDoListID))
        delete tasks[toDoListID]
    }


    function addTask(toDoListID: string, title: string) {
        setTasks({...tasks, [toDoListID]: [ {id: v1(), title: title, isDone: false} , ...tasks[toDoListID]]})


    }

    function removeTask(toDoListID: string, id: string) {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(el=>el.id!==id)});
    }


    function changeFilter(toDoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el=>el.id===toDoListID? {...el, filter:value} : el))
    }

    const changeTaskStatus = (toDoListID: string, id: string, isDone: boolean) => {
        setTasks({ ...tasks ,[toDoListID]: tasks[toDoListID].map(el=>el.id===id ? {...el, isDone: isDone } : el  )})
    }

    return (
        <div className="App">
            {todolists.map(todolist => {

                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                }


                return <Todolist key={todolist.id}
                                 todolistID={todolist.id}
                                 title={todolist.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={todolist.filter}
                                 removeToDoList={removeToDoList}/>

            })}
        </div>
    );
}


export default App;
