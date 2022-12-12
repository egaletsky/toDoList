import {StateTaskType, TodoListsType} from '../App';
import {addTodolistAC, toDoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: StateTaskType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = toDoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.toDoLisID)
    expect(idFromTodolists).toBe(action.payload.toDoLisID)
})
