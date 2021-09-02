import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

//Вызываем функцию create
const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})


    const addNewPost = (e) => {
        e.preventDefault()
        //Создаем новый объект
        const newPost = {
            ...post, id: Date.now()
        }
        //Передаем newPost в create
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <div>
            <form action="">
                {/*Управляемый компонент*/}
                <MyInput
                    value={post.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    type="text"
                    placeholder="Название поста"
                />
                <MyInput
                    value={post.body}
                    onChange={e => setPost({...post, body: e.target.value})}
                    type="text"
                    placeholder="Описание поста"
                />
                <MyButton onClick={addNewPost}>Добавить</MyButton>
            </form>
        </div>
    );
};

export default PostForm;