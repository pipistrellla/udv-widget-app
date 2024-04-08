import React, { FC, InputHTMLAttributes } from 'react';
import cls from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}

const Input: FC<InputProps> = (props) => {

    const { ...otherProps } = props;
    return (

        <input {...otherProps} className={cls.Input} />

    );

};

export default Input;
