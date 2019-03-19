/*
 * File: index.js
 * Desc: 描述
 * File Created: 2019-03-19 13:21:04
 * Author: chenghao at <hao.cheng@karakal.com.cn>
 * ------
 * Last Modified: 2019-03-19 13:35:49
 * Modified By: chenghao at <hao.cheng@karakal.com.cn>
 * ------
 * Copyright 2019 - present, karakal
 */
const fetchNews = () => fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070').then(res => res.json());

export default {
    fetchNews
}