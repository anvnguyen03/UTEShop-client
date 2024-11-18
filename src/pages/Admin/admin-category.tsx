import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const AdminCategory: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState([
        { name: "Category 1", description: "Description 1" },
        { name: "Category 2", description: "Description 2" },
        { name: "Category 3", description: "Description 3" },
        { name: "Category 3", description: "Description 3" },
        { name: "Category 3", description: "Description 3" },
        { name: "Category 3", description: "Description 3" },
        { name: "Category 3", description: "Description 3" },
        { name: "Category 3", description: "Description 3" },
    ]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setCategories([...categories, formData]);
        setFormData({ name: "", description: "" }); 
        setVisible(false); 
    };

    return (
        <div className="card">
            {/* Header */}
            <div className="flex text-xl mb-5">
                <div className="text-gray-500 font-light">Dashboards / </div>
                <label className="ml-1 font-semibold">Category</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'large', marginBottom: '12px'}}>
                Category
            </div>

            {/* Content */}
            <div style={{marginBottom: '8px', background: '#fff', paddingTop: '10px'}}>
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
                        <Column field="description" header="Description" />
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

                        {/* Description */}
                        <div className="field mb-4">
                            <label htmlFor="description" className="block font-medium mb-2">
                                Description
                            </label>
                            <InputText
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter description"
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
