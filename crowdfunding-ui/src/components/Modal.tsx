import React from 'react';
import { ProgramAccount } from '@project-serum/anchor';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { calculateBarPercentage } from '../utils';
import { web3 } from '@project-serum/anchor';
const BN = require('bn.js');

interface ModalProps {
    campaign: ProgramAccount;
    show: boolean;
    handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ campaign, show, handleClose }) => {
    const donatedAmount =
        campaign.account.amountDonated / web3.LAMPORTS_PER_SOL;
    const targetAmount =
        campaign.account.targetAmount.toNumber() / web3.LAMPORTS_PER_SOL;
    const progress = calculateBarPercentage(targetAmount, donatedAmount);

    return (
        <BootstrapModal show={show} onHide={handleClose}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>
                    {campaign.account.name}
                </BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                <img
                    src={campaign.account.imageUrl}
                    alt="fund"
                    className="w-full h-[300px] object-cover rounded-tl-2xl rounded-tr-2xl mb-[20px]"
                />
                <p>{campaign.account.description}</p>
                <div className="mt-[30px] w-full h-[6px] bg-[#343447] rounded-full overflow-hidden">
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
                            {donatedAmount.toString()} SOL
                        </h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                            Donated Amount
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                            {campaign.account.targetAmount.toString()} SOL
                        </h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                            Target Amount
                        </p>
                    </div>
                </div>
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="outline-primary" onClick={handleClose}>
                    Close
                </Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;
