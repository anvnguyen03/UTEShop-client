import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-section footer-bg mt-4 p-4">
      <div className="footer-wrapper">
        {/* Start Footer Top */}
        <div className="footer-top">
          <div className="grid">
            <div className="col-12 lg:col-3 sm:col-6 mb-3">
              {/* Start Footer Single Item */}
              <div className="footer-widget-single-item footer-widget-color--golden" data-aos="fade-up" data-aos-delay="0">
                <h5 className="text-xl font-medium title">INFORMATION</h5>
                <ul className="list-none p-0">
                  <li className="mb-2"><a href="#">Delivery Information</a></li>
                  <li className="mb-2"><a href="#">Terms & Conditions</a></li>
                  <li className="mb-2"><a href="contact-us.html">Contact</a></li>
                  <li><a href="#">Returns</a></li>
                </ul>
              </div>
              {/* End Footer Single Item */}
            </div>

            <div className="col-12 lg:col-3 sm:col-6 mb-3">
              {/* Start Footer Single Item */}
              <div className="footer-widget-single-item footer-widget-color--golden" data-aos="fade-up" data-aos-delay="200">
                <h5 className="text-xl font-medium title">MY ACCOUNT</h5>
                <ul className="list-none p-0">
                  <li className="mb-2"><a href="my-account.html">My account</a></li>
                  <li className="mb-2"><a href="wishlist.html">Wishlist</a></li>
                  <li className="mb-2"><a href="privacy-policy.html">Privacy Policy</a></li>
                  <li className="mb-2"><a href="faq.html">Frequently Questions</a></li>
                  <li><a href="#">Order History</a></li>
                </ul>
              </div>
              {/* End Footer Single Item */}
            </div>

            <div className="col-12 lg:col-3 sm:col-6 mb-3">
              {/* Start Footer Single Item */}
              <div className="footer-widget-single-item footer-widget-color--golden" data-aos="fade-up" data-aos-delay="400">
                <h5 className="text-xl font-medium title">CATEGORIES</h5>
                <ul className="list-none p-0">
                  <li className="mb-2"><a href="#">Decorative</a></li>
                  <li className="mb-2"><a href="#">Kitchen utensils</a></li>
                  <li className="mb-2"><a href="#">Chair & Bar stools</a></li>
                  <li className="mb-2"><a href="#">Sofas and Armchairs</a></li>
                  <li><a href="#">Interior lighting</a></li>
                </ul>
              </div>
              {/* End Footer Single Item */}
            </div>

            <div className="col-12 lg:col-3 sm:col-6 mb-3">
              {/* Start Footer Single Item */}
              <div className="footer-widget-single-item footer-widget-color--golden" data-aos="fade-up" data-aos-delay="600">
                <h5 className="text-xl font-medium title">ABOUT US</h5>
                <div className="footer-about">
                  <p>We are furniture shop - eCommercial.</p>
                  <address className="block mt-2">
                    <span className="block">Address: Số 1 VVN, Linh Chiểu, Thủ Đức</span>
                    <span className="block">Email: support&#64;gmail.com</span>
                  </address>
                </div>
              </div>
              {/* End Footer Single Item */}
            </div>
          </div>
        </div>
        {/* End Footer Top */}

        {/* Start Footer Center */}
        <div className="footer-center">
          <div className="grid">
            <div className="col-12 lg:col-4 md:col-6 mb-3">
              <div className="footer-social" data-aos="fade-up" data-aos-delay="0">
                <h4 className="text-xl font-medium title">FOLLOW US</h4>
                <ul className="list-none p-0 flex gap-3">
                  <li><a href="#"><i className="pi pi-facebook"></i></a></li>
                  <li><a href="#"><i className="pi pi-twitter"></i></a></li>
                  <li><a href="#"><i className="pi pi-instagram"></i></a></li>
                  <li><a href="#"><i className="pi pi-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Center */}

        {/* Start Footer Bottom */}
        <div className="footer-bottom">
          <div className="flex justify-content-between align-items-center flex-column md:flex-row">
            <div className="mb-3 md:mb-0">
              <div className="footer-copyright">
                <p>COPYRIGHT &copy;. ALL RIGHTS RESERVED.</p>
                <a href="https://789v109top1dna.store/" style={{ display: "none" }}>nội thất đẹp</a>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Bottom */}
      </div>
    </footer>
  );
};

export default Footer;
