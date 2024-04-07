import React, { FC, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import cls from './Weather.module.css';

interface WeatherProps {

}
export type Data = {
    name: string
    main :{
        humidity: number
        temp: number
    }
    wind: {
        speed: number
    }
    cod: number
}

const Weather: FC<WeatherProps> = () => {

    const tempData:Data = {
        name: 'awdada',
        cod: 0,
        main: {
            humidity: 0,
            temp: 0,
        },
        wind: { speed: 0 },
    };
    const [data, setData] = useState<Data>(tempData);
    const [city, setCity] = useState<string>('asdadw');

    const APIkey = '266ebc241959f324799676335a82ba24';
    const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;

    const checkWeather = async () => {

        const response = await fetch(URL);
        setData(await response.json());
        console.log(data);

    };
    if (Number(data?.cod) === 404 || Number(data?.cod === 0)) {

        return (
            <div>
                <input
                    type="text"
                    placeholder="введите город"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                />
                <button type="button" onClick={() => checkWeather()}>поиск</button>
                {Number(data?.cod) === 404 ? <div>такого города не существует</div> : <div />}
            </div>
        );

    }

    return (
        <WidgetWrap>

            <div>
                Город:
                {data.name}
            </div>
            <div>
                Температура:
                {Math.round(data.main.temp)}
                в грудусах цельсия
            </div>
            <div>
                Влажность:
                {data.main.humidity}
                %
            </div>
            <div>
                Ветер:
                {data.wind.speed}
                км/ч
            </div>
        </WidgetWrap>
    );

};

export default Weather;
