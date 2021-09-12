import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

//PostList принимает в себя посты и заголовок
const PostList = ({posts, title, remove}) => {

    /*Условная отрисовка*/
    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не были найдены!
            </h1>
        )
    }
    return (
        <div>
            {/*Отображаем заголовок внутри App*/}
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>

            <TransitionGroup>
                {/*Создаем новый массив на основе постов*/}
                {posts.map((post, index) =>
                    /*Передаем функцию remove из App в PostItem*/
                    /*Передаем каждый пост в PostItem*/
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames={"post"}
                    >
                        <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;