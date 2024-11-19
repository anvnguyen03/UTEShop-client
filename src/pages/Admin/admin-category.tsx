import React, { useState, useEffect, FormEvent } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import * as api from '../../api/api';
import { IBackendRes, IGetCategory } from '../../types/backend';

const AdminCategory: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState<IGetCategory[]>([]);
    const [formData, setFormData] = useState({
        name: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response: any = await api.getAllCategory();
                if (response?.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setCategories([...categories, { name: formData.name }]);
        // console.log('categỏy', categories, formData)
        await api.addToCategory(formData)

        setVisible(false);
    };

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

            {/* Content */}
            <div style={{ marginBottom: '8px', background: '#fff', paddingTop: '10px' }}>
                <div className="category" style={{ display: 'flex', justifyContent: 'end', marginRight: '15px' }}>
                    <Button
                        label="Add Category"
                        icon="pi pi-plus"
                        onClick={() => setVisible(true)}
                        className="p-button-primary my-btn-custom"
                    />
                </div>
                {/* DataTable */}
                <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    <DataTable value={categories} className="row-border hover" paginator rows={6} responsiveLayout="scroll">
                        <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} />
                        <Column field="name" header="Category Name" />
                    </DataTable>
                </div>

                {/* Sidebar */}
                <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" style={{ width: "30vw" }}>
                    <h2 className="mb-4">Add Category</h2>
                    <form>
                        {/* Category Name */}
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

                        {/* Buttons */}
                        <div className="flex justify-content-end gap-2">
                            <Button
                                label="Add"
                                className="p-button-primary"
                                onClick={handleSubmit}
                            />
                            <Button
                                label="Discard"
                                className="p-button-danger"
                                onClick={() => setVisible(false)}
                            />
                        </div>
                    </form>
                </Sidebar>
            </div>
        </div>
    );
};

export default AdminCategory;
