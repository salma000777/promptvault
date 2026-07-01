import { signUp } from "@/actions/auth";

export default function SignupPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          Create your account
        </h1>

        <p className="mt-2 text-slate-400">
          Join PromptVault today.
        </p>
      </div>

      <form action={signUp} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold transition hover:bg-indigo-500"
        >
          Create Account
        </button>
      </form>
    </>
  );
}