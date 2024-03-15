import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading/Loading.js';
import './search.css';

function Search() {
    const { keyword } = useParams()

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    const request = async () => {
        setLoading(true)
        try {
            const data = await axios.get('http://192.168.1.3:8000/api/search/' + keyword + '/')
            setCategories(data.data['categories'])
            setProducts(data.data['products'])
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
            <div className="search">
                {
                    categories ?
                    <div className="categories">
                        <h4>Results in Categories</h4>
                        <div className="list">
                            {
                                categories.map(category => {
                                    return <Category category={category} />
                                })
                            }
                        </div>
                    </div> :
                    null
                }
                {
                    products ?
                    <div className="products">
                        <h4>Results in Products</h4>
                        <div className="list">
                            {
                                products.map(product => {
                                    return <Product product={product} />
                                })
                            }
                        </div>
                    </div> :
                    null
                }
            </div>
        )
    }
}

function Product({ product }) {
    return (
        <div className="product">
            <img src={'http://192.168.1.3:8000' + product.image} alt="..." />
            {
                product.off_percent ?
                <p className="off-percent">({product.off_percent} OFF)</p> :
                null
            }
            {
                product.off_percent ?
                <div className="offer">
                    <p className="off-price">{product.off_price}</p>
                    <p className="price">{product.price}</p>
                </div> :
                <p className="price">{product.price}</p>
            }
        </div>
    )
}

function Category({ category }) {
    const navigate = useNavigate()

    return (
        <div className="category"
                style={// eslint-disable-next-line
                        { backgroundImage: 'url(' + '"http://192.168.1.3:8000' + category.image + '/")', backgroundSize: 'cover' }}>
            <p className="category-name" onClick={() => navigate('/category/' + category.uuid)}>{category.name}</p>
        </div>
    )
}

export default Search;
