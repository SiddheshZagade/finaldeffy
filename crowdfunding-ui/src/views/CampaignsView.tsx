import React, { ChangeEvent, useState } from 'react';
import {
    AnchorProvider,
    BN,
    Idl,
    Program,
    utils,
    web3,
} from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { Commitment, Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl.json';

import { Button, FloatingLabel, Form } from 'react-bootstrap';
import CampaignsTable from '../components/campaigns-table';
import { Card } from 'reactstrap';

const opts: { preflightCommitment: Commitment } = {
    preflightCommitment: 'processed',
};

const programId = new PublicKey(idl.metadata.address);

interface CampaignsViewProps {
    network: string;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ network }) => {
    const wallet = useWallet();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState<number>(1);
    const [imageUrl, setImageUrl] = useState('');

    const getProgram = () => {
        /* create the provider and return it to the caller */
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new AnchorProvider(connection, wallet as any, opts);
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl as Idl, programId, provider);
        return program;
    };

    const program = getProgram();

    console.log('imageUrl:', imageUrl); // Add this line

    return (
        <div className="App bg-[#0a192f] h-screen">
            <div className="mx-auto h-full pt-24">
                <Card className="CampaignsView p-5r border-0 bg-white rounded-lg overflow-hidden">
                    {!wallet.connected ? (
                        <p>Please connect your wallet</p>
                    ) : (
                        <CampaignsTable
                            key={wallet.publicKey?.toBase58()} // Add key prop
                            walletKey={wallet.publicKey!}
                            program={program}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CampaignsView;
