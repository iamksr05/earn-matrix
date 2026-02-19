// src/lib/escrowFlare.js
// Flare-specific escrow functions using FlareAdapter

import { ethers } from "ethers";
import config from "../config";
import { sponsorGaslessTx, hasSmartAccount } from "./flare";

const FLARE_ADAPTER_ADDRESS = config.flareAdapterAddress || config.contractAddress;
const API_URL = config.apiUrl;

// FlareAdapter ABI
const FLARE_ADAPTER_ABI = [
  "function fundNative(uint256 taskId, address worker_, string memory tokenType) payable",
  "function fundFAsset(address token, uint256 taskId, address worker_, uint256 amount)",
  "function releaseIf(bytes32 conditionHash)",
  "function release(uint256 taskId)",
  "function cancel(uint256 taskId)",
  "function registerCondition(uint256 taskId, bytes32 conditionHash)",
  "function recordFAssetBridge(uint256 taskId, bytes32 bridgeTx)",
  "event FundedWithToken(uint256 indexed taskId, address indexed poster, string tokenType, uint256 amount)",
  "event ReleasedByFDC(uint256 indexed taskId, bytes32 conditionHash)",
];

function requireWindowEth() {
  if (!window.ethereum) throw new Error("Wallet not found (window.ethereum).");
}

async function getProvider() {
  requireWindowEth();
  return new ethers.BrowserProvider(window.ethereum);
}

async function getSigner() {
  const p = await getProvider();
  return p.getSigner();
}

/**
 * Fund escrow with native FLR token using FlareAdapter
 * @param {object} task - Task object with id, worker_wallet, reward, token_symbol
 * @param {boolean} useGasless - Whether to use gasless transaction
 * @returns {Promise<object>} Transaction receipt
 */
export async function fundEscrowFlare(task, useGasless = false) {
  if (!task?.worker_wallet) throw new Error("Assign a worker first, then fund.");
  if (!task?.token_symbol) throw new Error("Token symbol required");

  const adapter = new ethers.Contract(FLARE_ADAPTER_ADDRESS, FLARE_ADAPTER_ABI, await getSigner());
  const value = ethers.parseEther(task.reward.toString());

  if (useGasless) {
    // Check if user has Smart Account
    const signer = await getSigner();
    const userAddress = await signer.getAddress();
    const hasSA = await hasSmartAccount(userAddress);

    if (hasSA) {
      // Prepare transaction data
      const data = adapter.interface.encodeFunctionData("fundNative", [
        task.id,
        task.worker_wallet,
        task.token_symbol,
      ]);

      // Sponsor gasless transaction
      const result = await sponsorGaslessTx(
        FLARE_ADAPTER_ADDRESS,
        data,
        value.toString(),
        userAddress
      );

      return { hash: result.txHash, gasless: true };
    }
  }

  // Normal transaction
  const tx = await adapter.fundNative(task.id, task.worker_wallet, task.token_symbol, { value });
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Fund escrow with FAsset (ERC20 token)
 * @param {object} task - Task object
 * @param {string} fassetAddress - FAsset token contract address
 * @returns {Promise<object>} Transaction receipt
 */
export async function fundEscrowFAsset(task, fassetAddress) {
  if (!task?.worker_wallet) throw new Error("Assign a worker first, then fund.");
  if (!fassetAddress) throw new Error("FAsset address required");

  const adapter = new ethers.Contract(FLARE_ADAPTER_ADDRESS, FLARE_ADAPTER_ABI, await getSigner());
  const amount = ethers.parseEther(task.reward.toString());

  // First, approve token transfer
  const erc20Abi = ["function approve(address spender, uint256 amount)"];
  const token = new ethers.Contract(fassetAddress, erc20Abi, await getSigner());
  const approveTx = await token.approve(FLARE_ADAPTER_ADDRESS, amount);
  await approveTx.wait();

  // Fund with FAsset
  const tx = await adapter.fundFAsset(fassetAddress, task.id, task.worker_wallet, amount);
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Release escrow (standard or gasless)
 * @param {number} taskId - Task ID
 * @param {boolean} useGasless - Whether to use gasless transaction
 * @returns {Promise<object>} Transaction receipt
 */
export async function releaseEscrowFlare(taskId, useGasless = false) {
  const adapter = new ethers.Contract(FLARE_ADAPTER_ADDRESS, FLARE_ADAPTER_ABI, await getSigner());

  if (useGasless) {
    const signer = await getSigner();
    const userAddress = await signer.getAddress();
    const hasSA = await hasSmartAccount(userAddress);

    if (hasSA) {
      const data = adapter.interface.encodeFunctionData("release", [taskId]);
      const result = await sponsorGaslessTx(
        FLARE_ADAPTER_ADDRESS,
        data,
        "0",
        userAddress
      );
      return { hash: result.txHash, gasless: true };
    }
  }

  const tx = await adapter.release(taskId);
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Register FDC condition for auto-release
 * @param {number} taskId - Task ID
 * @param {string} conditionHash - Condition hash
 * @returns {Promise<object>} Transaction receipt
 */
export async function registerFDCConditionOnChain(taskId, conditionHash) {
  const adapter = new ethers.Contract(FLARE_ADAPTER_ADDRESS, FLARE_ADAPTER_ABI, await getSigner());
  const tx = await adapter.registerCondition(taskId, conditionHash);
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Record FAsset bridge transaction
 * @param {number} taskId - Task ID
 * @param {string} bridgeTx - Bridge transaction hash
 * @returns {Promise<object>} Transaction receipt
 */
export async function recordFAssetBridge(taskId, bridgeTx) {
  const adapter = new ethers.Contract(FLARE_ADAPTER_ADDRESS, FLARE_ADAPTER_ABI, await getSigner());
  const tx = await adapter.recordFAssetBridge(taskId, bridgeTx);
  const receipt = await tx.wait();
  return receipt;
}

