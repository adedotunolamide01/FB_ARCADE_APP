import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminlogout, reset } from '../../features/auth/adminAuthSlice';

function AdminHeader() {
  const { adminuser } = useSelector((state) => state.adminauth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(adminlogout());
    dispatch(reset());
    navigate('/admin_3xyftvk/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/admin_3xyftvk/dashboard">Foodco</Link>
      </div>
      <ul>
        {adminuser ? (
          <>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>{adminuser.name}</li>
          </>
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
