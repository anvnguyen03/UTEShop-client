import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';

import * as api from '../../../api/api';
import { IGetProduct, IGetCategory } from '../../../types/backend';

interface Product {
    name: string;
    description: string;
    price: number;
    // rating: number;
    stock: number;
    categoryId: string;
}

const AdminAddProduct: React.FC = () => {
    const [categories, setCategories] = useState<IGetCategory[]>([]);
    const navigate = useNavigate();


    const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
    const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
    const [selectedFile4, setSelectedFile4] = useState<File | null>(null);
    const [selectedFile5, setSelectedFile5] = useState<File | null>(null);

    const [imagePreview1, setImagePreview1] = useState<string | null>(null);
    const [imagePreview2, setImagePreview2] = useState<string | null>(null);
    const [imagePreview3, setImagePreview3] = useState<string | null>(null);
    const [imagePreview4, setImagePreview4] = useState<string | null>(null);
    const [imagePreview5, setImagePreview5] = useState<string | null>(null);

    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        // rating: 0,
        stock: 0,
        categoryId: '',
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


    const [errorMessage, setErrorMessage] = useState<string>('');

    // Handle input change for form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // Handle the form submission
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        if (product.name && product.price !== null && product.categoryId !== null) {
            console.log('Product Created:', product);
            try {
                const formData = new FormData();
            
                // Thêm dữ liệu sản phẩm vào FormData
                formData.append('name', product.name);
                formData.append('description', product.description);
                formData.append('price', product.price.toString());
                formData.append('stock', product.stock.toString());
                formData.append('categoryId', product.categoryId);

                // Thêm file ảnh vào FormData
                if (selectedFile1) formData.append('images', selectedFile1);
                if (selectedFile2) formData.append('images', selectedFile2);
                if (selectedFile3) formData.append('images', selectedFile3);
                if (selectedFile4) formData.append('images', selectedFile4);
                if (selectedFile5) formData.append('images', selectedFile5);

                // Gửi dữ liệu lên API
                await api.addProduct(formData);

                setErrorMessage('');
                setProduct({
                    name: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    categoryId: '',
                });

                // Reset image previews
                setImagePreview1(null);
                setImagePreview2(null);
                setImagePreview3(null);
                setImagePreview4(null);
                setImagePreview5(null);

                // navigate('/admin/product');

            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        } else {
            setErrorMessage('Please fill in all required fields!');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
        const file = e.target.files?.[0];
        if (file) {
            if (index === 1) {
                setSelectedFile1(file);
                setImagePreview1(URL.createObjectURL(file));
            } else if (index === 2) {
                setSelectedFile2(file);
                setImagePreview2(URL.createObjectURL(file));
            } else if (index === 3) {
                setSelectedFile3(file);
                setImagePreview3(URL.createObjectURL(file));
            }
            else if (index === 4) {
                setSelectedFile4(file);
                setImagePreview4(URL.createObjectURL(file));
            }
            else if (index === 5) {
                setSelectedFile5(file);
                setImagePreview5(URL.createObjectURL(file));
            }
        }
    };

    return (
        <div className="container">
            <h3>Dashboards / Products - Add</h3>

            <div className="card">
                <h4 className="card-header" style={{ display: 'flex', justifyContent: 'center' }}>Add Product Form</h4>
                <div className="card-body">

                    {errorMessage && (
                        <Message severity="error" text={errorMessage} />
                    )}

                    <div className="row">
                        <h5>1. Product Details</h5>
                        <hr />
                    </div>
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
                                optionValue="_id" // Lấy `_id` làm giá trị thực khi chọn
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
                        {/* <div className="rating flex">
                            <label style={{ width: '110px' }}>Rating</label>
                            <InputNumber
                                id="rating"
                                name="rating"
                                value={product.price ?? 0}
                                onValueChange={(e) => setProduct({ ...product, rating: e.value ?? 0 })}
                                className="form-control ml-3 mb-3"
                            />
                        </div> */}

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

                        <h5 className='mt-3'>2. Product Images</h5>
                        <hr />

                        <div className="col-md-6">
                            {imagePreview1 && <img src={imagePreview1} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img1</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 1)}
                                accept="image/*"
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="col-md-6">
                            {imagePreview2 && <img src={imagePreview2} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img2</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 2)}
                                accept="image/*"
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="col-md-6">
                            {imagePreview3 && <img src={imagePreview3} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img3</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 3)}
                                accept="image/*"
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="col-md-6">
                            {imagePreview4 && <img src={imagePreview4} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img4</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 4)}
                                accept="image/*"
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="col-md-6">
                            {imagePreview5 && <img src={imagePreview5} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img5</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 5)}
                                accept="image/*"
                                className="form-control ml-3 mb-3"
                            />
                        </div>

                        <div className="col-12">
                            <Button type="submit" label="Add Product" className="p-button p-button-primary" />
                            <Button
                                type="button"
                                label="Clear"
                                className="p-button p-button-danger ml-2"
                                onClick={() => setProduct({
                                    name: '',
                                    description: '',
                                    price: 0,
                                    // rating: 0,
                                    stock: 0,
                                    categoryId: '',
                                })}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;
