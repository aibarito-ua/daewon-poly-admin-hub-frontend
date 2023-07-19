import { Transition } from 'history';
import React from 'react';
import { useLocation } from "react-router-dom"
import { useBlocker } from './useBlocker';

export const useCallbackPrompt = (when: boolean): [boolean, ()=>void, ()=>void] => {
    const location = useLocation();
    
    const [showPrompt, setShowPrompt] = React.useState(false);
    const [blockedLocation, setBlockedLocation] = React.useState<Transition | null>(null);
    
    const cancelNavigation = React.useCallback(()=>{
        setShowPrompt(false);
        setBlockedLocation(null);
    }, []);

    const blocker = React.useCallback(
        (tx: Transition) => {
            if (tx.location.pathname !== location.pathname) {
                setBlockedLocation(tx);
                setShowPrompt(true);
            };
        },
        [location]
    );

    const confirmNavigation = React.useCallback(()=>{
        if (blockedLocation) {
            blockedLocation.retry();
            cancelNavigation();
        }
    }, [blockedLocation])

    useBlocker(blocker, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
}