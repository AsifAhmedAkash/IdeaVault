"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "../lib/auth-client";
import { Button, Input, Card, CardBody, CardHeader } from "@heroui/react";

export default function ProfilePage() {
    const sessionInfo = useSession();
    const session = sessionInfo?.data;
    const user = session?.user;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");

    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setProfileError("");
        setProfileSuccess("");
        setProfileLoading(true);

        try {
            await authClient.updateUser({
                name,
                image,
            });
            setProfileSuccess("Profile updated successfully!");
            // Refetch session to update UI globally
            sessionInfo?.refetch?.();
        } catch (err) {
            console.error(err);
            setProfileError(err?.message || "Failed to update profile");
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match");
            return;
        }

        setPasswordLoading(true);

        try {
            const res = await authClient.changePassword({
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            });

            if (res.error) {
                setPasswordError(res.error.message || "Failed to change password");
            } else {
                setPasswordSuccess("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            console.error(err);
            setPasswordError(err?.message || "Failed to change password");
        } finally {
            setPasswordLoading(false);
        }
    };

    if (sessionInfo?.isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <p className="text-lg font-medium animate-pulse">Loading Profile...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-10">
                <header className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight">Profile Management</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Manage your IdeaVault identity and account security.
                    </p>
                </header>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* LEFT PANEL: PROFILE CARD */}
                    <div className="md:col-span-4 flex flex-col items-center">
                        <Card className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <CardBody className="flex flex-col items-center py-10">
                                <div className="w-24 h-24 rounded-full bg-lime-600 text-white flex items-center justify-center font-black text-3xl overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-700 shadow-md">
                                    {user?.image ? (
                                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        user?.name?.slice(0, 2).toUpperCase() || "US"
                                    )}
                                </div>
                                <h2 className="text-xl font-bold truncate max-w-full">{user?.name}</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-full mt-1">
                                    {user?.email}
                                </p>
                            </CardBody>
                        </Card>
                    </div>

                    {/* RIGHT PANEL: FORMS */}
                    <div className="md:col-span-8 space-y-8">
                        {/* UPDATE PROFILE */}
                        <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <CardHeader className="px-6 pt-6 pb-2">
                                <h2 className="text-xl font-bold">Profile Details</h2>
                            </CardHeader>
                            <CardBody className="px-6 pb-6">
                                {profileError && (
                                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded text-sm">
                                        {profileError}
                                    </div>
                                )}
                                {profileSuccess && (
                                    <div className="mb-4 p-3 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded text-sm">
                                        {profileSuccess}
                                    </div>
                                )}

                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-xs uppercase font-semibold text-zinc-500 mb-1">Full Name</label>
                                        <Input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                            className="dark:bg-zinc-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase font-semibold text-zinc-500 mb-1">Avatar Image URL</label>
                                        <Input
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            placeholder="https://example.com/avatar.jpg"
                                            className="dark:bg-zinc-800"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={profileLoading}
                                        className="bg-lime-700 hover:bg-lime-600 text-white font-semibold"
                                    >
                                        {profileLoading ? "Updating..." : "Save Details"}
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>

                        {/* CHANGE PASSWORD */}
                        <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <CardHeader className="px-6 pt-6 pb-2">
                                <h2 className="text-xl font-bold">Change Password</h2>
                            </CardHeader>
                            <CardBody className="px-6 pb-6">
                                {passwordError && (
                                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded text-sm">
                                        {passwordError}
                                    </div>
                                )}
                                {passwordSuccess && (
                                    <div className="mb-4 p-3 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded text-sm">
                                        {passwordSuccess}
                                    </div>
                                )}

                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-xs uppercase font-semibold text-zinc-500 mb-1">Current Password</label>
                                        <Input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="dark:bg-zinc-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase font-semibold text-zinc-500 mb-1">New Password</label>
                                        <Input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="dark:bg-zinc-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase font-semibold text-zinc-500 mb-1">Confirm New Password</label>
                                        <Input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="dark:bg-zinc-800"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={passwordLoading}
                                        className="bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-750 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold"
                                    >
                                        {passwordLoading ? "Updating..." : "Change Password"}
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
