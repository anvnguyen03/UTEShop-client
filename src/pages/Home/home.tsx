import { Button } from "primereact/button";
import { useAppSelector } from "../../redux/hooks";
import './home.css';
import WebLayout from "../../components/Layout/WebLayout";

const ServiceSection = (
    <div className="grid mt-8 ml-3 mr-3">
        <div className="col-12 md:col-6 lg:col-3 service-promo">
            <div className="image">
                <img src="src/assets/service-promo-1.png" alt="Free Shipping" />
            </div>
            <div className="content">
                <h6 className="title">FREE SHIPPING</h6>
                <p>Get 10% cash back, free shipping, free returns, and more at 1000+ top retailers!</p>
            </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3 service-promo">
            <div className="image">
                <img src="src/assets/service-promo-2.png" alt="Free Shipping" />
            </div>
            <div className="content">
                <h6 className="title">30 DAYS MONEY BACK</h6>
                <p>100% satisfaction guaranteed, or get your money back within 30 days!</p>
            </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3 service-promo">
            <div className="image">
                <img src="src/assets/service-promo-3.png" alt="Free Shipping" />
            </div>
            <div className="content">
                <h6 className="title">SAFE PAYMENT</h6>
                <p>Pay with the world’s most popular and secure payment methods.</p>
            </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3 service-promo">
            <div className="image">
                <img src="src/assets/service-promo-4.png" alt="Free Shipping" />
            </div>
            <div className="content">
                <h6 className="title">LOYALTY CUSTOMER</h6>
                <p>Card for the other 30% of their purchases at a rate of 1% cash back.</p>
            </div>
        </div>
    </div>
);

const ArrivalsSection = (
    <>
        <div className="mt-8 ml-3 mr-3 p-4">
            <h3 className="m-0 text-2xl">THE NEW ARRIVALS</h3>
            <p className="font-light">Preorder now to receive exclusive deals & gifts</p>
        </div>

        <div className="banner">
            <div className="banner-animation relative">
                <img src="src/assets/banner-style-3-img-1.jpg" alt="" />
                <div className="absolute top-0 left-50 w-7 z-4">
                    <h3 className="mb-4 text-6xl font-normal text-color">Modern Furniture Basic Collection</h3>
                    <h5 className="mt-0 little-title">WE DESIGN YOUR HOME MORE BEAUTIFUL</h5>
                    <Button label="Discover now" icon="pi pi-arrow-right" outlined/>
                </div>
                
            </div>
        </div>
    </>
    
);

const HomePage: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    console.log(isAuthenticated);
    return (
        <>
            <WebLayout>
                <div className="flex wrapper align-items-center h-screen">
                    <div>
                        <h4 className="title font-light mb-0">New Collection</h4>
                        <h2 className="title text-5xl mt-0">Best Of NeoCon Gold Award</h2>  
                        <Button className="title" label="Shop now" outlined />  
                    </div>
                </div>
                {ServiceSection}
                {ArrivalsSection}
            </WebLayout>   
        </>
    )
}
 
export default HomePage;