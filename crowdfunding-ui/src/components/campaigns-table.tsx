import React, { useEffect, useState } from 'react';
import { calculateBarPercentage } from '../utils';
import { BN, Program, ProgramAccount, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Button, Card, Form } from 'react-bootstrap';
import Modal from './Modal';

interface CampaignsTableProps {
    program: Program;
    walletKey: PublicKey;
}

export const CampaignsTable: React.FC<CampaignsTableProps> = ({
    program,
    walletKey,
}) => {
    const [campaigns, setCampaigns] = useState<ProgramAccount[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] =
        useState<ProgramAccount | null>(null);

    const getAllCampaigns = async () => {
        const campaigns = await program.account.campaign.all();
        setCampaigns(campaigns);
    };

    useEffect(() => {
        getAllCampaigns();
    }, [program, walletKey]);

    const donate = async (campaignKey: PublicKey) => {
        try {
            await program.rpc.donate(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
                accounts: {
                    campaign: campaignKey,
                    user: walletKey,
                    systemProgram: web3.SystemProgram.programId,
                },
            });
            await getAllCampaigns();
        } catch (err) {
            console.error('Donate transaction error: ', err);
        }
    };

    const withdraw = async (campaignKey: PublicKey) => {
        try {
            await program.rpc.withdraw(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
                accounts: {
                    campaign: campaignKey,
                    user: walletKey,
                },
            });
        } catch (err) {
            console.error('Withdraw transaction error: ', err);
        }
    };

    const allCampaigns = () => {
        return campaigns.map((c, i) => {
            const key = c.publicKey.toBase58();

            const donatedAmount =
                c.account.amountDonated / web3.LAMPORTS_PER_SOL;
            const targetAmount =
                c.account.targetAmount.toNumber() / web3.LAMPORTS_PER_SOL;
            const progress = calculateBarPercentage(
                targetAmount,
                donatedAmount
            );

            return (
                <div
                    key={i}
                    className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
                    onClick={() => {
                        setSelectedCampaign(c);
                        setShowModal(true);
                    }}
                >
                    <img
                        src={c.account.imageUrl}
                        alt="fund"
                        className="w-full h-[158px] object-cover rounded-tl-2xl rounded-tr-2xl"
                    />

                    <div className="flex flex-col p-4">
                        <div className="flex flex-row items-center mb-[18px]">
                            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]"></p>
                        </div>

                        <div className="block">
                            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
                                {c.account.name}
                            </h3>
                            <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
                                {c.account.description}
                            </p>
                        </div>

                        {/* progress bar */}
                        <div className="mt-[15px] w-full h-[6px] bg-[#343447] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]"
                                style={{
                                    width: `${progress}%`,
                                    transition: 'width 0.5s ease-in-out',
                                }}
                            />
                        </div>

                        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                            <div className="flex flex-col">
                                <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                                    {(
                                        c.account.amountDonated /
                                        web3.LAMPORTS_PER_SOL
                                    ).toString()}{' '}
                                    SOL
                                </h4>
                                <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                                    Donated Amount
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                                    {c.account.targetAmount.toString()} SOL
                                </h4>
                                <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                                    Target Amount
                                </p>
                            </div>
                        </div>

                        <div className="mt-[10px] flex justify-between">
                            <Button
                                variant="primary"
                                onClick={() => donate(c.publicKey)}
                            >
                                Donate
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() => withdraw(c.publicKey)}
                            >
                                Withdraw
                            </Button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-wrap justify-start gap-6">
            {allCampaigns()}
            {selectedCampaign && (
                <Modal
                    campaign={selectedCampaign}
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default CampaignsTable;
