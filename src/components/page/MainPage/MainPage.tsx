import React, { FC, useState } from 'react';
import WidgetWrap from 'components/ui/WidgetWrap/WidgetWrap';
import Stopwatch from 'components/widgets/Stopwatch/Stopwatch';
import Timer from 'components/widgets/Timer/Timer';
import Weather from 'components/widgets/Weather/Weather';
import { IWidgetBoard, IWidget, WidgetsEnum } from 'components/models/projectModels';
import Button from 'components/ui/Button/Button';
import Select from 'components/ui/Select/Select';
import cls from './MainPage.module.css';

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = () => {

    const [WidgetBoards, setWidgetBoards] = useState<IWidgetBoard[]>(
        [
            { id: 1, items: [] },
            { id: 2, items: [] },
            { id: 3, items: [] },
        ],
    );

    const [currentBoard, setCurrentBoard] = useState<IWidgetBoard | null>(null);
    const [currentWidget, setCurrentWidget] = useState<IWidget | null>(null);
    // -----------------------------------------------------------------------
    // работа с drag and drop
    const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault();

        if ((e.target as HTMLDivElement).className === cls.Widget)
            (e.target as HTMLDivElement).style.boxShadow = '4px 20px 20px -10px black';

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

        (e.target as HTMLDivElement).style.boxShadow = 'none';
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
    // ---------------------------------------------------------------------------------------------------------------
    const [text, setText] = useState<string>('Выберите виджет');

    const Widgets = new Map<string, React.ReactNode>([
        ['stopwatch', <Stopwatch />],
        ['timer', <Timer />],
        ['weather', <Weather />],

    ]);

    const AddWidget = (text:string) => {

        if (text !== 'Выберите виджет') {

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
            <Select
                defaultValue="Выберите виджет"
                options={
                    [
                        { value: WidgetsEnum.STOPWATCH, name: 'Секундомер' },
                        { value: WidgetsEnum.TIMER, name: 'Таймер' },
                        { value: WidgetsEnum.WEATHER, name: 'Прогноз погоды' },
                    ]
                }
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setText(e.target.value)}
            />
            <Button onClick={() => AddWidget(text)}> добавить виджет </Button>

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
                                <Button
                                    onClick={
                                        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteWidget(e, widget, board)
                                    }
                                >
                                    удалить
                                </Button>
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );

};

export default MainPage;
