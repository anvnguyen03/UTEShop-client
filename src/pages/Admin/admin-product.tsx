import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import * as api from '../../api/api';
import { IGetProduct } from '../../types/backend';

const AdminProduct: React.FC = () => {
    const [products, setProducts] = useState<IGetProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
    const navigate = useNavigate();

    // Lấy dữ liệu từ API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);  
            try {
                const response: any = await api.getAllProducts();
                setProducts(response?.data || []);
                console.log(products )
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        navigate('/admin/addproduct');
    };

    const getRowIndex = (index: number) => index + 1;

    return (
        <div className="card">
            {/* Header */}
            <div className="flex text-xl mb-5">
                <div className="text-gray-500 font-light">Dashboards / </div>
                <label className="ml-1 font-semibold">Product</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: 'large', marginBottom: '12px' }}>
                Product
            </div>

            {/* Content */}
            <div style={{ marginBottom: '8px', background: '#fff', paddingTop: '10px' }}>
                <div className="product mb-5" style={{ display: 'flex', justifyContent: 'end', marginRight: '15px'}}>
                    <Button
                        label="Add Product"
                        icon="pi pi-plus"
                        onClick={handleAddProduct}
                        className="p-button-primary my-btn-custom"
                    />
                </div>

                <div className="table-responsive text-nowrap">
                    <DataTable
                        value={products}
                        paginator
                        rows={5}
                        responsiveLayout="scroll"
                        loading={loading} 
                        className="row-border hover text-sm"
                    >
                        <Column header="STT" body={(rowData, { rowIndex }: any) => getRowIndex(rowIndex)} />
                        <Column field="name" header="Name" />
                        <Column
                            field="price"
                            header="Price"
                            body={(rowData: IGetProduct) => `${rowData.price.toLocaleString()} $`}
                        />
                        <Column
                            header="Image"
                            body={(rowData: IGetProduct) => (
                                <img
                                    src={rowData.image}
                                    alt={rowData.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            )}
                        />
                        <Column field="inventoryStatus" header="Stock" />
                        {/* <Column
                            header="Status"
                            body={(rowData: IGetProduct) => (
                                <span
                                    className={`badge ${rowData.inventoryStatus === 'INSTOCK' ? 'bg-success' : 'bg-dark'
                                        }`}
                                >
                                    {rowData.inventoryStatus === 'INSTOCK' ? 'In Stock' : 'Out of Stock'}
                                </span>
                            )}
                        /> */}
                        <Column
                            header="Actions"
                            body={() => (
                                <div className="dropdown">
                                    <div className="flex flex-row align-items-center gap-1">
                                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" />
                                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" />
                                        <Button icon="pi pi-info-circle" className="p-button-rounded p-button-secondary" />
                                    </div>
                                </div>
                            )}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default AdminProduct;
