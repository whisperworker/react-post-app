import React, {useMemo, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";


function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "Python", body: 'Python - Язык программирования'},
        {id: 3, title: "JS Hooks", body: 'JavaScript - Язык программирования'},
        {id: 2, title: "Ajax principles", body: 'Ajax - принцип...'},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})


    /*Отрабатывает только тогда когда удаляем,
    добавляем, либо меняем алгоритм сортировки*/
    const sortedPosts = useMemo(() => {
        console.log('123')
        /*Валидация выбранного элемента*/
        if (filter.sort) {
            /*Мутируем копию массива
            а не мутируем состояние на прямую*/
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    /*Поиск и сортировка*/
    const sortedAndSearchedPosts = useMemo(() => {
        /*Фильтруем посты по заданному SearchQuery в инпуте*/
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])
    
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

    return (
        <div className="App">
            {/*Передаем в компонент PostForm функцию обратного вызова*/}
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/*Условная отрисовка*/}
            {sortedAndSearchedPosts.length !== 0 ?
                /*Передаем в PostList функцию обратного вызова
                Так же в компонент PostList передаем все посты
                и заголовок для отображения на странице*/
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
                :
                <h1 style={{textAlign: 'center'}}>
                    Посты не были найдены!
                </h1>
            }
        </div>
    )
}

export default App;
