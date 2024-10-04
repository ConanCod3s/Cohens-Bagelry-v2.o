import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import MainRouter from './router/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
            <MainRouter />
        </SnackbarProvider >
    </React.StrictMode>,
)