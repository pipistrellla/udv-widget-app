import React, { FC, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import { WeatherData, WeatherShow } from 'components/models/projectModels';
import Button from 'components/ui/Button/Button';
import Input from 'components/ui/Input/Input';
import Select from 'components/ui/Select/Select';
import cls from './Weather.module.css';

interface WeatherProps {

}

const Weather: FC<WeatherProps> = () => {

    const [weatherType, setWeatherType] = useState<string>(WeatherShow.NORMAL);
    const tempData:WeatherData = {
        sys: { country: '' },
        name: 'awdada',
        cod: 0,
        main: {
            humidity: 0,
            temp: 0,
            feels_like: 0,
            pressure: 0,
        },
        wind: { speed: 0 },
    };
    const [data, setData] = useState<WeatherData>(tempData);
    const [city, setCity] = useState<string>('asdadw');

    const APIkey = '266ebc241959f324799676335a82ba24';
    const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;

    const checkWeather = async () => {

        const response = await fetch(URL);
        setData(await response.json());

    };

    if (Number(data?.cod) === 404 || Number(data?.cod === 0)) {

        return (
            <WidgetWrap>
                <div className={cls.Weather}>
                    <Input
                        type="text"
                        placeholder="введите город"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                    />
                    <Button onClick={() => checkWeather()}>поиск</Button>
                    <Select
                        defaultValue={weatherType === WeatherShow.NORMAL ? 'стандартный' : 'краткий'}
                        options={[
                            { value: WeatherShow.NORMAL, name: 'стандартный' },
                            { value: WeatherShow.SHORT, name: 'краткий' },
                        ]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWeatherType(e.target.value)}

                    />
                    {Number(data?.cod) === 404 ? <div>такого города не существует</div> : <div />}
                </div>
            </WidgetWrap>
        );

    }

    return (
        <WidgetWrap>
            <div className={cls.WeatherShow}>
                <div>
                    Город:
                    {data.name}
                </div>
                <div>
                    Температура:
                    {Math.round(data.main.temp)}
                    °C
                </div>
                {weatherType === WeatherShow.NORMAL ? (
                    <div>
                        По ощущениям:
                        {Math.round(data.main.feels_like)}
                        °C
                    </div>
                )
                    : ''}
                {weatherType === WeatherShow.NORMAL ? (
                    <div>
                        Давление:
                        {Math.round(data.main.pressure)}
                        мм рт. ст.
                    </div>
                )
                    : ''}
                {weatherType === WeatherShow.NORMAL ? (
                    <div>
                        Влажность:
                        {data.main.humidity}
                        %
                    </div>
                )
                    : ''}
                {weatherType === WeatherShow.NORMAL ? (
                    <div>
                        Ветер:
                        {data.wind.speed}
                        км/ч
                    </div>
                ) : ''}
                {weatherType === WeatherShow.NORMAL ? (
                    <div>
                        Страна:
                        {data.sys.country}
                    </div>
                ) : ''}
                <div className={cls.WeatherBtn}>
                    <Button onClick={() => checkWeather()}>обновить</Button>
                    <Button onClick={() => {

                        setData(tempData);
                        setCity('asda');

                    }}
                    >
                        вернуться назад
                    </Button>
                </div>
            </div>
        </WidgetWrap>
    );

};

export default Weather;
