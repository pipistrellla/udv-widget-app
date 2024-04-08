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

export enum WidgetSize {
    LARGE = 'large',
    SMALL = 'small',
    MEDIUM = 'medium',
}
