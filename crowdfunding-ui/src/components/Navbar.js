import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="bg-transparent fixed top-0 w-full z-10 -mt-4">
            <div className=" mx-auto px-6 pt-4 pb-8">
                <div className="bg-[#09162A] shadow-lg rounded-lg p-4 h-20 flex items-center justify-center">
                    <Navbar
                        color="bg-[#0a192f]"
                        dark
                        expand="md"
                        fixed="top"
                        className="flex flex-wrap items-center justify-between p-4 w-full mx-auto"
                    >
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="text-white font-bold text-3xl mr-2 ml-2 no-underline"
                            >
                                Deffyfunds
                            </Link>
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={toggle}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`${
                                isOpen
                                    ? 'block bg-gray-900 bg-opacity-90 rounded-lg transition-opacity duration-300 ease-linear py-4 transform translate-y-1'
                                    : 'hidden bg-opacity-0'
                            } w-full flex-grow md:flex md:items-center md:w-auto`}
                        >
                            <Nav
                                navbar
                                className={`text-md md:flex-grow md:justify-center ${
                                    isOpen ? 'px-4' : ''
                                }`}
                            >
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to="/create"
                                        className={`text-gray-200 hover:text-pink-600 block md:inline-block mr-4 ${
                                            isOpen ? 'py-2' : ''
                                        }`}
                                    >
                                        Create a Campaign
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to="/campaigns"
                                        className={`text-gray-200 hover:text-pink-600 block md:inline-block mr-4 ${
                                            isOpen ? 'py-2' : ''
                                        }`}
                                    >
                                        Campaigns
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to="/about"
                                        className={`text-gray-200 hover:text-pink-600 block md:inline-block mr-4 ${
                                            isOpen ? 'py-2' : ''
                                        }`}
                                    >
                                        About
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <div
                                className={`text-gray-200 hover:text-pink-600 block md:inline-block mr-4 ${
                                    isOpen ? 'px-3 py-2' : ''
                                }`}
                            >
                                <WalletMultiButton />
                            </div>
                        </div>
                    </Navbar>
                </div>
            </div>
        </div>
    );
}

export default Example;
