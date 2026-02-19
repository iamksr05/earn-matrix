// src/lib/userService.js
import { supabase } from "./supabase";

/**
 * Upsert user profile into the `users` table based on their wallet address.
 * @param {string} walletAddress - The logged in user's wallet address
 * @param {string} email - Optional: The user's email address
 */
export async function upsertUser(walletAddress, email = null) {
    if (!walletAddress) {
        throw new Error("Wallet address is required to register user.");
    }

    const payload = {
        wallet_address: walletAddress.toLowerCase(),
        email: email,
        updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from("users")
        .upsert(payload, { onConflict: "wallet_address" })
        .select()
        .maybeSingle();

    if (error) {
        // Silently ignore schema cache errors so the demo keeps working
        // without requiring the user to create the 'users' table right now.
        if (error.message?.includes("Could not find the table")) {
            return null;
        }
        console.error("Error upserting user:", error.message);
        throw error;
    }

    return data;
}
