import React, { FC } from 'react';
import cls from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode
    visible: boolean
    setVisible: (a:boolean) => void
}

const Modal: FC<ModalProps> = ({ children, visible, setVisible }) => {

    const rootClasses = [cls.Modal];
    const contenClasses = [cls.ModalContent];

    if (visible) {

        rootClasses.push(cls.active);
        contenClasses.push(cls.active);

    }

    return (
        /* eslint-disable jsx-a11y/click-events-have-key-events */
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        <div
            className={visible ? rootClasses.join(' ') : cls.ModalHiden}
            onClick={() => setVisible(false)}
        >
            <div
                className={visible ? contenClasses.join(' ') : cls.ModalContentHiden}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );

};

export default Modal;
