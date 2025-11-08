import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@chakra-ui/react";
import { useWrapperContext } from "../components/Wrapper";
import {
  CREATE_USER,
  SocialLoginType,
  type SocialLoginInput,
  type SocialLoginResponse
} from "../api/mutations/authentication";
import { useMutation } from "@apollo/client";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import { useGoogleLogin } from "@react-oauth/google";
import { UserType } from "../interfaces/user";
import Spinner from "../components/Spinner";

const Register = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const { handleAuthSuccess } = useWrapperContext();

  const [createUser, createUserResult] = useMutation<
    SocialLoginResponse,
    SocialLoginInput
  >(CREATE_USER);

  const handleCreateUser = async (input: SocialLoginInput["input"]) => {
    try {
      const response = await createUser({ variables: { input } });

      if (response.errors) {
        return handleResponseErrors(response);
      }

      if (!response.data?.createUserBySocialMedia) {
        return;
      }

      handleAuthSuccess(response.data.createUserBySocialMedia.accessToken);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async response => {
      await handleCreateUser({
        userType: UserType.User,
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
          <div className="flex items-start gap-3 p-4 bg-gray/5 rounded-xl border border-gray/20">
            <Checkbox
              id="terms-agreement"
              checked={isAgreed}
              onChange={e => setIsAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 !text-deepNavy !accent-lightCyan checked:!bg-lightCyan !bg-lightCyan border-gray/30 rounded focus:ring-2 focus:ring-deepNavy/20 focus:!bg-lightCyan cursor-pointer"
            />
            <label
              htmlFor="terms-agreement"
              className="text-sm text-gray leading-relaxed cursor-pointer flex-1"
            >
              I agree to the{" "}
              <span className="text-deepNavy font-semibold hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-deepNavy font-semibold hover:underline">
                Privacy Policy
              </span>
            </label>
          </div>

          <button
            type="button"
            disabled={!isAgreed}
            onClick={() => {
              if (!isAgreed) {
                return;
              }

              return login();
            }}
            className="w-full flex items-center justify-center gap-3 bg-deepNavy text-white font-semibold py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
          >
            <FcGoogle className="h-6 w-6" />
            {createUserResult.loading ? (
              <Spinner message="Signing up" />
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
