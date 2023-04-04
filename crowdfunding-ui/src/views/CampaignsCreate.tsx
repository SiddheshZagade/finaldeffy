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
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
    const [successMessage, setSuccessMessage] = useState('');

    const connection = new Connection(network, opts.preflightCommitment);

    const getProgram = () => {
        const provider = new AnchorProvider(connection, wallet as any, opts);
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
        try {
            const [campaign] = await PublicKey.findProgramAddress(
                [
                    utils.bytes.utf8.encode('campaign_demo'),
                    wallet.publicKey!.toBuffer(),
                ],
                program.programId
            );
            console.log('campaign:', campaign.toBase58());

            await program.methods
                .create(name, description, new BN(targetAmount), imageUrl)
                .accounts({
                    campaign: campaign,
                    user: wallet.publicKey!,
                    systemProgram: web3.SystemProgram.programId,
                })
                .rpc();
            console.log('imageUrl:', imageUrl);
            setSuccessMessage(`Campaign created successfully!`);
        } catch (error) {
            console.error(error);
            setSuccessMessage('Error creating campaign. Please try again.');
        }
    };

    return (
        <div className="bg-[#0a192f] min-h-screen flex flex-col justify-center items-center">
            <div className="container mx-auto mt-16">
                {!wallet.connected}
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card shadow-lg w-full mx-auto">
                            <div className="card-body">
                                <h1 className="text-center text-xl font-bold mb-8">
                                    Create a New Campaign 📢
                                </h1>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            controlId="name"
                                            label="Name"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Name of the campaign"
                                                value={name}
                                                onChange={onNameChange}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            controlId="description"
                                            label="Description"
                                        >
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Description of the campaign"
                                                style={{ height: '150px' }}
                                                value={description}
                                                onChange={onDescriptionChange}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            controlId="targetAmount"
                                            label="Target Amount"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                as="input"
                                                type="number"
                                                placeholder="Target amount that need to be reached"
                                                value={targetAmount}
                                                onChange={onTargetAmountChange}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            controlId="imageUrl"
                                            label="Image URL"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Image URL for the campaign"
                                                value={imageUrl}
                                                onChange={onImageUrlChange}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3 flex justify-center">
                                        <Button
                                            variant="primary"
                                            onClick={createCampaign}
                                        >
                                            Create Campaign
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className="text-green-600 font-bold">{successMessage}</div>
            )}
        </div>
    );
};

export default CampaignsView;
