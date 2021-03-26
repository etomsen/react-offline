import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useOffline } from './OfflineHook';

const useStyles = makeStyles(() => createStyles({
    statusClass: {
        color: (isOffline) => isOffline ? 'red' : 'blue',
    }
}));

function Offline() {
    const isOffline = useOffline({preventPropagation: true, priority: 1});
    const {statusClass} = useStyles(isOffline);
    return(
        <div>
            This page is available offline: status=<span className={statusClass}>{isOffline ? 'Offline' : 'Online'}</span>
        </div>
    );
}

export default Offline;
