import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import ContributorStats from "../components/hub/ContributorStats";
import TaskMarketplace from "../components/hub/TaskMarketplace";

export default function ContributorDashboard() {
    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Contributor <span className="text-emerald-400">Dashboard</span>
                </h1>
                <p className="text-zinc-400">Welcome back, Hunter. Ready for your next mission?</p>
            </motion.div>



            <section>
                <TaskMarketplace />
            </section>
        </DashboardLayout>
    );
}
