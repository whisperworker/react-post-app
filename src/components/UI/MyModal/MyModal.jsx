import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {


    const rootClasses = [classes.myModal]

    /*Сделать компонент видимым при true*/
    if(visible) {
        /*Добавить класс в массив*/
        rootClasses.push(classes.active);
    }

    return (
        /*Определяем добавлять ли класс active; При клике на облать элемента передаем значение в состояние*/
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/*Предотвращаем скрытие элемента по клику в контентной области*/}
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;