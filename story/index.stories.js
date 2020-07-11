import React, { useEffect } from 'react';
import { Button } from '@storybook/react/demo';
import {
    AlitaProvider,
    useAlitaCreator,
    useAlitaState,
    useAlitaStateLight,
    useAlita,
} from '../src/main';

export default {
    title: 'Alita',
};

const Alita = () => {
    const setAlitaState = useAlitaCreator();
    let {
        count: { data: countState = 0 },
    } = useAlitaState(['count']);
    useEffect(() => {
        setAlitaState({ stateName: 'count', data: ++countState });
    }, [setAlitaState]);
    return (
        <div>
            <Button onClick={() => setAlitaState({ stateName: 'count', data: ++countState })}>
                +1
            </Button>
            <Button onClick={() => setAlitaState({ stateName: 'count', data: --countState })}>
                -1
            </Button>
            <div>alita-count：{countState}</div>
        </div>
    );
};

export const testAlita = () => {
    return (
        <AlitaProvider>
            <Alita />
        </AlitaProvider>
    );
};

const Light = () => {
    let { alita } = useAlitaStateLight([{ alita: 0 }]);
    const setAlitaState = useAlitaCreator();
    return (
        <>
            <Button onClick={() => setAlitaState({ stateName: 'alita', data: ++alita })}>+1</Button>
            <Button onClick={() => setAlitaState({ stateName: 'alita', data: --alita })}>-1</Button>
            <div>alita-count：{alita}</div>
        </>
    );
};
export const testAlitaLight = () => {
    return (
        <AlitaProvider>
            <Light />
        </AlitaProvider>
    );
};

const UseAlita = () => {
    let [test, name, setAlita] = useAlita({ test: 0 }, 'name', { light: true });
    return (
        <>
            <Button onClick={() => setAlita({ stateName: 'test', data: ++test })}>+1</Button>
            <Button onClick={() => setAlita({ stateName: 'test', data: --test })}>-1</Button>
            <div>test：{test}</div>
            <div>
                {name}
                <Button onClick={() => setAlita({ stateName: 'name', data: 'yezihaohao' })}>
                    获取名字
                </Button>
            </div>
        </>
    );
};

const Another = () => {
    let [name] = useAlita('name', { light: true });
    console.log(name);
    return name ? `有点酷：${name}` : null;
};

export const TestUseAlita = () => {
    return (
        <AlitaProvider>
            <UseAlita />
            <Another />
        </AlitaProvider>
    );
};
