import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CompaignsView from './views/CampaignsView';
import WalletWrapper from './wrappers/wallet-wrapper';
import Container from 'react-bootstrap/Container';
import Header from './components/Header.jsx'
import Card from 'react-bootstrap/Card';
import ReactDOM from "react-dom";
import CampaignsView from './views/CampaignsView.tsx'

import Campaigns from './pages/Campaigns.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Create from './pages/Create.jsx'


interface AppProps {

}

// const network = 'http://127.0.0.1:8899';
const network = clusterApiUrl(WalletAdapterNetwork.Devnet);

const App = () => {
    return (
        <WalletWrapper network={network}>
            <Header />
            
            <Routes>
                <Route index element={<Home />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="About" element={<About />} />
                <Route path="create" element={<Create />} />
            </Routes>

        </WalletWrapper>
    );
}

export default App;

