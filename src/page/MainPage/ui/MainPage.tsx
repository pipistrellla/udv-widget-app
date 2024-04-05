import React, { FC } from 'react';
import { LineForWidget } from 'widget/LineForWidget';
import cls from './MainPage.module.css';

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = () => {

    const aboba = '';
    return (
        <div className={cls.MainPage}>
            <LineForWidget />
            <LineForWidget />
            <LineForWidget />
        </div>
    );

};

export default MainPage;
