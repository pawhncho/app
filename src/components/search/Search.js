import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './search.css';

function Search() {
    const { keyword } = useParams()

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    const request = async () => {
        setLoading(true)
        await axios.get('http://192.168.1.3:8000/api/search/' + keyword + '/').then(res => {
            setCategories(res.data['categories'])
            setProducts(res.data['products'])
        })
        setLoading(false)
    }

    useEffect(() => {
        request()
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <p>Loading...</p>
    } else {
        return (
            <div className="search">
                <div className="categories">
                    <h4>Categories</h4>
                    {
                        categories ?
                        categories.map(category => {
                            return (
                                <div className="category">
                                    <p>{category.name}</p>
                                </div>
                            )
                        }) :
                        <p>None</p>
                    }
                </div>
                <div className="products">
                    <h4>Products</h4>
                    {
                        products ?
                        products.map(product => {
                            return (
                                <div className="product">
                                    <p>{product.name}</p>
                                </div>
                            )
                        }) :
                        <p>None</p>
                    }
                </div>
            </div>
        )
    }
}

export default Search;
