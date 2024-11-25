import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate, useParams } from 'react-router-dom';

import * as api from '../../../api/api';
import { IGetProduct, IGetCategory } from '../../../types/backend';

interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
}

const AdminEditProduct: React.FC = () => {
    const [categories, setCategories] = useState<IGetCategory[]>([]);
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categoryId: '',
    });

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                console.error("Product ID is required");
                return;
            }

            try {
                const response: any = await api.getProduct(id);
                if (response?.data) {
                    const { name, description, price, stock, categoryId, images } = response.data;
                    setProduct({ name, description, price, stock, categoryId });
                    setImagePreviews(images || []);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

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

        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        if (!id) {
            setErrorMessage('Product ID is required');
            return;
        }
        if (product.name && product.price !== null && product.categoryId !== null) {
            try {
                await api.editProduct(id, product);
                setErrorMessage('');
                navigate('/admin/product');
            } catch (error) {
                console.error("Error updating product:", error);
            }
        } else {
            setErrorMessage('Please fill in all required fields!');
        }
    };

    return (
        <div className="container">
            <h3>Dashboards / Products - Edit</h3>

            <div className="card">
                <h4 className="card-header" style={{ display: 'flex', justifyContent: 'center' }}>Edit Product Form</h4>
                <div className="card-body">

                    {errorMessage && (
                        <Message severity="error" text={errorMessage} />
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="product-name">
                            <label style={{ width: '110px' }}>Product Name</label>
                            <InputText
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="category flex mb-3">
                            <label style={{ width: '110px' }} className='mr-3'>Category</label>
                            <Dropdown
                                id="categoryId"
                                name="categoryId"
                                value={product.categoryId}
                                options={categories}
                                onChange={(e) => setProduct({ ...product, categoryId: e.value })}
                                optionLabel="name"
                                optionValue="_id"
                                placeholder="Select a Category"
                            />
                        </div>

                        <div className="price flex">
                            <label style={{ width: '110px' }}>Price</label>
                            <InputNumber
                                id="price"
                                name="price"
                                value={product.price ?? 0}
                                onValueChange={(e) => setProduct({ ...product, price: e.value ?? 0 })}
                                className="form-control ml-3 mb-3"
                                mode="currency"
                                currency="USD"
                            />
                        </div>

                        <div className="stock flex">
                            <label style={{ width: '110px' }}>Stock</label>
                            <InputNumber
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onValueChange={(e) => setProduct({ ...product, stock: e.value ?? 0 })}
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="description flex mb-5">
                            <label style={{ alignContent: 'center', width: '110px' }}>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="form-control ml-3"
                                rows={3}
                            />
                        </div>

                        <h5 className='mt-3'>Product Images</h5>
                        <hr />

                        {imagePreviews.map((preview, index) => (
                            <div className="col-md-6" key={index}>
                                <img src={preview} alt={`Preview ${index}`} style={{ width: '100%', height: '100%' }} />
                            </div>
                        ))}

                        <div className="col-12">
                            <Button type="submit" label="Update Product" className="p-button p-button-primary" />
                            <Button
                                type="button"
                                label="Cancel"
                                className="p-button p-button-danger ml-2"
                                onClick={() => navigate('/admin/product')}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminEditProduct;
