import React, {useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";


function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "Python", body: 'Python - Язык программирования'},
        {id: 3, title: "JS Hooks", body: 'JavaScript - Язык программирования'},
        {id: 2, title: "Ajax principles", body: 'Ajax - принцип...'},
    ])
    const [selectedSort, setSelectedSort] = useState('')

    /*Функция на вход ожидает созданный post
    который создается в компоненте postForm*/
    const createPost = (newPost) => {
        /*Изменяем состояние добавлением
        newPost в конец массива постов*/
        setPosts([...posts, newPost])
    }

    /*Получаем post из дочернего элемента*/
    const removePost = (post) => {
        //Проверка id
        setPosts(posts.filter(p => p.id !== post.id))
    }

    /*На вход функция получает выбранный
    элемент и взаимодействует с ним*/
    const sortPosts = (sort) => {
        setSelectedSort(sort);
        /*Мутируем копию массива
        а не мутируем состояние на прямую*/
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

    return (
        <div className="App">
            {/*Передаем в компонент PostForm функцию обратного вызова*/}
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                {/*Передаем все необходимые пропсы в MySelect*/}
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка по..."
                    option={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'},
                    ]}
                />
            </div>
            {/*Условная отрисовка*/}
            {posts.length !== 0 ?
                /*Передаем в PostList функцию обратного вызова
                Так же в компонент PostList передаем все посты
                и заголовок для отображения на странице*/
                <PostList remove={removePost} posts={posts} title="Посты про JS"/>
                :
                <h1 style={{textAlign: 'center'}}>
                    Посты не были найдены!
                </h1>
            }
        </div>
    )
}

export default App;
