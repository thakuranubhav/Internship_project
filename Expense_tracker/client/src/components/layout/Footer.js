import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 small">
              © {new Date().getFullYear()} Expense Manager. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
