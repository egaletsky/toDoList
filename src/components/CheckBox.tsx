import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
   callback:(checkedValue:boolean)=>void
    isDone:boolean

}


export const CheckBox= (props: CheckBoxPropsType) => {

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        props.callback(e.currentTarget.checked)
    }
    return (
        <input type={'checkbox'}
               checked={props.isDone}
               color='primary'
               onChange={onChangeHandler}

        />
    );
};

