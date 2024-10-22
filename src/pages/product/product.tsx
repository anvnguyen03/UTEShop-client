
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductService } from '../shop/productService';
import { Tag } from 'primereact/tag';

export default function ProductPage() {

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const id = query.get('id');
  const product = ProductService.getProductById(id)

  const [selectedImage, setSelectedImage] = useState<string>(
    `https://www.primefaces.org/cdn/primereact/images/product/${product?.image}` // Default image
  );
  const thumbnails = [
    `https://www.primefaces.org/cdn/primereact/images/product/${product?.image}`,
    "https://www.primefaces.org/cdn/primereact/images/product/headphones.jpg",
    "https://www.primefaces.org/cdn/primereact/images/product/light-green-t-shirt.jpg",
    "https://www.primefaces.org/cdn/primereact/images/product/lime-band.jpg",
  ];
  const [quantity, setQuantity] = useState<number>(1);

  const [selectedColor, setSelectedColor] = useState('');

  const colors = [
    { id: 'bluegray', className: 'bg-bluegray-500' },
    { id: 'green', className: 'bg-green-500' },
    { id: 'blue', className: 'bg-blue-500' },
  ];

  const handleColorClick = (colorId) => {
    setSelectedColor(colorId);
  };

  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {

  }, []);

  return (
    <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div className="grid mb-7">
        <div className="col-12 lg:col-6">
          <div className="flex">
            <div className="flex flex-column w-2 justify-content-between">
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`thumbnail-${index}`}
                  className={`w-full cursor-pointer border-2 border-round transition-colors transition-duration-150 ${selectedImage === thumbnail ? 'border-primary' : 'border-transparent'
                    }`}
                  onClick={() => setSelectedImage(thumbnail)}
                />
              ))}
            </div>
            <div className="pl-3 w-10">
              <img
                src={selectedImage}
                className="w-full"
                alt="product-overview"
              />
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-6 py-3 lg:pl-6">
          <div className="flex align-items-center text-xl font-medium text-900 mb-4">
            {product?.name} 
          </div>
          <div className="flex align-items-center justify-content-between mb-5">
            <span className="text-900 font-medium text-3xl block">${product?.price}</span>
            <div className="flex align-items-center">
              <span className="mr-3">
                <i className="pi pi-star-fill text-yellow-500 mr-1" />
                <i className="pi pi-star-fill text-yellow-500 mr-1" />
                <i className="pi pi-star-fill text-yellow-500 mr-1" />
                <i className="pi pi-star-fill text-yellow-500 mr-1" />
                <i className="pi pi-star text-700 mr-1" />
              </span>
              <span className="text-sm">
                <b className="text-900 mr-1">24</b> <span className="text-500" />
                reviews
              </span>
            </div>
          </div>
          <div className="font-bold text-900 mb-3">Color</div>
          <div className="flex align-items-center mb-5">
            {colors.map(color => (
              <div
                key={color.id}
                className={`w-2rem h-2rem flex-shrink-0 border-circle ${color.className} mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300`}
                style={{
                  boxShadow: selectedColor === color.id ? '0 0 0 0.2rem var(--' + color.id + '-500)' : 'none',
                }}
                onClick={() => handleColorClick(color.id)}
              />
            ))}
          </div>
          <div className="mb-3 flex align-items-center justify-content-between">
            <span className="font-bold text-900">Size</span>
            <a
              tabIndex={0}
              className="cursor-pointer text-600 text-sm flex align-items-center"
            >
              Size Guide <i className="ml-1 pi pi-angle-right" />
            </a>
          </div>
          <div className="grid grid-nogutter align-items-center mb-5">
            {sizes.map(size => (
              <div
                  key={size}
                  className={`col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors ${
                      selectedSize === size ? 'border-blue-500 border-2 text-blue-500' : ''
                  }`}
                  onClick={() => handleSizeClick(size)}
              >
                  {size}
              </div>
              ))}
          </div>
          <div className="font-bold text-900 mb-3">Quantity</div>
          <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between">
            <span className="p-inputnumber p-component p-inputwrapper p-inputwrapper-filled p-inputnumber-buttons-horizontal">
              <input
                role="spinbutton"
                className="p-inputtext p-component p-filled p-inputnumber-input w-3rem text-center"
                type="text"
                inputMode="numeric"
                min={0}
                aria-valuemin={0}
                aria-valuenow={quantity}
                value={quantity}
              />
              <button
                type="button" onClick={() => setQuantity(quantity + 1)}
                className="p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component p-button-text"
                tabIndex={-1}
              >
                <span className="p-button-icon pi pi-plus" />
                <span
                  role="presentation"
                  className="p-ink"
                  style={{ height: 48, width: 48 }}
                />
              </button>
              <button
                type="button" onClick={() => setQuantity(quantity - 1)}
                className="p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component p-button-text"
                tabIndex={-1}
              >
                <span className="p-button-icon pi pi-minus" />
                <span
                  role="presentation"
                  className="p-ink"
                  style={{ height: 48, width: 48 }}
                />
              </button>
            </span>
            <div className="flex align-items-center flex-1 mt-3 sm:mt-0 ml-0 sm:ml-5">
              <button
                aria-label="Add to Cart"
                className="p-button p-component flex-1 mr-5"
              >
                <span className="p-button-label p-c">Add to Cart</span>
                <span
                  role="presentation"
                  className="p-ink"
                  style={{ height: 239, width: 239 }}
                />
              </button>
              <i className="pi text-2xl cursor-pointer pi-heart text-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-tabview p-component">
        <div className="p-tabview-nav-container">
          <div className="p-tabview-nav-content" id="pr_id_1">
            <ul className="p-tabview-nav" role="tablist">
              <li
                className="p-unselectable-text p-tabview-selected p-highlight"
                role="presentation"
              >
                <a
                  role="tab"
                  className="p-tabview-nav-link"
                  id="pr_id_1_header_0"
                  aria-controls="pr_id_1_content_0"
                  aria-selected="true"
                  tabIndex={0}
                >
                  <span className="p-tabview-title">Details</span>
                  <span
                    role="presentation"
                    className="p-ink"
                    style={{ height: "91.4271px", width: "91.4271px" }}
                  />
                </a>
              </li>
              <li className="p-unselectable-text" role="presentation">
                <a
                  role="tab"
                  className="p-tabview-nav-link"
                  id="pr_id_1_header_1"
                  aria-controls="pr_id_1_content_1"
                  aria-selected="false"
                  tabIndex={0}
                >
                  <span className="p-tabview-title">Reviews</span>
                  <span
                    role="presentation"
                    className="p-ink"
                    style={{ height: "100.375px", width: "100.375px" }}
                  />
                </a>
              </li>
              <li className="p-unselectable-text" role="presentation">
                <a
                  role="tab"
                  className="p-tabview-nav-link"
                  id="pr_id_1_header_2"
                  aria-controls="pr_id_1_content_2"
                  aria-selected="false"
                  tabIndex={0}
                >
                  <span className="p-tabview-title">Shipping</span>
                  <span
                    role="presentation"
                    className="p-ink"
                    style={{ height: "107.125px", width: "107.125px" }}
                  />
                </a>
              </li>
              <li className="p-tabview-ink-bar" style={{ width: 91, left: 0 }} />
            </ul>
          </div>
        </div>
        <div className="p-tabview-panels">
          <div
            id="pr_id_1_content_0"
            aria-labelledby="pr_id_1_header_0"
            aria-hidden="false"
            className="p-tabview-panel"
            role="tabpanel"
          >
            <div className="text-900 font-medium text-3xl mb-4 mt-2">
              Product Details
            </div>
            <p className="line-height-3 text-700 p-0 mx-0 mt-0 mb-4">
              Volutpat maecenas volutpat blandit aliquam etiam erat velit
              scelerisque in. Duis ultricies lacus sed turpis tincidunt id. Sed
              tempus urna et pharetra. Metus vulputate eu scelerisque felis
              imperdiet proin fermentum. Venenatis urna cursus eget nunc scelerisque
              viverra mauris in. Viverra justo nec ultrices dui sapien eget mi
              proin. Laoreet suspendisse interdum consectetur libero id faucibus.
            </p>
            <div className="grid">
              <div className="col-12 lg:col-4">
                <span className="text-900 block font-medium mb-3">Highlights</span>
                <ul className="py-0 pl-3 m-0 text-700 mb-3">
                  <li className="mb-2">Vulputate sapien nec.</li>
                  <li className="mb-2">Purus gravida quis blandit.</li>
                  <li className="mb-2">Nisi quis eleifend quam adipiscing.</li>
                  <li>Imperdiet proin fermentum.</li>
                </ul>
              </div>
              <div className="col-12 lg:col-4">
                <span className="text-900 block font-medium mb-3">
                  Size and Fit
                </span>
                <ul className="list-none p-0 m-0 text-700 mb-4">
                  <li className="mb-3">
                    <span className="font-medium">Leo vel:</span> Egestas congue.
                  </li>
                  <li className="mb-3">
                    <span className="font-medium">Sociis natoque:</span> Parturient
                    montes nascetur.
                  </li>
                  <li>
                    <span className="font-medium">Suspendisse in:</span> Purus sit
                    amet volutpat.
                  </li>
                </ul>
              </div>
              <div className="col-12 lg:col-4">
                <span className="text-900 block font-medium mb-3">
                  Material &amp; Care
                </span>
                <ul className="p-0 m-0 text-700 flex flex-wrap flex-column xl:flex-row">
                  <li className="flex align-items-center white-space-nowrap w-10rem block mr-2 mb-3">
                    <i className="pi pi-sun mr-2" />
                    <span>Not dryer safe</span>
                  </li>
                  <li className="flex align-items-center white-space-nowrap w-10rem block mb-3">
                    <i className="pi pi-times-circle mr-2" />
                    <span>No chemical wash</span>
                  </li>
                  <li className="flex align-items-center white-space-nowrap w-10rem block mb-3 mr-2">
                    <i className="pi pi-sliders-h mr-2" />
                    <span>Iron medium heat</span>
                  </li>
                  <li className="flex align-items-center white-space-nowrap w-10rem block mb-3">
                    <i className="pi pi-minus-circle mr-2" />
                    <span>Dry flat</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
