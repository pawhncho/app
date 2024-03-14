import { Outlet, useNavigate } from 'react-router-dom';
import { CiUser, CiSearch, CiShoppingCart, CiHome, CiHeart } from 'react-icons/ci';
import './home.css';

function Home() {
    const navigate = useNavigate()

    return (
        <div className="home">
            <header>
                <CiUser className="icon" onClick={() => localStorage.getItem('token') ? null : navigate('/login/')} />
            </header>
            <form className="search">
                <div className="input">
                    <CiSearch className="icon" />
                    <input src="text" placeholder="Search" />
                </div>
            </form>
            <Outlet />
            <footer>
                <nav>
                    <CiShoppingCart className="icon" />
                    <CiHome className="icon" />
                    <CiHeart className="icon" />
                </nav>
            </footer>
        </div>
    )
}

export default Home;
