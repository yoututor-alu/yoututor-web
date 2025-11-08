import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  LOGIN_USER,
  SocialLoginType,
  type SocialLoginInput,
  type SocialLoginResponse
} from "../api/mutations/authentication";
import { useWrapperContext } from "../components/Wrapper";
import { useMutation } from "@apollo/client";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import { useGoogleLogin } from "@react-oauth/google";
import Spinner from "../components/Spinner";

const Login = () => {
  const { handleAuthSuccess } = useWrapperContext();

  const [loginUser, loginUserResult] = useMutation<
    SocialLoginResponse,
    SocialLoginInput
  >(LOGIN_USER);

  const handleLoginUser = async (input: SocialLoginInput["input"]) => {
    try {
      const response = await loginUser({ variables: { input } });

      if (response.errors) {
        return handleResponseErrors(response);
      }

      if (!response.data?.loginUserBySocialMedia) {
        return;
      }

      handleAuthSuccess(response.data.loginUserBySocialMedia.accessToken);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async response => {
      // When Google login succeeds, pass the access token to our backend
      await handleLoginUser({
        type: SocialLoginType.Google,
        token: response.access_token
      });
    },

    onError: error => {
      handleErrorMessage(error.error_description);
    }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray/30 p-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BDF0E6] text-deepNavy text-sm font-medium">
            <LogIn className="h-4 w-4" />
            Welcome back
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-deepNavy mb-3">
            Sign in to YouTutor
          </h1>
          <p className="text-gray">
            Pick up where you left off. Continue learning from any YouTube video
            with interactive explanations and summaries.
          </p>
        </div>

        <div className="space-y-5">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-deepNavy text-white font-semibold py-3.5 rounded-xl shadow-lg hover:opacity-90 transition"
            disabled={loginUserResult.loading}
            onClick={() => {
              if (loginUserResult.loading) {
                return;
              }
              return login();
            }}
          >
            <FcGoogle className="h-6 w-6" />
            {loginUserResult.loading ? (
              <Spinner message="Signing in" />
            ) : (
              "Continue with Google"
            )}
          </button>

          <div className="flex items-center gap-3">
            <span className="flex-1 h-px bg-gray/40" />
            <span className="text-gray text-xs uppercase tracking-widest">
              or
            </span>
            <span className="flex-1 h-px bg-gray/40" />
          </div>

          <div className="bg-[#BDF0E6] rounded-2xl p-5 text-deepNavy text-sm leading-relaxed">
            <p className="font-semibold mb-2">Why Google?</p>
            <ul className="space-y-1 text-deepNavy/80">
              <li>• One-tap sign in, no passwords to remember.</li>
              <li>• Syncs your sessions securely across devices.</li>
              <li>
                • Fast, safe onboarding so you can start learning immediately.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-gray">
          <span>New to YouTutor? </span>
          <Link
            to="/register"
            className="text-deepNavy font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
