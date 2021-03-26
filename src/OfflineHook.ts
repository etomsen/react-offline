import { useCallback, useEffect, useState } from "react";
import offlineSubject, { OfflineObserver } from "./OfflineObsever";

export type UseOfflineProps = {preventPropagation?: boolean, priority?: number};
export function useOffline({preventPropagation, priority = 0}: UseOfflineProps = {}) {
    const [offline, setOffline] = useState<boolean | undefined>(undefined);

    const observer: OfflineObserver = (value: boolean) => {
        setOffline(value);
        if (preventPropagation) {
            return {preventPropagation};
        }
    };
    
    const memoObserver = useCallback(observer, [preventPropagation]);

    useEffect(() => {
        offlineSubject.attach(memoObserver, priority);
        return () => {
            offlineSubject.detach(memoObserver);
        }
    }, [memoObserver, priority]);
    return offline;
}
