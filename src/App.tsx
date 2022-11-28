import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}


type  StateTaskType = {
    [key: string]: TaskType[]
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

    const addTodoList = (title: string) => {
        let newToDoListID = v1()
        let newToDoList: TodoListsType = {id: newToDoListID, title: title, filter: 'all'}
        setTodolists([newToDoList, ...todolists])
        setTasks({...tasks, [newToDoListID]: []})

    }


    const removeToDoList = (toDoListID: string) => {
        setTodolists(todolists.filter(el => el.id !== toDoListID))
        delete tasks[toDoListID]
    }


    function addTask(toDoListID: string, title: string) {
        setTasks({...tasks, [toDoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[toDoListID]]})
        debugger

    }

    function removeTask(toDoListID: string, id: string) {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(el => el.id !== id)});
    }


    function changeFilter(toDoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === toDoListID ? {...el, filter: value} : el))
    }

    const changeTaskStatus = (toDoListID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(el => el.id === id ? {...el, isDone: isDone} : el)})
    }

    return (
        <div className="App">

            <AppBar position="sticky">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>

                <Typography variant="h6" component ='div' sx={{flexGrow:1}}>
                    Todolist
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>


            <Container fixed>

                <Grid container style={{padding: '10px'}}>
                    <Paper elevation={10}>
                        <AddItemForm addItem={addTodoList}/>
                    </Paper>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {

                        let tasksForTodolist = tasks[todolist.id];

                        if (todolist.filter === 'active') {
                            tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                        }


                        return <Grid item>
                            <Paper elevation={10} style={{padding: '10px'}}>
                                <Todolist key={todolist.id}
                                          todolistID={todolist.id}
                                          title={todolist.title}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={todolist.filter}
                                          removeToDoList={removeToDoList}/>
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
