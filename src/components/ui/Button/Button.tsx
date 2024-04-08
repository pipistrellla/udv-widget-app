import React, { FC, ButtonHTMLAttributes } from 'react';
import cls from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: FC<ButtonProps> = (props) => {

    const {
        children,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={cls.Button}
            {...otherProps}
        >
            {children}
        </button>
    );

};

export default Button;
