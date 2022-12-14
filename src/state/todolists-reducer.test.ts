import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    toDoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListsType} from '../App';


let todolistID1: string
let todolistID2: string
let startState: Array<TodoListsType>


beforeEach(() => {

    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})


test('correct todolist should be removed', () => {

    const endState = toDoListsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {

    let newToDoListName = 'New Todolist'
    const endState = toDoListsReducer(startState, addTodolistAC(newToDoListName))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newToDoListName)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist';
    const endState = toDoListsReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';
    const endState = toDoListsReducer(startState, changeFilterAC(newFilter, todolistID2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});