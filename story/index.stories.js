import React, { useEffect } from 'react';
import { Button } from '@storybook/react/demo';
import { AlitaProvider, useAlitaCreator, useAlitaState } from '../src/main';

export default {
    title: 'Button',
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
