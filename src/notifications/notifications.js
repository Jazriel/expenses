import {Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React, {useState, useCallback} from 'react';

export const NotificationsContext = React.createContext();

// I wouldn't use it but here it is for completion shake
export const severities = Object.freeze({
    info: 'info',
    success: 'success',
    error: 'error',
    warning: 'warning',
});

const defaultSeverity = 'info';
const defaultMessage = '';

export default ({children}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [alertState, setAlertState] = useState({message: defaultMessage, severity: defaultSeverity});

    const alert = useCallback(({message, severity}) => {
        const severity_ = severity || defaultSeverity;
        const message_ = message || defaultMessage;
        setAlertState({message: message_, severity: severity_});
        setOpen(true); 
    }, []);

    return (
        <React.Fragment>
            <NotificationsContext.Provider value={alert}>
                {children}
            </NotificationsContext.Provider>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
            >
                <Alert variant="filled" onClose={handleClose} severity={alertState.severity}>
                    {alertState.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};
