import './loading.css';

function Loading() {
    return (
        <div className="loading" style={{ height: window.innerHeight-300 }}>
            <div className="spin"></div>
        </div>
    )
}

export default Loading;
