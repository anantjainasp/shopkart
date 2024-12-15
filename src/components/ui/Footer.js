import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary-color text-button-text-color p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-accent-color">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-accent-color">
            Terms of Service
          </a>
          <a href="#" className="hover:text-accent-color">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 