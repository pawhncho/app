import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading/Loading.js';
import './category.css';

function Category() {
    const { uuid } = useParams()

    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState()
    const [products, setProducts] = useState()

    const request = async () => {
        setLoading(true)
        try {
            const data = await axios.get('http://192.168.1.3:8000/api/category/' + uuid + '/')
            setCategory(data.data['category'])
            if (data.data['products']) {
                setProducts(data.data['products'])
            } else {
                setProducts([])
            }
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
            <div className="category">
                <h4>{category.name} ({category.products.length} Products)</h4>
                <div className="products">
                    {
                        products.map(product => {
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
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Category;
