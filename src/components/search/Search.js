import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
                        <h4>Categories</h4>
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
                        <h4>Products</h4>
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
            <img src={'http://192.168.1.3:8000' + product.image} alt={null} />
            <p className="price">{product.price}</p>
        </div>
    )
}

function Category({ category }) {
    return (
        <div className="category"
                style={{ backgroundImage: 'url(' + '"http://192.168.1.3:8000' + category.image + '/")',
                            backgroundSize: 'cover' }}>
            <p className="category-name">{category.name}</p>
        </div>
    )
}

export default Search;
