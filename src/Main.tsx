import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import MainRouter from './router/Router';
import { UserProvider } from './services/providers/User';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider>
            <SnackbarProvider maxSnack={3}>
                <MainRouter />
            </SnackbarProvider >
        </UserProvider>
    </React.StrictMode>,
)