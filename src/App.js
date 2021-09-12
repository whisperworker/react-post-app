import React, {useEffect, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";


function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts);
    })

    useEffect(() => {
        fetchPosts()
    }, [])

    /*Функция на вход ожидает созданный post
    который создается в компоненте postForm*/
    const createPost = (newPost) => {
        /*Изменяем состояние добавлением
        newPost в конец массива постов*/
        setPosts([...posts, newPost])
        /*При создании поста скрываем модальное окно*/
        setModal(false)
    }

    /*Получаем post из дочернего элемента*/
    const removePost = (post) => {
        //Проверка id
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                {/*Передаем в компонент PostForm функцию обратного вызова*/}
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                    /*Передаем в PostList функцию обратного вызова
                    Так же в компонент PostList передаем все посты
                    и заголовок для отображения на странице*/
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            }

        </div>
    )
}

export default App;
