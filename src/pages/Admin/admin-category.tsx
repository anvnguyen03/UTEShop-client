import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';


import * as api from "../../api/api";
import { IGetCategory } from "../../types/backend";
import { ConfirmDialog } from "primereact/confirmdialog";

const AdminCategory: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState<IGetCategory[]>([]);
    const [formData, setFormData] = useState<IGetCategory>({ _id: "", name: "" });
    const [isEditMode, setIsEditMode] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [loading, setLoading] = useState(true);

    const [cate_id, setCateId] = useState<string | null>(null);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response: any = await api.getAllCategory();
                if (response?.data) {
                    setCategories(response.data);
                } else {
                    console.error("No categories found.");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const confirmDeleteCategory = (category: IGetCategory) => {
        setCateId(category._id)
        setIsDeleteDialogVisible(true);
    };

    const handleDeleteCategory = async () => {
        if (!cate_id) return;

        try {

            await api.deleteCategory(cate_id);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== cate_id)
            );

            setIsDeleteDialogVisible(false);
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };



    // Button add
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response: any = await api.addToCategory(formData);
            if (response?.data) {
                setCategories((prev) => [...prev, response.data]);
                setFormData({ name: "", _id: '' });
                setVisible(false);
            } else {
                console.error("Error adding category.");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };
    const handleSubmitEdit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response: any = await api.updateCategory(formData._id, formData);

            if (response?.data) {
                setCategories((prev) =>
                    prev.map((category) =>
                        category._id === formData._id ? { ...category, name: formData.name } : category
                    )
                );
                setFormData({ name: "", _id: '' });
                setIsEditMode(false);
            } else {
                console.error("Error updating category.");
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };


    const handleDiscard = () => {
        setFormData({ name: "", _id: '' });
        setVisible(false);
        setIsEditMode(false);
    };

    const handleEditCategory = (category: IGetCategory) => {
        setFormData(category);
        setIsEditMode(true);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { ...prevFilters.global, value },
        }));
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="flex justify-content-between mb-3">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
            <div className="flex justify-content-end">
                <Button
                    label="Add Category"
                    icon="pi pi-plus"
                    onClick={() => setVisible(true)}
                    className="p-button-primary"
                />
            </div>
        </div>
    );

    const header = renderHeader();

    const actionBodyTemplate = (rowData: IGetCategory) => (
        <div className="flex flex-row items-center gap-1">
            <Button
                icon="pi pi-pencil"
                rounded
                outlined
                onClick={() => handleEditCategory(rowData)}
            />
            <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                onClick={() => confirmDeleteCategory(rowData)}
            />
        </div>
        
    );

    return (
        <div className="card">
            {/* Header */}
            <div className="flex text-xl mb-5">
                <div className="text-gray-500 font-light">Dashboards / </div>
                <label className="ml-1 font-semibold">Category</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'large', marginBottom: '12px' }}>
                Category
            </div>

            {/* DataTable */}
            <DataTable
                value={categories}
                header={header}
                paginator
                rows={6}
                responsiveLayout="scroll"
                className="p-datatable-sm"
                globalFilterFields={["name"]}
                filters={filters}
                loading={loading}
            >
                <Column
                    header="STT"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                    style={{ width: "30%" }}
                />
                <Column field="name" header="Category" sortable style={{ width: "50%" }} />
                <Column header="Actions" body={actionBodyTemplate} className="justify-center" />

            </DataTable>

            {/* Sidebar  add*/}
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                position="right"
                style={{ width: "30vw" }}
            >
                <h2 className="mb-4">Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field mb-4">
                        <label htmlFor="name" className="block font-medium mb-2">
                            Category Name
                        </label>
                        <InputText
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter category name"
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-content-end gap-2">
                        <Button type="submit" label="Add" className="p-button-primary" />
                        <Button
                            type="button"
                            label="Discard"
                            className="p-button-danger"
                            onClick={handleDiscard}
                        />
                    </div>
                </form>
            </Sidebar>

            <Sidebar
                visible={isEditMode}
                onHide={handleDiscard}
                position="right"
                style={{ width: "30vw" }}
            >
                <h2 className="mb-4">Edit Category</h2>
                <form onSubmit={handleSubmitEdit}>
                    <div className="field mb-4">
                        <label htmlFor="name" className="block font-medium mb-2">
                            Category Name
                        </label>
                        <InputText
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter category name"
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-content-end gap-2">
                        <Button type="submit" label="Save" className="p-button-primary" />
                        <Button
                            type="button"
                            label="Discard"
                            className="p-button-danger"
                            onClick={handleDiscard}
                        />
                    </div>
                </form>
            </Sidebar>

            {/* Confirm dialog for delete */}
            <ConfirmDialog
                visible={isDeleteDialogVisible}
                onHide={() => setIsDeleteDialogVisible(false)}
                message="Are you sure you want to delete this product?"
                header="Confirm"
                icon="pi pi-exclamation-triangle"
                accept={handleDeleteCategory}
                reject={() => setIsDeleteDialogVisible(false)}
            />
        </div>
    );
};

export default AdminCategory;
