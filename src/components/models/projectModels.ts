import React from 'react';

export interface IWidget{
    id: number;
    title: any
}

export interface IWidgetBoard {
    id: number;
    items: IWidget[];
}

export enum WidgetsEnum {
    STOPWATCH= 'stopwatch',
    TIMER = 'timer',
    WEATHER = 'weather'
}

export interface IWidgetStore {
    activeWidgets: string,
    setWidgetBoard: (widgetBoard:IWidgetBoard[]) => void
}

export type WeatherData = {
    name: string
    main :{
        humidity: number
        temp: number
        feels_like: number
        pressure: number
    }
    wind: {
        speed: number
    }
    cod: number
    sys: {
        country: string
    }
}

export enum WeatherShow {
    SHORT = 'short',
    NORMAL = 'normal'
}

export enum TimerType {
    SILENT = 'Silent',
    NORMAL = 'Normal'
}
