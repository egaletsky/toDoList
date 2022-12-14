import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';
import {userReducer} from './state/user-reducer';
import {addTodolistAC, changeFilterAC, removeTodolistAC, toDoListsReducer} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type  StateTaskType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, dispatchToDoLists] = useReducer(toDoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        let action = addTodolistAC(title)
        dispatchToDoLists(action)
        dispatchTasks(action)

    }
    const removeToDoList = (toDoListID: string) => {
        dispatchToDoLists(removeTodolistAC(toDoListID))
        dispatchTasks(removeTodolistAC(toDoListID))
    }

    function changeFilter(toDoListID: string, value: FilterValuesType) {
        dispatchToDoLists(changeFilterAC(value,toDoListID))
    }


    function addTask(toDoListID: string, title: string) {
        dispatchTasks(addTaskAC(toDoListID, title))
    }

    function removeTask(toDoListID: string, id: string) {
        dispatchTasks(removeTaskAC(toDoListID, id))
    }

    const changeTaskStatus = (toDoListID: string, id: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(toDoListID, id, isDone))
    }

    return (
        <div className="App">

            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
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


export default AppWithReducers;
