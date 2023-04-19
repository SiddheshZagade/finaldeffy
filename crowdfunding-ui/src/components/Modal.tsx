import React from 'react';
import {useState}  from 'react';
import { BN, Program, ProgramAccount, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { calculateBarPercentage } from '../utils';

interface ModalProps {
    campaign: ProgramAccount;
    program: Program;
    walletKey: PublicKey;
    show: boolean;
    handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
    campaign,
    program,
    walletKey,
    show,
    handleClose,
}) => {
    const donatedAmount =
        campaign.account.amountDonated / web3.LAMPORTS_PER_SOL;
    const targetAmount =
        campaign.account.targetAmount.toNumber() / web3.LAMPORTS_PER_SOL;
    const progress = calculateBarPercentage(targetAmount, donatedAmount);
    const [showImage, setShowImage] = useState(false);
    const [showAdditionalImage, setShowAdditionalImage] = useState(false);
    const handleToggleImage = () => {
        setShowAdditionalImage((prevState) => !prevState);
    };
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
                {showAdditionalImage && (
                    <div className="mt-[30px]">
                        <img
                            src="https://www.pittsburghzoo.org/wp-content/uploads/lion8.jpg"
                            alt="additional image"
                            className="w-full h-[300px] object-cover rounded-tl-2xl rounded-tr-2xl mb-[20px]"
                        />
                    </div>
                )}
                <Button
                    variant="outline-secondary"
                    onClick={handleToggleImage}
                    className="mt-[20px]"
                >
                    {showAdditionalImage ? 'Hide' : 'Show'} Proof Image
                </Button>
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