import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ProductService } from '../shop/productService';
import { Dropdown } from 'primereact/dropdown';
import WebLayout from '../../components/Layout/WebLayout';
import { SearchContext } from '../shop/search';
import * as api from '../../api/api';
import './shop.css';
import { IGetCategory, IGetProduct } from '../../types/backend';


export default function ShopPage() {
    const {categoryName} = useParams();
    const [products, setProducts] = useState<IGetProduct[]>([]);
    const [categories, setCategories] = useState<IGetCategory[]>([]);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const { searchTerm } = useContext(SearchContext);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
        {label: 'Category from a-z', value: 'category'},
    ];

    useEffect(() => {
        // ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
        const getAllCategory = async () => {
            const response: any = await api.getAllCategory();
            if(response?.data) {
                setCategories(response.data);
            }
        }
        getAllCategory();
        const getProducts = async () => {
            let response: any;
            if(!categoryName) {
                response = await api.getAllProducts();
            } else {
                response = await api.getProductsByCategoryName(categoryName);
            }
            setProducts(response.data? response.data : []);
        }
        getProducts();
    }, [categoryName]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getSeverity = (product: IGetProduct) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const onSortChange = (event:any) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const listItem = (product: IGetProduct, index: number) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <a href={`/product?id=${product.id}`}><img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.image} alt={product.name} /></a>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.categoryName}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product: IGetProduct) => {
        return (
            <>
                <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                    <div className="p-4 border-1 surface-border surface-card border-round">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.categoryName}</span>
                            </div>
                            <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <a href={`/product?id=${product.id}`}><img className="w-12 shadow-2 border-round" src={product.image} alt={product.name} /></a>
                            <div className="text-2xl font-bold">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                        </div>
                        <div className="flex align-items-center justify-content-between">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </>
            
        );
    };

    const itemTemplate = (product: IGetProduct, layout: string, index: number) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const header = () => {
        return (
            <>
                <div className='flex justify-content-between mt-6 '>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />
                    <div className="flex justify-content-end">
                        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                    </div>
                </div>
                <div className='flex mt-3'>
                    {
                        categories.map((category: any, index: any) => (
                            <Link key={index} 
                                className='category-button'
                                to={"/shop/" + category.name.replace(/ /g, "-")}
                                >
                                {category.name}
                            </Link>
                        ))
                    }
                </div>
            </>
        );
    };

    return (
        <WebLayout>            
            <div className="card">
                
                <DataView 
                    value={products} 
                    itemTemplate={itemTemplate} 
                    layout={layout} 
                    header={header()} 
                    sortField={sortField}
                    sortOrder={sortOrder === 1 || sortOrder === -1 ? sortOrder : null} 
                    paginator
                    rows={6} />
            </div>
        </WebLayout>
    )
}
        