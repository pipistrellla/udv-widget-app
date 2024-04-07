import React, { FC, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import Stopwatch from 'components/widgets/Stopwatch/Stopwatch';
import Timer from 'components/widgets/Timer/Timer';
import Weather from 'components/widgets/Weather/Weather';
import cls from './MainPage.module.css';

interface MainPageProps {

}

export interface IWidget{
    id: number;
    title: any
}

export interface IWidgetBoard {
    id: number;
    items: IWidget[];
}

enum WidgetsEnum {
    STOPWATCH= 'stopwatch',
    TIMER = 'timer',
    WEATHER = 'weather'
}

const MainPage: FC<MainPageProps> = () => {

    const [WidgetBoards, setWidgetBoards] = useState<IWidgetBoard[]>([
        {
            id: 1,
            items: [
                { id: 1, title: <Stopwatch /> },
            ],
        },
        {
            id: 2,
            items: [
                { id: 4, title: <Timer /> },
            ],
        },
        {
            id: 3,
            items: [
                { id: 6, title: <Weather /> },
            ],
        },

    ]);

    const [currentBoard, setCurrentBoard] = useState<IWidgetBoard | null>(null);
    const [currentWidget, setCurrentWidget] = useState<IWidget | null>(null);

    const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault();

        if ((e.target as HTMLDivElement).className === cls.Widget)
            (e.target as HTMLDivElement).style.boxShadow = '0 4px 3px gray';

    };

    const DragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {

        (e.target as HTMLDivElement).style.boxShadow = 'none';

    };

    const DragStartHandler = (e: React.DragEvent<HTMLDivElement>, board:IWidgetBoard, widget:IWidget) => {

        setCurrentBoard(board);
        setCurrentWidget(widget);

    };

    const DragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {

        (e.target as HTMLDivElement).style.boxShadow = 'none';

    };

    const DropHandler = (e: React.DragEvent<HTMLDivElement>, board:IWidgetBoard, widget:IWidget) => {

        e.preventDefault();

        const currentIndex:number = currentBoard!.items.indexOf(currentWidget!);
        currentBoard!.items.splice(currentIndex, 1);
        const dropIndex:number = board.items.indexOf(widget);
        board.items.splice(dropIndex + 1, 0, currentWidget!);

        setWidgetBoards(WidgetBoards.map((b) => {

            if (b.id === board.id)
                return board;

            if (b.id === currentBoard!.id)
                return currentBoard!;

            return b;

        }));

    };

    const DropWidgetHandler = (e:React.DragEvent<HTMLDivElement>, board:IWidgetBoard) => {

        if (board.items.length !== 0)
            return;

        board.items.push(currentWidget!);
        const currentIndex:number = currentBoard!.items.indexOf(currentWidget!);
        currentBoard!.items.splice(currentIndex, 1);
        setWidgetBoards(WidgetBoards.map((b) => {

            if (b.id === board.id)
                return board;

            if (b.id === currentBoard!.id)
                return currentBoard!;

            return b;

        }));

    };

    const [text, setText] = useState<string | null>(null);

    const Widgets = new Map<string, React.ReactNode>([
        ['stopwatch', <Stopwatch />],
        ['timer', <Timer />],
        ['weather', <Weather />],

    ]);

    const AddWidget = (text:string | null) => {

        if (text !== null) {

            setWidgetBoards(
                [
                    WidgetBoards[0],
                    WidgetBoards[1],
                    {
                        id: 3,
                        items: [...WidgetBoards[2].items, {
                            id: Date.now(),
                            title: <WidgetWrap>{Widgets.get(text)}</WidgetWrap>,
                        }],
                    },
                ],
            );

        }

    };

    const deleteWidget = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        widget:IWidget,
        board:IWidgetBoard,
    ):void => {

        e.preventDefault();

        const currentIndex:number = board!.items.indexOf(widget!);
        board.items.splice(currentIndex, 1);
        setWidgetBoards(WidgetBoards.map((b) => {

            if (b.id === board.id)
                return board;

            if (b.id === board!.id)
                return board!;

            return b;

        }));

    };
    return (
        <div className={cls.MainPage}>

            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setText(e.target.value)}>
                <option disabled selected value="null"> выберите виджет для добавления</option>
                <option value={WidgetsEnum.STOPWATCH}>Секундомер</option>
                <option value={WidgetsEnum.TIMER}>Таймер</option>
                <option value={WidgetsEnum.WEATHER}>Прогноз погоды</option>
            </select>
            <button type="button" onClick={() => AddWidget(text)}> добавить виджет </button>

            <div className={cls.MainPageBoard}>
                {WidgetBoards.map((board) => (
                    <div
                        onDragOver={(e:React.DragEvent<HTMLDivElement>) => DragOverHandler(e)}
                        onDrop={(e:React.DragEvent<HTMLDivElement>) => DropWidgetHandler(e, board)}
                        className={cls.MainPageWidgetBoard}
                        key={board.id}
                    >

                        {board.items.map((widget) => (
                            <div
                                onDragOver={(e:React.DragEvent<HTMLDivElement>) => DragOverHandler(e)}
                                onDragLeave={(e:React.DragEvent<HTMLDivElement>) => DragLeaveHandler(e)}
                                onDragStart={(e:React.DragEvent<HTMLDivElement>) => DragStartHandler(e, board, widget)}
                                onDragEnd={(e:React.DragEvent<HTMLDivElement>) => DragEndHandler(e)}
                                onDrop={(e:React.DragEvent<HTMLDivElement>) => DropHandler(e, board, widget)}
                                className={cls.Widget}
                                draggable
                                key={widget.id}
                            >
                                {widget.title}
                                <button
                                    type="button"
                                    onClick={
                                        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteWidget(e, widget, board)
                                    }
                                >
                                    удалить
                                </button>
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );

};

export default MainPage;
