import React, { useState, ChangeEvent, FormEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';

// Define interfaces for product and category
interface Category {
    id: number;
    name: string;
}

interface Product {
    name: string;
    description: string;
    price: number;  // Allow price to be null
    stoke: number;  // Allow stock to be null
    categoryId: string | null;
}

const AdminAddProduct: React.FC = () => {
    const [categories] = useState<Category[]>([
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Home & Kitchen' },
        { id: 4, name: 'Toys & Games' },
    ]);

    const navigate = useNavigate();


    const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
    const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    const [selectedFile3, setSelectedFile3] = useState<File | null>(null);

    const [imagePreview1, setImagePreview1] = useState<string | null>(null);
    const [imagePreview2, setImagePreview2] = useState<string | null>(null);
    const [imagePreview3, setImagePreview3] = useState<string | null>(null);

    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,  // Initialize as null
        stoke: 0,  // Initialize as null
        categoryId: null,
    });

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Handle input change for form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // Handle the form submission
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        if (product.name && product.price !== null && product.categoryId !== null) {
            console.log('Product Created:', product);
            setSuccessMessage('Product added successfully!');
            setErrorMessage('');
            setProduct({
                name: '',
                description: '',
                price: 0,
                stoke: 0,
                categoryId: null,
            });
            // Reset image previews
            setImagePreview1(null);
            setImagePreview2(null);
            setImagePreview3(null);
            navigate('/admin/product');
        } else {
            setErrorMessage('Please fill in all required fields!');
            setSuccessMessage('');
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
        }
    };

    return (
        <div className="container">
            <h4>Dashboards / Products - Add</h4>

            <div className="card">
                <h5 className="card-header">Add Product Form</h5>
                <div className="card-body">
                    {successMessage && (
                        <Message severity="success" text={successMessage} />
                    )}
                    {errorMessage && (
                        <Message severity="error" text={errorMessage} />
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <h6>1. Product Details</h6>
                            <hr />
                        </div>

                        <div className="col-md-6">
                            <label>Product Name</label>
                            <InputText
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Category</label>
                            <Dropdown
                                id="categoryId"
                                name="categoryId"
                                value={product.categoryId}
                                options={categories}
                                onChange={(e) => setProduct({ ...product, categoryId: e.value })}
                                optionLabel="name"
                                placeholder="Select a Category"
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Price</label>
                            <InputNumber
                                id="price"
                                name="price"
                                value={product.price ?? 0} 
                                onValueChange={(e) => setProduct({ ...product, price: e.value ?? 0 })}
                                className="form-control"
                                mode="currency"
                                currency="USD"
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Stock</label>
                            <InputNumber
                                id="stoke"
                                name="stoke"
                                value={product.stoke ?? 0}  
                                onValueChange={(e) => setProduct({ ...product, stoke: e.value ?? 0 })}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="form-control"
                                rows={3}
                            />
                        </div>

                        <h6>2. Product Images</h6>
                        <hr />

                        <div className="col-md-6">
                            {imagePreview1 && <img src={imagePreview1} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img1</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 1)}
                                accept="image/*"
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-6">
                            {imagePreview2 && <img src={imagePreview2} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img2</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 2)}
                                accept="image/*"
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-6">
                            {imagePreview3 && <img src={imagePreview3} style={{ width: '100%', height: '100%' }} />}
                            <label>Product img3</label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 3)}
                                accept="image/*"
                                className="form-control"
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
                                    stoke: 0, 
                                    categoryId: null,
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
