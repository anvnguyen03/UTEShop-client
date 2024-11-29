import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import * as api from '../../api/api';

interface IUser {
    fullName: string;
    email: string;
    role: string;
    address: {
        address: string;
        city: string;
        country: string;
        telephone: string;
    };
}

const AdminUser: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [formData, setFormData] = useState<IUser | null>(null);
    const [visible, setVisible] = useState(false);
    const [visibleInfo, setVisibleInfo] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response: any = await api.callFetchAllUsers();
                if (response?.data) {
                    await setUsers(response?.data);
                } else {
                    console.error("No user data found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchAccount();
    }, []);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            global: { ...prevFilters.global, value },
        }));
        setGlobalFilterValue(value);
    };


    const renderHeader = () => (
        <div className="flex justify-content-between">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );

    const header = renderHeader();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) =>
            prev ? { ...prev, [name]: value } : null
        );
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) =>
            prev
                ? {
                    ...prev,
                    address: { ...prev.address, [name]: value },
                }
                : null
        );
    };

    const handleEditUser = (user: IUser) => {
        setFormData(user);
        setVisible(true);
    };

    const handleSubmit = async () => {
        if (!formData) return;
        try {
            setVisible(false);
            setFormData(null);
            const response: any = await api.updateUser(formData);
            if (response?.data) {
                setUsers([response?.data]); 
            } else {
                console.error("No user data found.");
            }


        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleShowInfo = (user: IUser) => {
        setSelectedUser(user);
        setVisibleInfo(true);
    };


    const actionBodyTemplate = (rowData: IUser) => (
        <div className="flex flex-row items-center gap-1">
            <Button
                icon="pi pi-pencil"
                rounded
                outlined
                onClick={() => handleEditUser(rowData)}
            />
            <Button
                icon="pi pi-info-circle"
                rounded
                outlined
                severity="secondary"
                onClick={() => handleShowInfo(rowData)}
            />
        </div>
    );


    return (
        <div className="card">
            <div className="flex text-xl mb-5">
                <div className="text-gray-500 font-light">Dashboards / </div>
                <label className="ml-1 font-semibold">User</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'large' }}>
                User
            </div>

            <DataTable
                value={users}
                header={header}
                paginator
                rows={6}
                responsiveLayout="scroll"
                className="p-datatable-sm"
                globalFilterFields={['name', 'description']}
                filters={filters}
            >
                {/* Thêm cột STT */}
                <Column
                    header="STT"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                    style={{ width: "10%" }}
                />

                {/* Các cột khác */}
                <Column field="fullName" header="Full Name" style={{ width: "20%" }} />
                <Column field="email" header="Email" style={{ width: "30%" }} />
                <Column field="role" header="Role" style={{ width: "15%" }} />
                <Column
                    header="Actions"
                    body={actionBodyTemplate}
                    style={{ width: "15%", textAlign: "center" }}
                />
            </DataTable>

            {/* Sidebar for Edit */}
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                position="right"
                style={{ width: "30vw" }}
            >
                <h2 className="mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field mb-3">
                        <label htmlFor="fullName" className="block mb-2">
                            Full Name
                        </label>
                        <InputText
                            id="fullName"
                            name="fullName"
                            value={formData?.fullName || ""}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleInputChange}
                            className="w-full"
                            disabled={false} // Email không được sửa khi edit
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="role" className="block mb-2">
                            Role
                        </label>
                        <InputText
                            id="role"
                            name="role"
                            value={formData?.role || ""}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>
                    <h4 className="mt-4 mb-2">Address</h4>
                    <div className="field mb-3">
                        <label htmlFor="address" className="block mb-2">
                            Street Address
                        </label>
                        <InputText
                            id="address"
                            name="address"
                            value={formData?.address.address || ""}
                            onChange={handleAddressChange}
                            className="w-full"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="city" className="block mb-2">
                            City
                        </label>
                        <InputText
                            id="city"
                            name="city"
                            value={formData?.address.city || ""}
                            onChange={handleAddressChange}
                            className="w-full"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="country" className="block mb-2">
                            Country
                        </label>
                        <InputText
                            id="country"
                            name="country"
                            value={formData?.address.country || ""}
                            onChange={handleAddressChange}
                            className="w-full"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="telephone" className="block mb-2">
                            Telephone
                        </label>
                        <InputText
                            id="telephone"
                            name="telephone"
                            value={formData?.address.telephone || ""}
                            onChange={handleAddressChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-content-end gap-2">
                        <Button type="submit" label="Save" className="p-button-primary" />
                        <Button
                            type="button"
                            label="Cancel"
                            className="p-button-danger"
                            onClick={() => setVisible(false)}
                        />
                    </div>
                </form>
            </Sidebar>

            <Sidebar
                visible={visibleInfo}
                onHide={() => setVisibleInfo(false)}
                position="right"
                style={{ width: "30vw" }}
            >
                <h2 className="mb-4">User Details</h2>
                {selectedUser && (
                    <div>
                        <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Telephone:</strong> {selectedUser.address.telephone}</p>
                        <p><strong>Address:</strong> {selectedUser.address.address}</p>
                        <p><strong>City:</strong> {selectedUser.address.city}</p>
                        <p><strong>Country:</strong> {selectedUser.address.country}</p>
                    </div>
                )}
            </Sidebar>

        </div>
    );
};

export default AdminUser;
