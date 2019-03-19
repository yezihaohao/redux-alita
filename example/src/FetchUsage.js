/*
 * File: FetchUsage.js
 * Desc: asynchronous usage
 * File Created: 2019-03-19 13:33:27
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import React from 'react';
import { connectAlita } from 'redux-alita';

class FetchUsage extends React.Component {
    render() {
        console.log(this.props.fetchNews);
        const { data: fetchNews = {} } = this.props.fetchNews || {};
        return (
            <div>
                <button onClick={() => this.props.setAlitaState({ funcName: 'fetchNews' })}>Fetch News</button>
                <ul>
                    { fetchNews.isFetching && <li>loading...</li> }
                    { fetchNews.articles && fetchNews.articles.map(news => <li key={news.url}>{news.title}</li>) }
                </ul>
            </div>
        )
    }
}

export default connectAlita(['fetchNews'])(FetchUsage);