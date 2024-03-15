import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading/Loading';
import { CiUser, CiSearch, CiShoppingCart, CiHome, CiHeart } from 'react-icons/ci';
import './home.css';
import './home-main.css';

function Home() {
    const navigate = useNavigate()
    const location = useLocation()

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
            {
                location.pathname  === '/' ?
                <Main /> :
                null
            }
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

function Main() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    const request = async () => {
        try {
            setLoading(true)
            const data = await axios.get('http://192.168.1.3:8000/api/categories/')
            setCategories(data.data)
            setLoading(false)
        } catch {
            setLoading(true)
        }

    }

    useEffect(() => {
        request()
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className="main">
                <div className="categories">
                    {
                        categories.map(category => {
                            return (
                                <div className="category"
                                        style={// eslint-disable-next-line
                                            { backgroundImage: 'url(' + '"http://192.168.1.3:8000' + category.image + '/")', backgroundSize: 'cover' }}>
                                    <p className="category-name" onClick={() => navigate('/category/' + category.uuid)}>{category.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Home;
