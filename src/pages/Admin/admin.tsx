import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { PanelMenu } from 'primereact/panelmenu';
import appLogo from '../../assets/logo_red.png';

import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar'

const AdminLayoutComponent: React.FC = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState<string | null>(null); // Trạng thái mục được chọn


    const itemRenderer = (item: any) => (
        (item.label === 'Category' || item.label === 'Product' || item.label === 'User')
            ?
            (<div
                className={`flex align-items-center ml-3 px-3 py-2 cursor-pointer ${item.items ? 'font-semibold' : ''} ${activeItem === item.label ? 'text-red-500' : ''}`}
                onClick={() => {
                    setActiveItem(item.label);
                    if (item.url) navigate(item.url);
                }}>
                <span className={`${item.icon}`} />
                <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
            </div>)
            :
            (<div
                className={`flex align-items-center px-3 py-2 cursor-pointer ${item.items ? 'font-semibold' : ''} ${activeItem === item.label ? 'text-red-500' : ''}`}
                onClick={() => {
                    setActiveItem(item.label);
                    if (item.url) navigate(item.url);
                }}>
                <span className={`${item.icon}`} />
                <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
            </div>)

    );
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            template: itemRenderer,
            items: [
                { label: 'Category', icon: 'pi pi-tags', url: '/admin/category', template: itemRenderer },
                { label: 'Product', icon: 'pi pi-box', url: '/admin/product', template: itemRenderer },
                { label: 'User', icon: 'pi pi-user', url: '/admin/user', template: itemRenderer },
            ],
        },
        { label: 'Quản lý doanh thu', icon: 'pi pi-fw pi-chart-bar', url: '/admin/revenue', template: itemRenderer },
        { label: 'Quản lý đơn hàng', icon: 'pi pi-fw pi-receipt', url: '/admin/order', template: itemRenderer },
        { label: 'Coupon', icon: 'pi pi-fw pi-ticket', url: '/admin/coupon', template: itemRenderer },
    ];

    return (
        <div className="flex h-screen p-2" style={{ background: '#f5f5f9' }}>
            {/* Sidebar */}
            <div className="h-screen mr-3 bg-white" style={{ width: '300px' }}>
                <div className="m-3">
                    <img src={appLogo} alt="ute-shop" height={65} className="mb-3" />
                </div>
                <PanelMenu model={items} className="w-full md:w-17rem" />
            </div>
            {/* Main Content */}
            <div className="h-screen w-full">
                {/* Navbar */}
                <div className="navbar mb-5">
                    <Menubar
                        model={[
                            {
                                label: 'Home',
                                icon: 'pi pi-home',
                                command: () => navigate('/home'), 
                            },
                        ]}
                        end={<div className="flex align-items-center gap-2">
                            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
                            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                        </div>}
                    />
                </div>

                <div className="content-wrap pl-3 h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayoutComponent;
