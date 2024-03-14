import { useNavigate } from 'react-router-dom';
import { CiCircleChevLeft, CiUser, CiLock } from 'react-icons/ci';
import './login.css';

function Login() {
    const navigate = useNavigate()

    return (
        <div className="login" style={{ height: window.innerHeight }}>
            <div className="back">
                <CiCircleChevLeft className="icon" onClick={() => navigate(-1)} />
            </div>
            <div className="label">
                <h1>Login</h1>
            </div>
            <form className="login">
                <div className="username">
                    <CiUser className="icon" />
                    <input text="text" placeholder="Username" />
                </div>
                <div className="password">
                    <CiLock className="icon" />
                    <input text="password" placeholder="Password" />
                </div>
                <div className="password-option">
                    <small>Forgot password?</small>
                </div>
                <button type="submit">SIGN IN</button>
            </form>
            <div className="options">
                <p>Or Sign up</p>
            </div>
        </div>
    )
}

export default Login;
