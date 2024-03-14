import { Outlet } from 'react-router-dom';
import './main.css';

function Main({ alert }) {
    return (
        <main>
            {
                alert ?
                <div className="alert">
                    <div className="message"
                        style={{ color: alert.color, backgroundColor: alert.bg }}>{alert.message}</div>
                </div> :
                null
            }
            <Outlet />
        </main>
    )
}

export default Main;
