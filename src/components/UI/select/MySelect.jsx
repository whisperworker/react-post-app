import React from 'react';


const MySelect = ({option, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            /*Передаем в функцию значение которое выбрал пользователь*/
            onChange={event => onChange(event.target.value)}
        >
            {/*Добавляем дефолтную опцию*/}
            <option disabled={true} value="">{defaultValue}</option>
            {/*Итерируемся по массиву опций и по каждой опции
                отрисовываем html тег option*/}
            {option.map(option =>
                /*Как value указываем поле value из объекта*/
                <option key={option.value} value={option.value}>
                    {/*Далее достаем то что поместим внутрь этой опции*/}
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;