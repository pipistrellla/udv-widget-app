import React, { FC, useState } from 'react';
import cls from './MainPage.module.css';

interface MainPageProps {

}

export interface IWidget{
    id: number;
    title: string
}

export interface IWidgetBoard {
    id: number;
    items: IWidget[];
}

const MainPage: FC<MainPageProps> = () => {

    const [WidgetBoards, setWidgetBoards] = useState<IWidgetBoard[]>([
        {
            id: 1,
            items: [
                { id: 1, title: '1л' },
                { id: 2, title: '2л' },
                { id: 3, title: '3л' }],
        },
        {
            id: 2,
            items: [
                { id: 4, title: '1center' },
                { id: 5, title: '2center' },
            ],
        },
        {
            id: 3,
            items: [
                { id: 6, title: '1 right' },
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

        const currentIndex = currentBoard!.items.indexOf(currentWidget!);
        currentBoard!.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(widget);
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
        const currentIndex = currentBoard!.items.indexOf(currentWidget!);
        currentBoard!.items.splice(currentIndex, 1);
        setWidgetBoards(WidgetBoards.map((b) => {

            if (b.id === board.id)
                return board;

            if (b.id === currentBoard!.id)
                return currentBoard!;

            return b;

        }));

    };

    const [text, setText] = useState<string>('123');

    const AddWidget = (text:string) => {

        setWidgetBoards(
            [
                WidgetBoards[0],
                WidgetBoards[1],
                { id: 3, items: [...WidgetBoards[2].items, { id: Date.now(), title: text }] },
            ],
        );

    };

    return (
        <div className={cls.MainPage}>

            <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
            <button type="button" onClick={() => AddWidget(text)}> добавить виджет </button>

            <div className={cls.MainPageBoard}>
                {WidgetBoards.map((board) => (
                    <div
                        onDragOver={(e:React.DragEvent<HTMLDivElement>) => DragOverHandler(e)}
                        onDrop={(e:React.DragEvent<HTMLDivElement>) => DropWidgetHandler(e, board)}
                        className={cls.MainPageWidgetBoard}
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
                            >
                                {widget.title}
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );

};

export default MainPage;
