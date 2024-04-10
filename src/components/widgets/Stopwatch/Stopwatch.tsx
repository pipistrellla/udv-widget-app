import React, { FC, useEffect, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import Button from 'components/ui/Button/Button';
import Select from 'components/ui/Select/Select';
import cls from './Stopwatch.module.css';

interface StopwatchProps {

}

const Stopwatch: FC<StopwatchProps> = () => {

    let min:number = 0;
    let hour:number = 0;
    let sec:number = 0;

    const [time, setTime] = useState<string>('00:00:00');
    const [isWorking, setIsWorking] = useState<boolean>(true);
    const [timer, setTimer] = useState<any>();
    const tick = () => {

        sec += 1;
        if (sec >= 60) {

            min += 1;
            sec -= 60;

        }
        if (min >= 60) {

            hour += 1;
            min -= 60;

        }
        if (sec < 10) {

            if (min < 10) {

                if (hour < 10)
                    setTime(`0${hour}:0${min}:0${sec}`);
                else
                    setTime(`${hour}:0${min}:0${sec}`);

            } else if (hour < 10)
                setTime(`0${hour}:${min}:0${sec}`);
            else
                setTime(`${hour}:${min}:0${sec}`);

        } else if (min < 10) {

            if (hour < 10)
                setTime(`0${hour}:0${min}:${sec}`);
            else
                setTime(`${hour}:0${min}:${sec}`);

        } else if (hour < 10)
            setTime(`0${hour}:${min}:${sec}`);
        else
            setTime(`${hour}:${min}:${sec}`);

    };

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        setIsWorking(!isWorking);
        if (isWorking)
            setTimer(setInterval(tick, 1000));
        else
            clearInterval(timer);

    };
    return (
        <WidgetWrap>
            <div className={cls.Stopwatch}>
                <div className={cls.Time}>
                    {time}
                </div>
                <div className={cls.Options}>
                    <Button
                        disabled={!isWorking}
                        type="button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
                    >
                        старт
                    </Button>
                    <Button
                        disabled={isWorking}
                        type="button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
                    >
                        стоп
                    </Button>

                </div>
            </div>
        </WidgetWrap>
    );

};

export default Stopwatch;
