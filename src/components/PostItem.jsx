import React from 'react';
import MyButton from "./UI/button/MyButton";

/*Принимаем prop поста*/
const PostItem = (props) => {
    return (
        <div>
            <div className="post">
                <div className="post__content">
                    {/*Записываем в заголовок данные полученного пропа*/}
                    <strong>{props.number}. {props.post.title}</strong>
                    <div>
                        {/*Записываем в описание данные полученного пропа*/}
                        {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    {/*Вызов функции удаления по id поста*/}
                    <MyButton onClick={() => props.remove(props.post)}>
                        Delete
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;