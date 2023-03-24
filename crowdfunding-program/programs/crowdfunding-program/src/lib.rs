use anchor_lang::prelude::*;

declare_id!("aPBRnq9LNYc88JuXddsfveodAdvdgDmcMcL4hA6KY78");

#[program]
pub mod crowdfunding_program {
    use super::*;

    pub fn create(ctx: Context<Create>, name: String, description: String, target_amount: u64, image_url: String) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.target_amount = target_amount;
        campaign.image_url = image_url;
        campaign.owner = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let user = &mut ctx.accounts.user;
        if campaign.owner != *user.key {
            return Err(ErrorCode::InvalidOwner.into());
        }
        let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());
        if **campaign.to_account_info().lamports.borrow() - rent_balance < amount {
            return Err(ErrorCode::InvalidWithdrawAmount.into());
        }
        **campaign.to_account_info().try_borrow_mut_lamports()? -= amount;
        **user.to_account_info().try_borrow_mut_lamports()? += amount;
        Ok(())
    } 

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.campaign.key(),
            amount
        );
        anchor_lang::solana_program::program::invoke(
            &instruction,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.campaign.to_account_info(),
            ]
        );
        let campaign = &mut ctx.accounts.campaign;
        campaign.amount_donated += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=9100, seeds=[b"campaign_demo".as_ref(), user.key().as_ref()], bump)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Campaign {
    pub owner: Pubkey,
    pub name: String,
    pub description: String,
    pub amount_donated: u64,
    pub target_amount: u64,
    pub image_url: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The user is not the owner of the campaign.")]
    InvalidOwner,
    #[msg("Insufficient amount to withdraw.")]
    InvalidWithdrawAmount,
}