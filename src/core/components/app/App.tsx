import type { MenuOption } from '@core/types/menu-option';
import { Layout } from '@core/components/layout/layout';
import './App.css';
import { Router } from '@core/router/router';

const getOptions = (): MenuOption[] => {
  return [{ path: '/products', label: 'Productos' }];
};

export const App: React.FC = () => {
    const appTitle = 'Products Dashboard';
    const subTitle = 'React Practice';

    const menuOptions: MenuOption[] = getOptions();

    return (
        <Layout
            appTitle={appTitle}
            subTitle={subTitle}
            menuOptions={menuOptions}
        >
            {/* Parte que varía en cada página dependiendo del Router */}
            <Router></Router>
        </Layout>
    );
};
