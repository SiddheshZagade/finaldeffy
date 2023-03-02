import React from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import CampaignsCreate from '../views/CampaignsCreate';
import WalletWrapper from '../wrappers/wallet-wrapper';

const network = clusterApiUrl(WalletAdapterNetwork.Devnet);

const Create = () => {
  return (
    <div >
      <CampaignsCreate network={network}/>
    </div>
  );
};

export default Create;