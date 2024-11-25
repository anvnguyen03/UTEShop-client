import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Button } from "primereact/button";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { ConfirmDialog } from "primereact/confirmdialog";

import * as api from '../../../api/api';
import { IGetProduct } from '../../../types/backend';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const AdminProduct: React.FC = () => {
    const [products, setProducts] = useState<IGetProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IGetProduct | null>(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState<IGetProduct | null>(null);
    const navigate = useNavigate();

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response: any = await api.getAllProducts();
                setProducts(response?.data || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        navigate('/admin/addproduct');
    };

    const handleEditProduct = (product: IGetProduct) => {
        navigate(`/admin/editproduct/${product.id}`);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            await api.deleteProduct(productToDelete.id); // Gửi yêu cầu xóa
            setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id)); // Cập nhật danh sách
            setIsDeleteDialogVisible(false); // Đóng hộp thoại
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };


    const confirmDeleteProduct = (product: IGetProduct) => {
        setProductToDelete(product);
        setIsDeleteDialogVisible(true);
    };

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
            </IconField>            <Button
                label="Add Product"
                icon="pi pi-plus"
                onClick={handleAddProduct}
                className="p-button-primary my-btn-custom"
            />
        </div>
    );

    const header = renderHeader();

    const ratingBodyTemplate = (rowData: IGetProduct) => (
        <Rating value={rowData.rating} readOnly cancel={false} />
    );

    const actionBodyTemplate = (rowData: IGetProduct) => (
        <div className="flex flex-row items-center gap-1">
            <Button
                icon="pi pi-pencil"
                rounded
                outlined
                onClick={() => handleEditProduct(rowData)}
            />
            <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                onClick={() => confirmDeleteProduct(rowData)}
            />
            <Button
                icon="pi pi-info-circle"
                rounded
                outlined
                severity="secondary"
                onClick={async () => {
                    // Fetch the product details based on the selected row's id
                    try {
                        const response: any = await api.getProduct(rowData.id);  // Call the API to get the product details
                        if (response?.data) {
                            setSelectedProduct(response.data);  // Set the selected product details
                            setIsDialogVisible(true);  // Show the dialog
                        }
                    } catch (error) {
                        console.error("Error fetching product details:", error);
                    }
                }}
            />
        </div>
    );


    return (
        <div className="card">
            <div className="flex text-xl mb-5">
                <span className="text-gray-500 font-light">Dashboards / </span>
                <label className="ml-1 font-semibold">Product</label>
            </div>

            <div style={{ marginBottom: '8px', background: '#fff', paddingTop: '10px' }}>
                <DataTable
                    value={products}
                    header={header}
                    paginator
                    rows={6}
                    responsiveLayout="scroll"
                    className="p-datatable-sm"
                    globalFilterFields={['name', 'description']}
                    filters={filters}
                >
                    <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} />
                    <Column field="name" header="Name" sortable />
                    <Column
                        field="price"
                        header="Price"
                        sortable
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
                    <Column field="inventoryStatus" header="Stock" sortable />
                    <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} />
                    <Column header="Actions" body={actionBodyTemplate} className="justify-center" />
                </DataTable>
            </div>

            {/* Dialog for product details */}
            {/* Dialog for product details */}
            {selectedProduct && (
                <Dialog
                    visible={isDialogVisible}
                    header="Product Details"
                    style={{ width: '50vw' }}
                    onHide={() => setIsDialogVisible(false)}
                >
                    <div>
                        <h4>{selectedProduct.name}</h4>
                        <p><strong>Category:</strong> {selectedProduct.categoryName}</p>
                        <p><strong>Price:</strong> {selectedProduct.price.toLocaleString()} $</p>
                        <p><strong>Stock:</strong> {selectedProduct.inventoryStatus}</p>
                        <p><strong>Rating:</strong> {selectedProduct.rating}</p>
                        <p><strong>Description:</strong> {selectedProduct.description}</p>

                        {/* Loop through the images and display them */}
                        <div className="image-gallery">
                            {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image || '/path/to/default-image.jpg'}  // Fallback image if not available
                                        alt={`${selectedProduct.name} - ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            maxHeight: '300px',
                                            objectFit: 'contain',
                                            marginBottom: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                ))
                            ) : (
                                <p>No images available for this product.</p>  // Show a message if no images are found
                            )}
                        </div>
                    </div>
                </Dialog>
            )}



            {/* Confirm dialog for delete */}
            <ConfirmDialog
                visible={isDeleteDialogVisible}
                onHide={() => setIsDeleteDialogVisible(false)}
                message="Are you sure you want to delete this product?"
                header="Confirm"
                icon="pi pi-exclamation-triangle"
                accept={handleDeleteProduct}
                reject={() => setIsDeleteDialogVisible(false)}
            />
        </div>
    );
};

export default AdminProduct;
