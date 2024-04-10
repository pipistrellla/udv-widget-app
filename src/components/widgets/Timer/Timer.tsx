import React, { FC, useEffect, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import Button from 'components/ui/Button/Button';
import Input from 'components/ui/Input/Input';
import { TimerType } from 'components/models/projectModels';
import Select from 'components/ui/Select/Select';
import TimerAlert from 'components/ui/Button/TimerAlert/TimerAlert';
import Modal from 'components/ui/Modal/Modal';
import cls from './Timer.module.css';

interface TimerProps {

}

const Timer: FC<TimerProps> = () => {

    const [time, setTime] = useState<number>(1);
    const [TimerID, setTimerID] = useState<any>();
    const [isWorking, setIsWorking] = useState<boolean>(true);
    const [timerType, setTimerType] = useState<string>(TimerType.SILENT);
    const [visible, setVisible] = useState(false);

    const Timer = () => {

        setTime(((value) => value - 1));

    };

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        setIsWorking(!isWorking);
        if (isWorking)
            setTimerID(setInterval(Timer, 1000));
        else
            clearInterval(TimerID);

    };

    useEffect(() => {

        if (time <= 0) {

            if (!isWorking) {

                setIsWorking(!isWorking);
                setTime(0);
                setVisible(true);

            }
            clearInterval(TimerID);

        }

    }, [time]);

    return (
        <WidgetWrap>
            <div className={cls.Timer}>
                <div className={cls.Time}>
                    {time}
                </div>
                <Input
                    placeholder="кол-во секунд"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(+e.target.value)}
                    disabled={!isWorking}
                />
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
                <Select
                    disabled={!isWorking}
                    className={cls.Select}
                    defaultValue={timerType === TimerType.NORMAL ? 'с индикацией' : 'без индикации'}
                    options={[
                        { value: TimerType.NORMAL, name: 'с индикацией' },
                        { value: TimerType.SILENT, name: 'без индикации' },
                    ]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {

                        setTimerType(e.target.value);
                        setVisible(false);

                    }}
                />
            </div>
            { timerType === TimerType.NORMAL
                ? (
                    <Modal visible={visible} setVisible={setVisible}>
                        <TimerAlert visible={visible} />
                    </Modal>
                )
                : ''}

        </WidgetWrap>
    );

};

export default Timer;
