# Deffy

Deffy is a crowdfunding app based on Solana. With Deffy, you can create campaigns to raise funds for your projects, and contribute to campaigns created by others. The app is built using React and Tailwind CSS, and it leverages Solana's blockchain technology to provide a secure and transparent way to handle payments.

## Getting Started

To get started with Deffy, follow these steps:

1. Clone this repository: `git clone https://github.com/your-username/deffy.git`
2. Install the dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your web browser to view the app.

Note: You'll need to have Node.js and npm installed on your machine to run this app.

## Usage

To create a campaign:

1. Click on the "Create a Campaign" button on the navbar.
2. Fill out the form with the details of your campaign, including the target amount, the deadline, and a description of your project.
3. Click on the "Create Campaign" button to submit your campaign.

To contribute to a campaign:

1. Click on the "Campaigns" button on the navbar.
2. Choose a campaign you'd like to contribute to.
3. Enter the amount you'd like to contribute and click on the "Contribute" button.

To view your campaigns:

1. Click on the "Campaigns" button on the navbar.
2. Click on the "My Campaigns" tab to view the campaigns you've created.

- To create new program address: solana-keygen new -o id.json
- To add some funds: solana airdrop 2 [address] --url devnet
- To get your program address after build: solana address -k ./target/deploy/crowdfunding_program-keypair.json

<a href="https://ibb.co/SfB2qMb"><img src="https://i.ibb.co/Y0h6v1m/Screenshot-1.png" alt="Screenshot-1" border="0"></a>
<a href="https://ibb.co/LtqzvCN"><img src="https://i.ibb.co/3N8yk0R/Screenshot-2.png" alt="Screenshot-2" border="0"></a>

## Authors
- [@SiddheshZagade](https://github.com/SiddheshZagade)
- [@patilkkrish](https://www.github.com/patilkkrish)

## License

Deffy is licensed under the [MIT License](LICENSE).
