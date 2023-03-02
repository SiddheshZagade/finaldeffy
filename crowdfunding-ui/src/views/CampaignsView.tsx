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
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

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

    const onNameChange = (e: ChangeEvent<any>) => {
        setName(e.target.value);
    };
    const onDescriptionChange = (e: ChangeEvent<any>) => {
        setDescription(e.target.value);
    };
    const onTargetAmountChange = (e: ChangeEvent<any>) => {
        setTargetAmount(e.target.value);
    };
    const onImageUrlChange = (e: ChangeEvent<any>) => {
        setImageUrl(e.target.value);
    };
    
    const createCampaign = async () => {
        const [campaign] = await PublicKey.findProgramAddress(
            [
                utils.bytes.utf8.encode('campaign_demo'),
                wallet.publicKey!.toBuffer(),
            ],
            program.programId,
        );
        await program.methods
            .create(name, description, new BN(targetAmount),imageUrl)
            .accounts({
                campaign: campaign,
                user: wallet.publicKey!,
                systemProgram: web3.SystemProgram.programId,
            })
            .rpc();
    };

    return (

        <Card className='CampaignsView p-5'>
            
   
            {!wallet.connected}
            
            {wallet.connected && <CampaignsTable  walletKey={wallet.publicKey!} program={program}/>}

        </Card>

    );
};

export default CampaignsView;
