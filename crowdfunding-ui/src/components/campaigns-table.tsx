import React, { useEffect, useState, ChangeEvent } from 'react';
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
    const [donationAmount, setDonationAmount] = useState(0);
    const [withAmount, setwithAmount] = useState(0);
    const [selectedCampaign, setSelectedCampaign] =
        useState<ProgramAccount | null>(null);

    const getAllCampaigns = async () => {
        const campaigns = await program.account.campaign.all();
        setCampaigns(campaigns);
    };

    useEffect(() => {
        getAllCampaigns();
    }, [program, walletKey]);

    const donate = async (campaignKey: PublicKey, amount: number) => {
        try {
            const lamports = Math.floor(amount * web3.LAMPORTS_PER_SOL);
            await program.rpc.donate(new BN(lamports), {
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
    const handleDonationAmountChange = (e: ChangeEvent<any>) => {
        setDonationAmount(Number(e.target.value));
    };
    const handlewithAmountChange = (e: ChangeEvent<any>) => {
        setwithAmount(Number(e.target.value));
    };
    const withdraw = async (campaignKey: PublicKey, amount: number) => {
        try {
            const lamports = Math.floor(amount * web3.LAMPORTS_PER_SOL);
            await program.rpc.withdraw(new BN(lamports), {
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
            const targetAmount = parseFloat(c.account.targetAmount.toString());
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

                    <div className="flex flex-col p-2">
                        <div className="block">
                            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate mt-[10px]">
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
                        <p className="mt-2 text-center font-medium text-gray-500">
                            {progress}%
                        </p>

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

                        <div className="mt-6 mb-2 flex items-center justify-center">
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="py-2 px-3 border border-gray-400 rounded-md w-32 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={donationAmount}
                                    onChange={handleDonationAmountChange}
                                    onClick={(e) => e.stopPropagation()}
                                    placeholder="Enter Amount"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500">SOL</span>
                                </div>
                            </div>

                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-4 rounded-md transition-colors duration-300"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    donate(c.publicKey, donationAmount);
                                }}
                            >
                                Donate
                            </button>
                            {c.account.owner.toBase58() ===
                                walletKey.toBase58() && (
                            <div className="mt-6 mb-2 flex items-center justify-center">
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="py-2 px-3 border border-gray-400 rounded-md w-32 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={withAmount}
                                    onChange={handlewithAmountChange}
                                    onClick={(e) => e.stopPropagation()}
                                    placeholder="Enter Amount"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500">SOL</span>
                                </div>
                            </div>

                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-4 rounded-md transition-colors duration-300"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    withdraw(c.publicKey, withAmount);
                                }}
                            >
                                Withdraw
                            </button>
                            </div>
                                )}
                            
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