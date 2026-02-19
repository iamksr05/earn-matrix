// src/components/TaskCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import {
  acceptTask,
  submitWork,
  approveTask,
  requestChanges,
} from "../lib/taskService";
import { fundEscrow, releaseEscrow } from "../lib/escrow";
import BackgroundGradient from "./ui/BackgroundGradient";

const explorerBase =
  import.meta.env.VITE_EXPLORER_TX_BASE ||
  (Number(import.meta.env.VITE_CHAIN_ID) === 747
    ? "https://evm.flowscan.io/tx/"
    : "https://sepolia.etherscan.io/tx/");
const fallback = "/defaultimg.png";

import { verifyFAssetBridge, submitFDCProof } from "../lib/flare";

export default function TaskCard({ task, onChange }) {
  const navigate = useNavigate();
  const { authenticated, login, user } = usePrivy();
  const [verifying, setVerifying] = useState(false);

  const userWallet = user?.wallet?.address?.toLowerCase();
  const posterWallet = (task?.poster_wallet || task?.wallet || "").toLowerCase();
  const workerWallet = (task?.worker_wallet || "").toLowerCase();

  const isPoster = authenticated && userWallet && posterWallet === userWallet;
  const isWorker = authenticated && userWallet && workerWallet === userWallet;

  const doAccept = async () => {
    if (!authenticated) return login();
    if (!userWallet) return alert("Please connect a wallet first.");
    if (isPoster) return alert("You cannot accept your own task.");

    try {
      await acceptTask(task.id, userWallet);
      onChange?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const doSubmit = async () => {
    if (!isWorker) return alert("Only the assigned worker can submit.");
    const url = prompt("Submission URL (repo/demo):");
    const notes = prompt("Notes (optional):") || "";
    if (!url) return;

    try {
      await submitWork(task.id, userWallet, { url, notes });
      onChange?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const doApprove = async () => {
    if (!isPoster) return alert("Only the poster can approve.");
    if (!confirm("Approve work and release funds to the worker? This cannot be undone.")) return;
    try {
      const tx = await releaseEscrow(task.id);
      console.log("released:", tx.hash);
      await approveTask(task.id);
      onChange?.();
    } catch (err) {
      alert("Approve/Release failed: " + err.message);
    }
  };

  const doRequestChanges = async () => {
    if (!isPoster) return alert("Only the poster can request changes.");
    const reason = prompt("What needs to change?");
    if (!reason) return;
    await requestChanges(task.id, reason);
    onChange?.();
  };

  const doFund = async () => {
    if (!isPoster) return alert("Only the poster can fund.");
    try {
      const tx = await fundEscrow(task);
      console.log("funded:", tx.hash);
      alert("Task funded successfully on-chain!");
      onChange?.();
    } catch (err) {
      alert("Funding failed: " + err.message);
    }
  };

  const doVerifyBridge = async () => {
    const bridgeTx = prompt("Enter Bridge Transaction Hash:");
    if (!bridgeTx) return;
    setVerifying(true);
    try {
      const result = await verifyFAssetBridge(task.id, bridgeTx, task.token_symbol);
      alert(`Bridge Verified! Token: ${result.tokenAddress}`);
      onChange?.();
    } catch (err) {
      alert("Verification failed: " + err.message);
    } finally {
      setVerifying(false);
    }
  };

  const doSubmitProof = async () => {
    const condition = prompt("Enter Condition Hash:");
    if (!condition) return;
    setVerifying(true);
    try {
      // Mock proof data for demo
      const result = await submitFDCProof(task.id, condition, { mock: true }, "0x00");
      alert(`Proof Submitted! TX: ${result.txHash}`);
      onChange?.();
    } catch (err) {
      alert("Proof submission failed: " + err.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on a button
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    // Check if task.id exists
    if (!task?.id) {
      console.error('Task ID is missing:', task);
      return;
    }
    console.log('Navigating to task:', task.id);
    navigate(`/task/${task.id}`);
  };

  const isFAsset = ["BTC", "XRP", "DOGE"].includes(task?.token_symbol?.toUpperCase());

  return (
    <BackgroundGradient className="cursor-pointer hover:scale-[1.01] transition-all duration-300" onClick={handleCardClick}>
      <div className="p-5 sm:p-6 lg:p-7 h-full flex flex-col">
        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {task?.title || "Untitled Task"}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
              {task?.category || "General"} · Reward:{" "}
              <span className="text-primary font-bold">{task?.reward ?? "—"} {task?.token_symbol || "ETH"}</span>
            </p>
          </div>
          <span
            className={
              (task?.status === "funded"
                ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_-2px_hsl(var(--primary)/0.5)]"
                : "bg-muted text-muted-foreground border-border") +
              " rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-md"
            }
          >
            {task?.status || "pending"}
          </span>
        </div>

        {/* image */}
        <div className="mt-4 overflow-hidden rounded-xl border border-border/50 bg-muted/20 relative group/img">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity z-10" />
          <img
            src={task?.image_url || fallback}
            alt={task?.title || "task"}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            loading="lazy"
          />
        </div>

        {/* description */}
        <p className="mt-4 text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed">
          {task?.description || "No description provided."}
        </p>

        {/* meta */}
        <div className="mt-auto pt-5 grid grid-cols-2 gap-3 text-[13px]">
          <div className="rounded-lg bg-muted/30 p-3 border border-border/50">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Deadline</div>
            <div className="text-foreground font-medium mt-0.5">{task?.deadline ? new Date(task.deadline).toLocaleString() : "—"}</div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3 border border-border/50">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Poster</div>
            <div className="text-foreground font-medium mt-0.5 truncate">{task?.wallet || task?.poster_wallet || "—"}</div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {/* OPEN: Anyone (except poster) can accept */}
          {task?.status === "open" && !isPoster && (
            <button
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_20px_-3px_hsl(var(--primary)/0.6)] hover:bg-primary-dark transition-all"
              onClick={doAccept}
            >
              Accept Task
            </button>
          )}

          {/* ACCEPTED: Only worker can submit */}
          {(task?.status === "accepted" || task?.status === "changes_requested") && isWorker && (
            <button
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 border border-border transition-colors"
              onClick={doSubmit}
            >
              Submit Work
            </button>
          )}

          {/* SUBMITTED: Only poster can review */}
          {task?.status === "submitted" && isPoster && (
            <>
              <button
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                onClick={doApprove}
              >
                Approve
              </button>
              <button
                className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 border border-border transition-colors"
                onClick={doRequestChanges}
              >
                Request Changes
              </button>
            </>
          )}

          {/* EARLY FUNDING: Poster can fund before it's completed */}
          {isPoster && ["open", "accepted", "submitted"].includes(task?.status) && (
            <button
              className="rounded-lg bg-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20 hover:bg-fuchsia-600 transition-all"
              onClick={doFund}
            >
              Fund Escrow
            </button>
          )}

          {/* FAsset / FDC Actions */}
          {verifying && <span className="text-xs text-primary animate-pulse">Verifying...</span>}

          {isFAsset && task?.status === "funded" && isPoster && (
            <button
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
              onClick={doVerifyBridge}
              disabled={verifying}
            >
              Verify Bridge
            </button>
          )}

          {/* FDC Proof - Anyone can trigger, but usually worker/oracle */}
          {task?.status === "paid" && (
            <button
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all"
              onClick={doSubmitProof}
              disabled={verifying}
            >
              Submit Proof (FDC)
            </button>
          )}

          {task?.tx_hash && (
            <a
              href={`${explorerBase}${task.tx_hash}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-xs font-medium text-primary hover:text-primary-light hover:underline underline-offset-4 transition-colors"
            >
              View Tx ↗
            </a>
          )}
        </div>
      </div>
    </BackgroundGradient>
  );
}
