import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { Menu } from 'primereact/menu';
import { useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";

const AvatarHeader: React.FC = () => {
    const email = useAppSelector(state => state.account.user.email);
    const menuAvatar = useRef<Menu>(null);
    const items: MenuItem[] = [
        {
            label: `Hello ${email.split('@')[0]}`,
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <Menu model={items} popup ref={menuAvatar} id="popup_menu_right" popupAlignment="right" />
            <Avatar 
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" 
                shape="circle" 
                onClick={(e) => menuAvatar.current?.toggle(e)}
                aria-controls="popup_menu_right" aria-haspopup />
        </div>
    )
}

export default AvatarHeader;