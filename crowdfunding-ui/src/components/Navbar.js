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
            <div className="max-w-screen-xl mx-auto px-6 pt-4 pb-8">
                <div className="bg-[#09162A] shadow-lg rounded-lg p-4 h-20 flex items-center justify-center">
                    <Navbar
                        color="bg-[#0a192f]"
                        dark
                        expand="md"
                        className="flex flex-wrap items-center justify-between w-full"
                    >
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="text-white font-bold text-3xl mr-4 ml-4 no-underline"
                            >
                                Deffyfunds
                            </Link>
                        </div>
                        <Nav navbar className="justify-center">
                            <NavItem>
                                <NavLink
                                    tag={Link}
                                    to="/create"
                                    className="text-gray-200 hover:text-pink-600 mr-4"
                                >
                                    Create a Campaign
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={Link}
                                    to="/campaigns"
                                    className="text-gray-200 hover:text-pink-600 mr-4"
                                >
                                    Campaigns
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={Link}
                                    to="/about"
                                    className="text-gray-200 hover:text-pink-600 mr-4"
                                >
                                    About
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <div>
                            <WalletMultiButton />
                        </div>
                    </Navbar>
                </div>
            </div>
        </div>
    );
}

export default Example;
