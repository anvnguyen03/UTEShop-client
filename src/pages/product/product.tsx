
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductService } from '../Shop/productService';
import { Tag } from 'primereact/tag';
import { TabPanel, TabView } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import WebLayout from '../../components/Layout/WebLayout';
import { Rating } from 'primereact/rating';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

export default function ProductPage() {

  const toast = useRef<Toast>(null)
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
  const [isInWishlist, setInWishlist] = useState<boolean>(false)

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

  const reviewsData = [
    {
      name: 'Robert Fox',
      date: 'February 3, 2022',
      avatar: 'https://blocks.primereact.org/demo/images/blocks/avatars/circle/avatar-m-1.png',
      rating: 5,
      content:
        'Scelerisque varius morbi enim nunc. Arcu bibendum at varius vel pharetra vel turpis nunc eget.',
    },
    {
      name: 'Savannah Williams',
      date: 'February 4, 2022',
      avatar: 'https://blocks.primereact.org/demo/images/blocks/avatars/circle/avatar-f-3.png',
      rating: 5,
      content:
        'Orci porta non pulvinar neque laoreet suspendisse interdum consectetur.',
    },
    {
      name: 'Kathryn Murphy',
      date: 'February 5, 2022',
      avatar: '	https://blocks.primereact.org/demo/images/blocks/avatars/circle/avatar-f-2.png',
      rating: 4,
      content:
        'Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula.',
    },
  ]

  const handleColorClick = (colorId) => {
    setSelectedColor(colorId)
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size)
  }

  const handleAddToWishlist = () => {
    toast.current!.show({
      severity: 'success',
      summary: `Added to Wishlist`,
      life: 1500,
      content: (props) => (
        <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
          <div className="flex align-items-center gap-2">
            <Avatar image={`https://www.primefaces.org/cdn/primereact/images/product/${product?.image}`} shape='circle' size='large' />
            <span className="font-bold text-900">{props.message.summary}</span>
          </div>
        </div>
      )
    })
    setInWishlist(true)
  }

  const handleRemoveFromWishlist = () => {
    toast.current!.show({
      severity: 'info',
      summary: `Removed from Wishlist`,
      life: 1500,
      content: (props) => (
        <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
          <div className="flex align-items-center gap-2">
            <Avatar image={`https://www.primefaces.org/cdn/primereact/images/product/${product?.image}`} shape='circle' size='large' />
            <span className="font-bold text-900">{props.message.summary}</span>
          </div>
        </div>
      )
    })
    setInWishlist(false)
  }

  useEffect(() => {

  }, []);

  return (
    <WebLayout>
      <Toast ref={toast} position="top-right" />
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
                {isInWishlist ? (
                  <Button icon="pi pi-heart" rounded severity="danger" aria-label="Favorite" onClick={handleRemoveFromWishlist}/>
                ) : (
                  <Button icon="pi pi-heart" rounded text raised severity="danger" aria-label="Favorite" onClick={handleAddToWishlist} />
                )
                }
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
            <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
              <div className="grid">

                {/* Section 1: Review Stats */}
                <div className="col-12 lg:col-6 flex align-items-start justify-content-center py-5 lg:py-0">
                  <div className="text-center">
                    <span className="text-5xl text-900 font-bold mr-2">{reviewsData.length}</span>
                    <span className="text-5xl text-600">Reviews</span>
                    <div className="mt-3">
                      {[...Array(3)].map((_, i) => (
                        <i key={i} className="pi pi-star-fill text-yellow-500 text-2xl mr-1"></i>
                      ))}
                      {[...Array(5 - 3)].map((_, i) => (
                        <i className="pi pi-star-fill text-300 text-2xl mr-1"></i>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: Star Rating Distribution */}
                <div className="col-12 lg:col-6">
                  <ul className="list-none p-0 m-0">
                    {[
                      { stars: 5, percentage: 75, width: '75%' },
                      { stars: 4, percentage: 50, width: '50%' },
                      { stars: 3, percentage: 20, width: '20%' },
                      { stars: 2, percentage: 40, width: '40%' },
                      { stars: 1, percentage: 30, width: '30%' },
                    ].map((item, index) => (
                      <li key={index} className="flex align-items-center mb-2">
                        <span className="text-900 font-medium mr-1 w-1rem">{item.stars}</span>
                        <i className="pi pi-star-fill text-yellow-500 mr-2"></i>
                        <div className="border-round overflow-hidden flex-auto surface-300" style={{ height: '7px' }}>
                          <div className="h-full bg-yellow-500 border-round" style={{ width: item.width }}></div>
                        </div>
                        <span className="text-500 font-medium ml-2">{item.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Divider />

              {/* Section 3: User Reviews */}
              <ul className="list-none m-0 p-0">
                {reviewsData.map((review, index) => (
                  <li key={index} className="py-5 border-top-1 surface-border">
                    <div className="flex align-items-center justify-content-between mb-3">
                      <div className="flex align-items-center">
                        <Avatar
                          image={review.avatar}
                          shape="circle"
                          className="w-3rem h-3rem flex-shrink-0 mr-3"
                        />
                        <div className="flex flex-column">
                          <span className="text-900 font-medium mb-1">{review.name}</span>
                          <span className="text-500 font-medium text-sm">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex align-items-center">
                        <span className="mr-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <i key={i} className="pi pi-star-fill text-yellow-500 mr-1"></i>
                          ))}
                        </span>
                        <span className="font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-600 p-0 m-0 line-height-3">{review.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </WebLayout>
  )
}
