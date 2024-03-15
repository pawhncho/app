import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/main/Main.js';
import Home from './components/home/Home.js';
import Login from './components/auth/Login.js';
import Search from './components/search/Search.js';
import Category from './components/category/Category.js';

function App() {
    const [alert, setAlert] = useState()

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert()
            }, 3000)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main alert={alert} />}>
                    <Route path='/' element={<Home />}>
                        <Route path='/search/:keyword/' element={<Search />} />
                        <Route path='/category/:uuid/' element={<Category />} />
                    </Route>
                    <Route path='login/' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
