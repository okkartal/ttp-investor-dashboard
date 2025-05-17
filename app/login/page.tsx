'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Perform login logic here
        const result = await supabase.auth.signInWithPassword({ email, password });
        

        if(result.error) {
            setErrorMsg(result.error.message);
        } else {
            setErrorMsg(null);
            router.push(`/dashboard?investorId=${result.data.user.id}`);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded 2xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center">Investor Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required />
                    {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    )
}