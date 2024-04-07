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
