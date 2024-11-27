import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="first-item">
            <div className="logo">
              <img
                src="/images/white-logo.png"
                alt="hexashop ecommerce templatemo"
                className="h-10"
              />
            </div>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-400">
                  16501 Collins Ave, Sunny Isles Beach, FL 33160, United States
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  hexashop@company.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  010-020-0340
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Links</h4>
            <ul>
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-12">
            <div className="under-footer text-center">
              <p>
                Copyright © 2022 HexaShop Co., Ltd. All Rights Reserved.
                <br />
                Design:{' '}
                <a
                  href="https://templatemo.com"
                  target="_parent"
                  title="free css templates"
                  className="text-blue-400"
                >
                  TemplateMo
                </a>
              </p>
              <ul className="flex justify-center space-x-4">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    <i className="fa fa-behance" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
