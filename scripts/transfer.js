const controller = require('../database/controller');
const { ethers } = require('hardhat');
const contract=process.env.CONTRACT;
const wallet=process.env.WALLET;

async function main() {
    const level=1;
    const userWallet=process.env.USERWALLET;
    const userEmail=process.env.EMAIL;
    await controller.addUser(userWallet,userEmail,level);
    const id=await controller.findUser(userWallet);
    const nft = await hre.ethers.getContractAt("Alfa2", contract);
    const signer0 = ethers.provider.getSigner(0);
    await signer0.getTransactionCount();
    await nft['safeTransferFrom(address,address,uint256)'](wallet, userWallet, id.id);
    console.log("Transaction completed");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });