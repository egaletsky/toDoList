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
import {AppRootStateType} from './state/store';
import {useDispatch, useSelector} from 'react-redux';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type  StateTaskType = {
    [key: string]: TaskType[]
}

function AppRedux() {


    let todolists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, StateTaskType>(state => state.tasks)

    const dispatch = useDispatch()



    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))

    }
    const removeToDoList = (toDoListID: string) => {
        dispatch(removeTodolistAC(toDoListID))
    }

    function changeFilter(toDoListID: string, value: FilterValuesType) {
        dispatch(changeFilterAC(value,toDoListID))
    }


    function addTask(toDoListID: string, title: string) {
        dispatch(addTaskAC(toDoListID, title))
    }

    function removeTask(toDoListID: string, id: string) {
        dispatch(removeTaskAC(toDoListID, id))
    }

    const changeTaskStatus = (toDoListID: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(toDoListID, id, isDone))
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


export default AppRedux;
