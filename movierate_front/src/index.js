import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter ,Route } from 'react-router-dom'
import Login from './components/login';
import { CookiesProvider } from "react-cookie";


const router = (
    <BrowserRouter>
        <CookiesProvider>
            <Route path='/' exact component={Login} />
            <Route path='/movies' exact component={App} />
        </CookiesProvider>
    </BrowserRouter>
)


ReactDOM.render(router,document.getElementById("root"));