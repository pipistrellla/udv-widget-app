import React, { FC } from 'react';
import cls from './WidgetWrap.module.css';

interface WidgetWrapProps {
    children: React.ReactNode
}

const WidgetWrap: FC<WidgetWrapProps> = ({ children }) => (
    <div className={cls.WidgetPage}>
        {children}
    </div>
);

export default WidgetWrap;
