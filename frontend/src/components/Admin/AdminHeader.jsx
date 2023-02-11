import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

function AdminHeader() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/admin_3xyftvk/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/admin_3xyftvk/dashboard">
          {' '}
          <img src="/frontend/image/logo.png" alt="Foodco" />
          Foodco
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/admin_3xyftvk/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/admin_3xyftvk/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default AdminHeader;
