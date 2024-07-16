import React from 'react';
import '../../Css/Footer.css'; // Make sure to create and import a CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section colorlib">
                    <h3>Colorlib</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit officiis corporis optio natus.</p>
                </div>
                <div className="footer-section shop">
                    <h3>Shop</h3>
                    <ul>
                        <li><a href="#sell-online">Sell online</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#examples">Examples</a></li>
                        <li><a href="#website-editors">Website editors</a></li>
                        <li><a href="#online-retail">Online retail</a></li>
                    </ul>
                </div>
                <div className="footer-section press">
                    <h3>Press</h3>
                    <ul>
                        <li><a href="#events">Events</a></li>
                        <li><a href="#news">News</a></li>
                        <li><a href="#awards">Awards</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#online-retail">Online retail</a></li>
                    </ul>
                </div>
                <div className="footer-section about">
                    <h3>About</h3>
                    <ul>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#team">Team</a></li>
                        <li><a href="#career">Career</a></li>
                        <li><a href="#contacts">Contacts</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-legal">
                    <a href="#privacy-policy">Privacy Policy</a>
                    <a href="#terms-conditions">Terms & Conditions</a>
                    <a href="#code-of-conduct">Code of Conduct</a>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, fuga. Ex at maxime eum odio quibusdam pariatur expedita explicabo harum! Consectetur ducimus delectus nemo, totam odit!</p>
                <div className="footer-social">
                    <a href="#twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#pinterest"><i className="fab fa-pinterest"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
