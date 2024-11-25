import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ICoupon } from '../../types/backend'
import * as api from '../../api/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import { InputNumber, InputNumberChangeEvent, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { Tag } from 'primereact/tag'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { SplitButton } from 'primereact/splitbutton'
import { MenuItem } from 'primereact/menuitem'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    price: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    isActivated: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    }
}

const AdminCoupon: React.FC = () => {
    const emptyCoupon: ICoupon = {
        name: '',
        price: 0,
        isActivated: true
    }

    const toast = useRef<Toast>(null);
    const [coupon, setCoupon] = useState<ICoupon>(emptyCoupon)
    const [loading, setLoading] = useState<boolean>(true)
    const [couponDialog, setCouponDialog] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [coupons, setCoupons] = useState<ICoupon[]>([])

    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [statuses] = useState<boolean[]>([true, false]);

    const getSeverity = (status: boolean) => {
        switch (status) {
            case true:
                return 'success';

            case false:
                return 'danger';
        }
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

    const openNew = () => {
        setCoupon(emptyCoupon);
        setSubmitted(false);
        setCouponDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCouponDialog(false);
    }

    const couponDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={() => saveCoupon()} loading={submitted} />
        </React.Fragment>
    )

    const saveCoupon = async () => {
        setSubmitted(true)
        const response = await api.addCoupon(coupon)
        console.log(response)
        if (response.data) {
            hideDialog()
            const res: any = await api.getCoupons()
            if (res?.data) {
                setCoupons(res.data)
                setLoading(false)
            }
        }
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    }

    const balanceBodyTemplate = (rowData: ICoupon) => {
        return (formatCurrency(rowData.price));
    };

    const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e: InputNumberChangeEvent) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData: ICoupon) => {
        return <Tag value={`${rowData.isActivated}`} severity={getSeverity(rowData.isActivated)} />;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e: DropdownChangeEvent) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: boolean) => {
        return <Tag value={`${option}`} severity={getSeverity(option)} />;
    };

    const createMenuItems = (coupon: ICoupon): MenuItem[] => {

        return [
            {
                label: 'deactivate',
                icon: 'pi pi-check',
                command: () => {
                    changeCouponStatus(coupon, false)
                }
            },
            {
                label: 'activate',
                icon: 'pi pi-times',
                command: () => {
                    changeCouponStatus(coupon, true)
                }
            }
        ]
    }

    const actionBodyTemplate = (rowData: ICoupon) => {
        return (
            <React.Fragment>
                <SplitButton
                    icon="pi pi-plus"
                    onClick={() => console.log('Clicked coupon: ' + rowData.name)}
                    model={createMenuItems(rowData)} raised rounded size='small'
                />
            </React.Fragment>
        );
    };

    const changeCouponStatus = async (coupon: ICoupon, status: boolean) => {
        toast.current?.show({ severity: 'success', summary: 'Updated', detail: `Coupons ${coupon.name} updated` });
        coupon.isActivated = status
    }

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value ?? 0;
        let _coupon = { ...coupon };

        // @ts-ignore
        _coupon[name] = val;

        setCoupon(_coupon);
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _coupon = { ...coupon };

        // @ts-ignore
        _coupon[name] = val;

        setCoupon(_coupon);
    }

    const header = renderHeader();
    useEffect(() => {
        const getCoupons = async () => {
            const response: any = await api.getCoupons()
            if (response?.data) {
                setCoupons(response.data)
                setLoading(false)
            }
        }
        getCoupons()
    }, [])

    return (
        <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
            <Dialog visible={couponDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Coupon Details" modal className="p-fluid" footer={couponDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <div className="flex-auto mb-5">
                        <label htmlFor="currency-us" className="font-bold block mb-2">Name</label>
                        <InputText value={coupon.name} onChange={(e) => onInputChange(e, 'name')} />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="currency-us" className="font-bold block mb-2">Price</label>
                        <InputNumber id="price" value={coupon.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast}></Toast>
            <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
                <div className="flex flex-column text-center md:text-left">
                    <span className="text-900 text-3xl font-medium mb-2">Coupons</span>
                </div>
            </div>

            <div className="card">
                <DataTable value={coupons} paginator showGridlines rows={10} loading={loading} dataKey="name"
                    filters={filters} globalFilterFields={['name', 'price', 'isActivated']} header={header}
                    emptyMessage="No coupons found." onFilter={(e) => setFilters(e.filters)}>
                    <Column field="name" header="Name" filter filterPlaceholder="Search by coupon name" style={{ minWidth: '12rem' }} />
                    <Column header="Price" filterField="price" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column field="isActivated" header="isActivated" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '6rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column header="Action" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    )
}

export default AdminCoupon
