import React from 'react';
import PostItem from "./PostItem";

//PostList принимает в себя посты и заголовок
const PostList = ({posts, title, remove}) => {
    return (
        <div>
            {/*Отображаем заголовок внутри App*/}
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>

            {/*Создаем новый массив на основе постов*/}
            {posts.map((post, index) =>
                /*Передаем функцию remove из App в PostItem*/
                /*Передаем каждый пост в PostItem*/
                <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default PostList;