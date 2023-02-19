import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, logout } from '../features/auth/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button
              className='btn btn-block'
              onClick={() => {
                dispatch(logout());
                dispatch(reset());
              }}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to='/login'
                onClick={() => {
                  navigate('/login');
                }}
              >
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
