import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title:string
}

export const EditableSpan = (props:EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = ()=>{
        setEditMode(true)
    }

    const activateViewMode = ()=>{
        setEditMode(false)
    }


    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler= (e:KeyboardEvent<HTMLInputElement>)=> {
        if(e.key === 'Enter'){
            activateViewMode()
        }
    }

    return (
        editMode
            ?
            <TextField variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       onBlur={activateViewMode}

                       autoFocus
            />


            :<span onDoubleClick={activateEditMode}>{title}</span>

    );
};

