import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import appLogo from '../../../assets/logo_red.png';
import { InputText } from 'primereact/inputtext';
import { useAppSelector } from '../../../redux/hooks';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import { SearchContext } from '../../../pages/shop/search'
import AvatarHeader from './avatar';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

    const { setSearchTerm } = useContext(SearchContext);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); 
    };

    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/home'
        },
        {
            label: 'Shop',
            icon: 'pi pi-shop',
            url: '/shop',
        },
        {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            url: '/cart'
        },
        {
            label: 'Wishlist',
            icon: 'pi pi-heart',
            url: '/wishlist'
        }
    ];
    const loginClick = () => {
        window.location.href = '/login';
    }
    const start = () => {
        return (
            <Link to={"/home"}><img alt="logo" src={appLogo} height="40" className="mr-2" /></Link>
        )
    }
    const avt = <AvatarHeader/>
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={handleSearchChange} />
            {
                isAuthenticated ? avt : <Button label='Đăng nhập' icon="pi pi-sign-in" onClick={loginClick} />
            }
        </div>
    );
    return (
        <div className="fixed top-0 right-0 left-0 z-5">
            <Menubar model={items} start={start} end={end}/>
        </div>
    )
}

export default Header;