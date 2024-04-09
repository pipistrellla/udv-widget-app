import React, { FC, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import { Data } from 'components/models/projectModels';
import Button from 'components/ui/Button/Button';
import Input from 'components/ui/Input/Input';
import Select from 'components/ui/Select/Select';
import cls from './Weather.module.css';

interface WeatherProps {

}

const Weather: FC<WeatherProps> = () => {

    const [weatherType, setWeatherType] = useState('стандартный');
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

    };
    if (Number(data?.cod) === 404 || Number(data?.cod === 0)) {

        return (
            <div className={cls.Weather}>
                <Input
                    type="text"
                    placeholder="введите город"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                />
                <Button onClick={() => checkWeather()}>поиск</Button>
                <Select
                    defaultValue="Тип информации"
                    options={[
                        { value: 'подробный', name: 'подробный' },
                        { value: 'стандартный', name: 'стандартный' },
                        { value: 'краткий', name: 'краткий' },
                    ]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWeatherType(e.target.value)}

                />
                {Number(data?.cod) === 404 ? <div>такого города не существует</div> : <div />}
            </div>
        );

    }
    console.log(weatherType);
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
