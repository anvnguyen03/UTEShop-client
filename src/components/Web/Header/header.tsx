import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import appLogo from '../../../assets/logo_red.png';
import { InputText } from 'primereact/inputtext';
import { useAppSelector } from '../../../redux/hooks';
import { Button } from 'primereact/button';
import AvatarHeader from './avatar';

const Header: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Shop',
            icon: 'pi pi-shop',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        },
        {
            label: 'Wish list',
            icon: 'pi pi-heart'
        },
        {
            label: 'Cart',
            icon: 'pi pi-shopping-cart'
        }
    ];
    const loginClick = () => {
        window.location.href = '/login';
    }
    const start = <img alt="logo" src={appLogo} height="40" className="mr-2"></img>;
    const avt = <AvatarHeader/>
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            {
                isAuthenticated ? (avt): <Button label='Đăng nhập' icon="pi pi-sign-in" onClick={loginClick}/>
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