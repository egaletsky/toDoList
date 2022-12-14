import { StateTaskType} from '../App';
import {v1} from 'uuid';
import { AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';

type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

const initialState: StateTaskType = {}

export const tasksReducer = (state: StateTaskType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].filter(t => t.id !== action.payload.taskID)
            }

        case 'ADD-TASK': {

            let taskNew = {id: v1(), title: action.payload.title, isDone: false};
            state[action.payload.toDoListID] = [taskNew, ...state[action.payload.toDoListID]]
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {

            const task = state[action.payload.toDoListID].find(t => t.id === action.payload.taskID);
            if (task) {
                task.isDone = action.payload.isDone
            }
            return {...state}
        }

        case 'CHANGE-TASK-TITLE': {

            const task = state[action.payload.toDoListID].find(t => t.id === action.payload.taskID);
            if (task) {
                task.title = action.payload.title
            }
            return {...state}
        }
        case 'ADD-TODOLIST': {

          return {
              ...state,
              [action.payload.toDoLisID]:[]
          }
        }

        case 'REMOVE-TODOLIST': {
            // let copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
            let {[action.payload.id]:[] , ...rest} = {...state}
            return rest
        }

        default:
            return state
    }


}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (toDoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            toDoListID,
            taskID
        }
    } as const

}
export const addTaskAC = (toDoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            toDoListID,
            title
        }
    } as const

}
export const changeTaskStatusAC = (toDoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            toDoListID,
            taskID,
            isDone
        }
    } as const

}
export const changeTaskTitleAC = (toDoListID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            toDoListID,
            taskID,
            title
        }
    } as const

}


