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
        <Card
          key={key}
          className="m-3"
          style={{
            width: '20rem',
            backgroundImage: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
            borderRadius: '1rem',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
          }}
        >
          <Card.Img
            variant="top"
            src={c.account.imageUrl}
            style={{ height: '12rem', objectFit: 'cover', borderRadius: '1rem 1rem 0 0' }}
          />

          <Card.Body
            style={{
              backgroundImage: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
              borderRadius: '0 0 1rem 1rem',
            }}
          >
            <Card.Title style={{ color: 'white', fontSize: '1.2rem' }}>
              {c.account.name}
            </Card.Title>
            <Card.Text style={{ color: 'white', fontSize: '0.8rem' }}>
              {c.account.description}
            </Card.Text>

            <div className="text-lg text-gray-400">
              <p>
                Target Amount:{' '}
                {c.account.targetAmount.toString()}{' '}
                <span className="text-white">
                  ({(c.account.targetAmount / web3.LAMPORTS_PER_SOL).toString()} SOL)
                </span>
              </p>
              <p>
                Donated:{' '}
                {(c.account.amountDonated / web3.LAMPORTS_PER_SOL).toString()}{' '}
                <span className="text-white">
      ({(c.account.amountDonated / web3.LAMPORTS_PER_SOL).toString()} SOL)
    </span>
  </p>
</div>
            <div className="mt-4 d-grid gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => donate(c.publicKey)}
              >
                Donate
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => withdraw(c.publicKey)}
                disabled={c.account.owner.toBase58() !== walletKey.toBase58()}
                            >
                                Withdraw
                            </Button>
                        </div>
                    </Card.Body>

                </Card>
            );
        });
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-800 to-purple-600">
          <div className="container mx-auto py-8">
            <div className="d-flex flex-wrap justify-content-center">
              {allCampaigns()}
            </div>
          </div>
        </div>
      );
};

export default CampaignsTable;
