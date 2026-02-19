// test/FlareAdapter.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlareAdapter", function () {
  let taskEscrow, flareAdapter, owner, worker, fdcOracle;

  beforeEach(async function () {
    [owner, worker, fdcOracle] = await ethers.getSigners();

    // Deploy TaskEscrow
    const TaskEscrow = await ethers.getContractFactory("TaskEscrow");
    taskEscrow = await TaskEscrow.deploy();
    await taskEscrow.waitForDeployment();

    // Deploy FlareAdapter
    const FlareAdapter = await ethers.getContractFactory("FlareAdapter");
    flareAdapter = await FlareAdapter.deploy(
      await taskEscrow.getAddress(),
      fdcOracle.address
    );
    await flareAdapter.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set correct escrow address", async function () {
      expect(await flareAdapter.escrow()).to.equal(await taskEscrow.getAddress());
    });

    it("Should set correct FDC oracle", async function () {
      expect(await flareAdapter.fdcOracle()).to.equal(fdcOracle.address);
    });
  });

  describe("Native Token Funding", function () {
    const taskId = 1;
    const amount = ethers.parseEther("1.0");

    it("Should fund escrow with native token", async function () {
      await expect(
        flareAdapter.fundNative(taskId, worker.address, "FLR", { value: amount })
      )
        .to.emit(flareAdapter, "FundedWithToken")
        .withArgs(taskId, owner.address, "FLR", amount);

      // Verify escrow state
      const escrow = await taskEscrow.escrows(taskId);
      expect(escrow.poster).to.equal(owner.address);
      expect(escrow.worker).to.equal(worker.address);
      expect(escrow.amount).to.equal(amount);
      expect(escrow.funded).to.be.true;

      // Verify token type recorded
      expect(await flareAdapter.tokenTypes(taskId)).to.equal("FLR");
    });

    it("Should reject zero value", async function () {
      await expect(
        flareAdapter.fundNative(taskId, worker.address, "FLR", { value: 0 })
      ).to.be.revertedWith("FlareAdapter: no value");
    });
  });

  describe("FDC Conditional Release", function () {
    const taskId = 1;
    const amount = ethers.parseEther("1.0");
    let conditionHash;

    beforeEach(async function () {
      // Fund escrow first
      await flareAdapter.fundNative(taskId, worker.address, "FLR", { value: amount });
      
      // Generate condition hash
      const conditionData = ethers.toUtf8Bytes(JSON.stringify({ taskId, timestamp: Date.now() }));
      conditionHash = ethers.keccak256(conditionData);
    });

    it("Should register condition hash", async function () {
      await expect(
        flareAdapter.registerCondition(taskId, conditionHash)
      )
        .to.emit(flareAdapter, "ConditionRegistered")
        .withArgs(taskId, conditionHash);

      expect(await flareAdapter.conditionToTask(conditionHash)).to.equal(taskId);
    });

    it("Should allow FDC oracle to release", async function () {
      await flareAdapter.registerCondition(taskId, conditionHash);

      await expect(
        flareAdapter.connect(fdcOracle).releaseIf(conditionHash)
      )
        .to.emit(flareAdapter, "ReleasedByFDC")
        .withArgs(taskId, conditionHash);

      // Verify escrow released
      const escrow = await taskEscrow.escrows(taskId);
      expect(escrow.released).to.be.true;
    });

    it("Should reject release from non-oracle", async function () {
      await flareAdapter.registerCondition(taskId, conditionHash);

      await expect(
        flareAdapter.connect(worker).releaseIf(conditionHash)
      ).to.be.revertedWith("FlareAdapter: only FDC oracle");
    });
  });

  describe("FAsset Bridge Recording", function () {
    const taskId = 1;
    const bridgeTx = ethers.id("bridge-tx-hash");

    it("Should record FAsset bridge transaction", async function () {
      await expect(
        flareAdapter.recordFAssetBridge(taskId, bridgeTx)
      )
        .to.emit(flareAdapter, "FAssetBridgeRecorded")
        .withArgs(taskId, bridgeTx);

      expect(await flareAdapter.fassetBridgeTxs(taskId)).to.equal(bridgeTx);
    });
  });

  describe("Standard Release and Cancel", function () {
    const taskId = 1;
    const amount = ethers.parseEther("1.0");

    beforeEach(async function () {
      await flareAdapter.fundNative(taskId, worker.address, "FLR", { value: amount });
    });

    it("Should allow poster to release", async function () {
      await expect(flareAdapter.release(taskId))
        .to.emit(taskEscrow, "Released");

      const escrow = await taskEscrow.escrows(taskId);
      expect(escrow.released).to.be.true;
    });

    it("Should allow poster to cancel", async function () {
      await expect(flareAdapter.cancel(taskId))
        .to.emit(taskEscrow, "Cancelled");

      const escrow = await taskEscrow.escrows(taskId);
      expect(escrow.cancelled).to.be.true;
    });
  });
});

