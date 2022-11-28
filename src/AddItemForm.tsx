import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import Button from '@mui/material/Button';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <TextField variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error ={!!error}
                       label ='Title'
                       helperText={error}
            />

            {/*<button onClick={addItem}>+</button> */}
            {/*<Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}*/}
            {/*        variant="contained" color="primary" onClick={addItem}>+</Button>*/}
            <IconButton
                color="primary"
                onClick={addItem}>
                <AddBox/>

            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}

        </div>
    );
};

