import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray/30 p-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BDF0E6] text-deepNavy text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Create your space
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-deepNavy mb-3">
            Join YouTutor
          </h1>
          <p className="text-gray">
            Transform every YouTube video into an interactive lesson. Sign up
            with Google and start exploring smarter learning tools instantly.
          </p>
        </div>

        <div className="space-y-5">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-deepNavy text-white font-semibold py-3.5 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            <FcGoogle className="h-6 w-6" />
            Sign up with Google
          </button>

          <div className="flex items-center gap-3">
            <span className="flex-1 h-px bg-gray/40" />
            <span className="text-gray text-xs uppercase tracking-widest">
              or
            </span>
            <span className="flex-1 h-px bg-gray/40" />
          </div>

          <div className="bg-[#BDF0E6] rounded-2xl p-5 text-deepNavy text-sm leading-relaxed">
            <p className="font-semibold mb-2">
              With your Google account you get:
            </p>
            <ul className="space-y-1 text-deepNavy/80">
              <li>• Personalized study sessions synced to your playlist.</li>
              <li>• Quick access to saved chats and summaries.</li>
              <li>• Secure authentication managed by Google.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-gray">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-deepNavy font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
