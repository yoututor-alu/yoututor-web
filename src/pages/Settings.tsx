import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { Textarea, Button } from "@chakra-ui/react";
import { Save } from "lucide-react";
import { useFormik } from "formik";
import { userState } from "../resources/user";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER,
  type UpdateUserInput,
  type UpdateUserResponse
} from "../api/mutations/user";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import toast from "react-hot-toast";

const Settings = () => {
  const [user, setUser] = useRecoilState(userState);

  const initialValues = useMemo(() => {
    if (!user || !user.id) {
      return {
        bio: "",
        systemPrompt: ""
      };
    }

    return {
      bio: user.bio,
      systemPrompt: user.systemPrompt
    };
  }, [user]);

  const [updateUser, updateUserResult] = useMutation<
    UpdateUserResponse,
    UpdateUserInput
  >(UPDATE_USER);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async input => {
      try {
        const response = await updateUser({ variables: { input } });

        if (response.errors) {
          return handleResponseErrors(response);
        }

        if (!response.data?.updateUser) {
          return;
        }

        setUser(response.data.updateUser);

        toast.success("Settings Saved.");
      } catch (error) {
        handleErrorMessage(error);
      }
    }
  });

  return (
    <div className="min-h-full bg-[#fafafa] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray/30 p-8 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-deepNavy mb-2">Settings</h1>
            <p className="text-gray">Personalize YouTutor for you</p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-deepNavy mb-2"
              >
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                minH="100px"
                className="w-full"
                resize="vertical"
                bg="white"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: "#1a365d",
                  boxShadow: "0 0 0 1px #1a365d"
                }}
              />
            </div>
            <div>
              <label
                htmlFor="system-prompt"
                className="block text-sm font-semibold text-deepNavy mb-2"
              >
                System Prompt
              </label>
              <Textarea
                id="system-prompt"
                name="systemPrompt"
                value={values.systemPrompt}
                onChange={handleChange}
                placeholder="Enter your system prompt here. This will be used to customize how the AI responds in all your chat sessions."
                minH="200px"
                className="w-full"
                resize="vertical"
                bg="white"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                _focus={{
                  borderColor: "#1a365d",
                  boxShadow: "0 0 0 1px #1a365d"
                }}
              />
              <p className="mt-2 text-xs text-gray">
                This prompt will be applied to all your chat sessions and
                persisted across browser sessions.
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => handleSubmit()}
                isLoading={updateUserResult.loading}
                loadingText="Saving..."
                leftIcon={<Save className="h-4 w-4" />}
                className="bg-deepNavy text-white hover:opacity-90"
                px={6}
                py={6}
                borderRadius="xl"
                fontWeight="semibold"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
