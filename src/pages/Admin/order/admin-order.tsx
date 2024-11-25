import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './orderhistory.css'
import { IGetOrderHistory } from '../../../types/backend'
import * as api from '../../../api/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import { Calendar, CalendarViewChangeEvent } from 'primereact/calendar'
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber'
import { Tag } from 'primereact/tag'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { SplitButton } from 'primereact/splitbutton'
import { MenuItem } from 'primereact/menuitem'
import { Toast } from 'primereact/toast'

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    orderNumber: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    }
}

const AdminOrder: React.FC = () => {

    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<IGetOrderHistory[]>([])
    const [newOrders, setNewOrders] = useState<IGetOrderHistory[]>([])
    const [confirmedOrders, setConfirmedOrders] = useState<IGetOrderHistory[]>([])
    const [packagingOrders, setPackagingOrders] = useState<IGetOrderHistory[]>([])
    const [shippingOrders, setShippingOrders] = useState<IGetOrderHistory[]>([])
    const [deliveredOrders, setDeliverdOrders] = useState<IGetOrderHistory[]>([])
    const [canceledOrders, setCanceledOrders] = useState<IGetOrderHistory[]>([])

    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [statuses] = useState<string[]>(['place order', 'confirmed', 'packaging', 'shipping', 'delivered', 'canceled']);

    const getSeverity = (status: string) => {
        switch (status) {
            case 'place order':
                return null;

            case 'confirmed':
                return 'secondary';

            case 'packaging':
                return 'info';

            case 'shipping':
                return 'warning';

            case 'delivered':
                return 'success';

            case 'canceled':
                return 'danger';
        }
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    }

    const dateBodyTemplate = (rowData: IGetOrderHistory) => {
        return formatDate(new Date(rowData.orderDate));
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e: CalendarViewChangeEvent) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData: IGetOrderHistory) => {
        return formatCurrency(parseFloat(rowData.totalAmount.replace('$', '')));
    };

    const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e: InputNumberChangeEvent) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData: IGetOrderHistory) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e: DropdownChangeEvent) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: string) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const createMenuItems = (orderNumber: string): MenuItem[] => {

        return [
            {
                label: 'confirmed',
                icon: 'pi pi-verified',
                command: () => {
                    changeOrderStatus(orderNumber, 'confirmed')
                }
            },
            {
                label: 'packaging',
                icon: 'pi pi-forward',
                command: () => {
                    changeOrderStatus(orderNumber, 'packaging')
                }
            },
            {
                label: 'shipping',
                icon: 'pi pi-truck',
                command: () => {
                    changeOrderStatus(orderNumber, 'shipping')
                }
            },
            {
                label: 'delivered',
                icon: 'pi pi-box',
                command: () => {
                    changeOrderStatus(orderNumber, 'delivered')
                }
            },
        ]
    }

    const actionBodyTemplate = (rowData: IGetOrderHistory) => {
        return (
            <React.Fragment>
                {(rowData.status !== 'canceled') && (rowData.status !== 'delivered') ? (
                    <SplitButton
                        icon="pi pi-plus"
                        onClick={() => console.log('Clicked order: ' + rowData.orderNumber)}
                        model={createMenuItems(rowData.orderNumber)} raised rounded size='small'
                    />) : (null)
                }
            </React.Fragment>
        );
    };

    const changeOrderStatus = async (orderNumber: string, status: string) => {
        const response: any = await api.changeOrderStatus(orderNumber, status)
        if (response.statusCode === 200) {
            toast.current?.show({ severity: 'success', summary: 'Updated', detail: `Order ${orderNumber} updated` });
            const responseFetchOrder: any = await api.getAllOrders()
            if (responseFetchOrder?.data) {
                setOrders(responseFetchOrder.data)
                setLoading(false)
            }
        }
        
    }

    const header = renderHeader();
    useEffect(() => {
        const getOrderHistory = async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await api.getAllOrders()
            if (response?.data) {
                setOrders(response.data)
                setLoading(false)
            }
        }
        getOrderHistory()
    }, [])

    useEffect(() => {
        const calculateOrdersByStatus = () => {
            setNewOrders(orders.filter(order => order.status === 'place order'))
            setConfirmedOrders(orders.filter(order => order.status === 'confirmed'))
            setPackagingOrders(orders.filter(order => order.status === 'packaging'))
            setShippingOrders(orders.filter(order => order.status === 'shipping'))
            setDeliverdOrders(orders.filter(order => order.status === 'delivered'))
            setCanceledOrders(orders.filter(order => order.status === 'canceled'))
        }
        calculateOrdersByStatus()
    }, [orders])

    return (
        <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
            <Toast ref={toast}></Toast>
            <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
                <div className="flex flex-column text-center md:text-left">
                    <span className="text-900 text-3xl font-medium mb-2">Orders</span>
                </div>
            </div>

            <div className="grid mb-2">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total</span>
                                <div className="text-900 font-medium text-xl">{orders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-receipt text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">1 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">New</span>
                                <div className="text-900 font-medium text-xl">{newOrders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-sparkles text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">1 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Confirmed</span>
                                <div className="text-900 font-medium text-xl">{confirmedOrders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-verified text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">0 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Packaging</span>
                                <div className="text-900 font-medium text-xl">{packagingOrders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-forward text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">0 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Shipping</span>
                                <div className="text-900 font-medium text-xl">{shippingOrders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-truck text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">0 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Delivered</span>
                                <div className="text-900 font-medium text-xl">{deliveredOrders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-box text-purple-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">0 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Canceled</span>
                                <div className="text-900 font-medium text-xl">{canceledOrders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-times-circle text-purple-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">0 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <DataTable value={orders} paginator showGridlines rows={10} loading={loading} dataKey="orderNumber"
                    filters={filters} globalFilterFields={['orderNumber', 'date', 'balance', 'status']} header={header}
                    emptyMessage="No orders found." onFilter={(e) => setFilters(e.filters)}>
                    <Column field="orderNumber" header="Order Number" filter filterPlaceholder="Search by order number" style={{ minWidth: '12rem' }} />
                    <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '6rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                    <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '6rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column header="Action" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    )
}

export default AdminOrder
