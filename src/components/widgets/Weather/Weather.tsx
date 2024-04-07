import React, { FC } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import cls from './Weather.module.css';

interface WeatherProps {

}

const Weather: FC<WeatherProps> = () => (
    <WidgetWrap>
        Weather
    </WidgetWrap>
);

export default Weather;
