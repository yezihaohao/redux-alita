import React, { useEffect } from 'react';
import { Button } from '@storybook/react/demo';
import { AlitaProvider, useAlitaCreator, useAlitaState } from '../dist/redux-alita.esm';
import { useAlitaStateLight } from '../src/utils/hook';

export default {
    title: 'Alita',
};

const Alita = () => {
    const setAlitaState = useAlitaCreator();
    let {
        count: { data: countState },
    } = useAlitaState([{ count: 0 }]);
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
