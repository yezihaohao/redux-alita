/*
 * File: count.test.js
 * Desc: alita test case
 * File Created: 2019-07-11 17:46:31
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import React from 'react';
import { connectAlita, AlitaProvider } from '../main';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const Count = ({ setAlitaState, countState }) => {
    return (
        <div>
            <button
                onClick={() =>
                    setAlitaState({
                        stateName: 'countState',
                        data: (countState ? countState.data : 0) + 1,
                    })
                }
                type="plus"
            >
                +1
            </button>
            <button
                onClick={() =>
                    setAlitaState({
                        stateName: 'countState',
                        data: (countState ? countState.data : 0) - 1,
                    })
                }
                type="minus"
            >
                -1
            </button>
            <div id="count">the value of count: {countState ? countState.data : 0}</div>
        </div>
    );
};

const ConnectCount = connectAlita(['countState'])(Count);

// test normal case: change alita state
test('test alita count change', () => {
    const wrapper = mount(
        <AlitaProvider>
            <ConnectCount />
        </AlitaProvider>
    );

    expect(wrapper.find('#count').text()).toBe('the value of count: 0');
    wrapper.find('[type="plus"]').simulate('click');
    expect(wrapper.find('#count').text()).toBe('the value of count: 1');
});
