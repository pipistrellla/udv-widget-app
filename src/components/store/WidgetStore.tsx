import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';
import { IWidgetBoard, IWidgetStore } from 'components/models/projectModels';
import Stopwatch from 'components/widgets/Stopwatch/Stopwatch';
import Timer from 'components/widgets/Timer/Timer';
import Weather from 'components/widgets/Weather/Weather';

export const useWidgetStore = create<IWidgetStore>()(persist(
    devtools(
        immer((set) => ({
            activeWidgets: JSON.stringify([
                {
                    id: 1,
                    items: [
                        { id: 1, title: <Stopwatch /> },
                        { id: 4, title: <Timer /> },
                    ],
                },
                {
                    id: 2,
                    items: [
                        { id: 2, title: <Stopwatch /> },
                    ],
                },
                {
                    id: 3,
                    items: [
                        { id: 3, title: <Stopwatch /> },
                    ],
                },

            ]),

            setWidgetBoard: (widgetBoard) => set((state) => (
                {
                    activeWidgets: widgetBoard,
                }
            ), false, 'change boards'),

        })),
        // тут указываем для devtools чтобы в инструментах разрабочика отображались стейты
        {
            name: 'widgets store',
        },
    ),
    // тут указываем для persist (сохранение в localstorage)
    {
        name: 'useWidgetStore',
    },
));
