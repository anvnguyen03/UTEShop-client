import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 

const AdminProduct: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate(); 

    const sampleProduct = {
        id: 1,
        name: 'Product Name',
        price: 99.99,
        img1: 'image_url_1.jpg',
        img2: 'image_url_2.jpg',
        img3: 'image_url_3.jpg',
        status: 'AVAILABLE',  
        stock: 10, 
    };

    const sampleProducts = [
        sampleProduct,
        { ...sampleProduct, id: 2, name: 'Product 2', price: 59.99, stock: 5, status: 'DELETED' },
        { ...sampleProduct, id: 3, name: 'Product 3', price: 149.99, stock: 20, status: 'AVAILABLE' },
        { ...sampleProduct, id: 4, name: 'Product 4', price: 199.99, stock: 3, status: 'AVAILABLE' },
        { ...sampleProduct, id: 5, name: 'Product 5', price: 79.99, stock: 0, status: 'DELETED' },
    ];

    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    // Redirect to Add Product page
    const handleAddProduct = () => {
        navigate('/admin/addproduct'); // Using navigate to redirect
    };

    // Function to get the row index as STT (sequence number)
    const getRowIndex = (index: number) => index + 1;

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="py-3 mb-4">
                <span className="text-muted fw-light">Dashboards /</span> Products
            </h4>

            <div className="card">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-header">Products</h5>
                    <Button
                        label="Add Product"
                        icon="pi pi-plus"
                        onClick={handleAddProduct}
                        className="btn btn-primary"
                    />
                </div>

                <div className="table-responsive text-nowrap">
                    <DataTable
                        value={products}
                        paginator
                        rows={5}
                        responsiveLayout="scroll"
                        className="row-border hover text-sm"
                    >
                        {/* Sử dụng getRowIndex để hiển thị STT */}
                        <Column header="STT" body={(rowData, { rowIndex }: any) => getRowIndex(rowIndex)} />
                        <Column header="Name" body={(rowData: any) => rowData.name} />
                        <Column header="Price" body={(rowData: any) => `${rowData.price} $`} />
                        <Column
                            header="Images"
                            body={(rowData: any) => (
                                <div className="avatar-group d-flex align-items-center">
                                    <img
                                        src={rowData.img1}
                                        alt="Avatar"
                                        className="rounded-circle avatar-xs"
                                    />
                                    <img
                                        src={rowData.img2}
                                        alt="Avatar"
                                        className="rounded-circle avatar-xs"
                                    />
                                    <img
                                        src={rowData.img3}
                                        alt="Avatar"
                                        className="rounded-circle avatar-xs"
                                    />
                                </div>
                            )}
                        />
                        <Column header="Stock" body={(rowData: any) => rowData.stock} />
                        <Column
                            header="Status"
                            body={(rowData: any) => (
                                <span
                                    className={`badge ${rowData.status === 'AVAILABLE' ? 'bg-success' : 'bg-dark'}`}
                                >
                                    {rowData.status === 'AVAILABLE' ? 'Available' : 'Deleted'}
                                </span>
                            )}
                        />
                        <Column
                            header="Actions"
                            body={(rowData: any) => (
                                <div className="dropdown">
                                    <ul className="flex flex-row align-items-center">
                                        <li>
                                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" />
                                        </li>
                                        <li>
                                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" />
                                        </li>
                                        <li>
                                            <Button icon="pi pi-info-circle" className="p-button-rounded p-button-secondary" />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default AdminProduct;
