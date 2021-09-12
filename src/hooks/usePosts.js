import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    /*Отрабатывает только тогда когда удаляем,
        добавляем, либо меняем алгоритм сортировки*/
    const sortedPosts = useMemo(() => {
        /*Валидация выбранного элемента*/
        if (sort) {
            /*Мутируем копию массива
            а не мутируем состояние на прямую*/
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    /*Поиск и сортировка*/
    const sortedAndSearchedPosts = useMemo(() => {
        /*Фильтруем посты по заданному SearchQuery в инпуте*/
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}