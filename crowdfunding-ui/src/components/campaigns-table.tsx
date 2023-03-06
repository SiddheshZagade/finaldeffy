import React, { useEffect, useState } from 'react';
import { BN, Program, ProgramAccount, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Button, Card, Form } from 'react-bootstrap';

interface CampaignsTableProps {
  program: Program;
  walletKey: PublicKey;
}

export const CampaignsTable: React.FC<CampaignsTableProps> = ({
  program,
  walletKey,
}) => {
  const [campaigns, setCampaigns] = useState<ProgramAccount[]>([]);

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

      return (
        //gotta make this clickable and use campaingdetails to show more info and donate button
        <div className="sm:w-[288px]  w-full rounded-[15px] bg-[#1c1c24] cursor-pointer">
           

          <img src={'c.account.image_url' } alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>
          
          <div className="flex flex-col p-4">
            <div className="flex flex-row items-center mb-[18px]">
              <img src={'c.account.image_urlg'} alt="tag" className="w-[17px] h-[17px] object-contain"/>
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
            </div>

            <div className="block">
              <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{c.account.name}</h3>
              <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{c.account.description}</p>
            </div>

            <div className="flex justify-between flex-wrap mt-[15px] gap-2">
              <div className="flex flex-col">
                <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{(c.account.targetAmount / web3.LAMPORTS_PER_SOL).toString()} SOL</h4>
                <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                Target Amount
              </p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{(c.account.targetAmount ).toString()} SOL</h4>
                <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                  Target Amount
                </p>
              </div>
            </div>

            <div className="mt-[25px] flex justify-between">
              <Button variant="primary" onClick={() => donate(c.publicKey)}>
                Donate
              </Button>
              <Button variant="outline-primary" onClick={() => withdraw(c.publicKey)}>
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
    </div>
  );
};

export default CampaignsTable;