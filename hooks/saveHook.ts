import { useState, useEffect } from 'react';

export default function saveHook<G>(hookName: string, init: G): [G, (value: G | ((prevValue: G) => G)) => void] {
    const isClient = typeof window !== 'undefined';
    const pageName = isClient ? window.location.pathname.replace(/\//g, '') : '';
    const itemKey = `${pageName}.${hookName}`;
    const storeValue = isClient ? localStorage.getItem(itemKey) : null;
    const defaultValue = storeValue ? JSON.parse(storeValue) : init;

    const [hookValue, setHookValue] = useState<G>(defaultValue as G);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem(itemKey, JSON.stringify(hookValue));
        }
    }, [hookValue, itemKey, isClient]);

    function set(value: G | ((prevValue: G) => G)) {
        if (typeof value === 'function') {
            const storeValue = JSON.parse(localStorage.getItem(itemKey));
            const newValue = (value as (prevValue: G) => G)(storeValue);
            localStorage.setItem(itemKey, JSON.stringify(newValue));
            setHookValue(newValue);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(value));
            setHookValue(value);
        }
    }

    return [hookValue, set];
}
