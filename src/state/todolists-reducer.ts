import {FilterValuesType, TodoListsType} from '../App';
import {v1} from 'uuid';

type ActionType = RemoveTodolistACType|
    AddTodolistACType|
    changeTodolistTitleAC|
    changeFilterAC


export const toDoListsReducer = (state: TodoListsType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.payload.id)
        case 'ADD-TODOLIST':
            let newTodolist: TodoListsType = {id: v1() , title: action.payload.title, filter: 'all'};
            return [...state,newTodolist]
        case 'CHANGE-TODOLIST-TITLE':

            return state.map(el => el.id===action.payload.id? {...el,title:action.payload.title}:el)
        case 'CHANGE-TODOLIST-FILTER':

            return state.map(el =>el.id===action.payload.id?{...el,filter:action.payload.filter}:el)
        default:
            return state
    }



}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type changeFilterAC = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (toDoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            id: toDoListID}
    } as const

}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload:{
            title: title}
    } as const

}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{
            id:id,
            title: title}
    } as const

}

export const changeFilterAC = (value: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{
            id:id,
            filter: value}
    } as const

}

