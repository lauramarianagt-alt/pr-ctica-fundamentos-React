import type { MenuOption } from '@core/types/menu-option';
import './menu.css';
import { Link, useNavigate } from 'react-router';

type Props = {
    readonly options: MenuOption[];
};

export const Menu: React.FC<Props> = ({ options }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                {options.map((item) => (
                    <li key={item.label}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}

                <li>
                    <button type="button" className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};