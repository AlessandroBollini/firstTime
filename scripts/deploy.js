async function main() {
  const Alfa2 = await hre.ethers.getContractFactory("Alfa2");
  const nft = await Alfa2.deploy();
  await nft.deployed();
  console.log("Alfa2 deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
