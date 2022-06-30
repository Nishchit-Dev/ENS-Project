const main = async () => {
  //! here the Domains is the smartContract's contract/class name remember that
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");

  // here in deploy we add constructor arguments
  const domainContract = await domainContractFactory.deploy("eth");
  await domainContract.deployed();
  console.log("Contract Deployed: ", domainContract.address);
  console.log("Contract Owner: ", owner.address);

  const tnx = await domainContract.registerDomain("0xGoku", {
    value: hre.ethers.utils.parseEther("10"),
  });
  await tnx.wait();

  const domainOwner = await domainContract.getAddress("0xGoku");
  console.log("Owner of domain 0xGoku ", domainOwner);

  const balance = await hre.ethers.provider.getBalance(
    domainContract.address
  );
  console.log("contract Balance: ", hre.ethers.utils.formatEther(balance));

//   tnx = await domainContract
//     .connect(randomPerson)
//     .setRecord("doom", "yeah boi now its my Domain");
//   await tnx.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
