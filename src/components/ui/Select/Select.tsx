import React, { FC, SelectHTMLAttributes } from 'react';
import cls from './Select.module.css';

interface IOptions {
    name: string,
    value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    defaultValue: string;
    options: IOptions[]
}

const Select: FC<SelectProps> = (props) => {

    const {
        defaultValue,
        options,
        ...otherProps
    } = props;

    return (
        <select
            {...otherProps}
            className={cls.Select}
            value={defaultValue}
        >
            <option disabled value={defaultValue}>
                {' '}
                {defaultValue}
                {' '}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {' '}
                    {option.name}
                    {' '}
                </option>
            ))}
        </select>
    );

};

export default Select;
