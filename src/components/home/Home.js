import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CiUser, CiSearch, CiShoppingCart, CiHome, CiHeart } from 'react-icons/ci';
import './home.css';

function Home() {
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState()

    return (
        <div className="home">
            <header>
                <CiUser className="icon" onClick={() => localStorage.getItem('token') ? null : navigate('/login/')} />
            </header>
            <form onSubmit={() => navigate('/search/' + keyword + '/')} className="search">
                <div className="input">
                    <CiSearch className="icon" />
                    <input src="text" placeholder="Search" value={keyword} onChange={e => setKeyword(e.target.value)} />
                </div>
            </form>
            <Outlet />
            <footer>
                <nav>
                    <CiShoppingCart className="icon" />
                    <CiHome className="icon" onClick={() => navigate('/')} />
                    <CiHeart className="icon" />
                </nav>
            </footer>
        </div>
    )
}

export default Home;
