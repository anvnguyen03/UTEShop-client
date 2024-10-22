
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductService } from '../Shop/productService';
import { Tag } from 'primereact/tag';
import { TabPanel, TabView } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import WebLayout from '../../components/Layout/WebLayout';
import { Rating } from 'primereact/rating';

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
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedSize, setSelectedSize] = useState('')

  const thumbnails = [
    `https://www.primefaces.org/cdn/primereact/images/product/${product?.image}`,
    "https://www.primefaces.org/cdn/primereact/images/product/headphones.jpg",
    "https://www.primefaces.org/cdn/primereact/images/product/light-green-t-shirt.jpg",
    "https://www.primefaces.org/cdn/primereact/images/product/lime-band.jpg",
  ]

  const colors = [
    { id: 'bluegray', className: 'bg-bluegray-500' },
    { id: 'green', className: 'bg-green-500' },
    { id: 'blue', className: 'bg-blue-500' },
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  const reviews = [
    {
      rating: 4,
      title: 'Absolute Perfection!',
      description: 'Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu dictum varius duis at consectetur lorem donec massa. Imperdiet proin fermentum leo vel orci porta non. Porttitor rhoncus dolor purus non.',
      reviewer: 'Darlene Robertson',
      time: '2 days ago',
    },
    {
      rating: 5,
      title: 'Classy',
      description: 'Venenatis cras sed felis eget. Proin nibh nisl condimentum id venenatis a condimentum.',
      reviewer: 'Kristin Watson',
      time: '2 days ago',
    },
  ]

  const handleColorClick = (colorId) => {
    setSelectedColor(colorId)
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size)
  };

  useEffect(() => {

  }, []);

  return (
    <WebLayout>
      <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div className="grid mb-4">
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
            <div className="flex align-items-center mb-5 justify-content-between">
              <div className="flex align-items-center">
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
              <span className="text-sm">
                <b className="text-900 mr-1">104</b> <span className="text-500" />
                in stock
              </span>
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
                  className={`col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors ${selectedSize === size ? 'border-blue-500 border-2 text-blue-500' : ''
                    }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="font-bold text-900 mb-3">Quantity</div>
            <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between">
              <InputNumber
                value={quantity}
                onValueChange={(e) => setQuantity(e.value || 1)}
                mode="decimal"
                showButtons
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-text"
                incrementButtonClassName="p-button-text"
                inputClassName="w-3rem text-center"
                min={0}
              />
              <div className="flex align-items-center flex-1 mt-3 sm:mt-0 ml-0 sm:ml-5">
                <Button label="Add to Cart" icon="pi pi-shopping-cart" className="flex-1 mr-5" />
                <i className="pi pi-heart text-600 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <TabView>
          <TabPanel header="Details">
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
          </TabPanel>
          <TabPanel header="Reviews">
            <div className="text-900 font-medium text-3xl mb-4 mt-2">Customer Reviews</div>
            <ul className="list-none p-0 m-0">
              {reviews.map((review, index) => (
                <li key={index} className="pb-5 border-bottom-1 surface-border">
                  <Rating value={review.rating} readOnly stars={5} cancel={false} className="mr-3" />
                  <div className="text-900 font-medium text-xl my-3">{review.title}</div>
                  <p className="mx-0 mt-0 mb-3 text-700 line-height-3">{review.description}</p>
                  <span className="text-600 font-medium">
                    {review.reviewer}, {review.time}
                  </span>
                </li>
              ))}
            </ul>
          </TabPanel>
        </TabView>
      </div>
    </WebLayout>
  )
}
