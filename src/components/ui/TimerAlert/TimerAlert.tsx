import React, { FC } from 'react';
import cls from './TimerAlert.module.css';

interface TimerAlertProps {
    visible: boolean
}

const TimerAlert: FC<TimerAlertProps> = ({ visible }) => (
    <div className={visible ? cls.TimerAlert : cls.TimeAlertHide}>
        Таймер окончен!!!
    </div>
);

export default TimerAlert;
