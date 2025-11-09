import { useMutation } from "@apollo/client";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Youtube } from "lucide-react";
import { useState } from "react";
import {
  CREATE_SESSION,
  type CreateSessionInput,
  type CreateSessionResponse
} from "../api/mutations/session";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import { useRecoilState } from "recoil";
import { currentSessionState, sessionListState } from "../resources/session";
import { extractYouTubeVideoId } from "../utilities/youtube";
import { Spinner } from "@chakra-ui/react";

const LandingHero = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");

  const [, setCurrentSession] = useRecoilState(currentSessionState);

  const [, setSessions] = useRecoilState(sessionListState);

  const [createSession, createSessionResult] = useMutation<
    CreateSessionResponse,
    CreateSessionInput
  >(CREATE_SESSION);

  const handleCreateSession = async (input: CreateSessionInput["input"]) => {
    try {
      const response = await createSession({ variables: { input } });

      if (response.errors) {
        return handleResponseErrors(response);
      }

      if (!response.data?.createSession) {
        return;
      }

      setCurrentSession(response.data.createSession);

      setSessions(sessions => {
        return {
          ...sessions,
          list: [response.data!.createSession, ...sessions.list]
        };
      });

      navigate({
        to: "/chat/$id",
        params: { id: response.data.createSession.id }
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto text-center">
      {/* Logo/Icons */}
      {/* <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "#BDF0E6" }}
        >
          <Youtube className="w-8 h-8" style={{ color: "#151936" }} />
        </div>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "#BDF0E6" }}
        >
          <MessageCircle className="w-8 h-8" style={{ color: "#151936" }} />
        </div>
      </div> */}

      {/* Title */}
      <h1
        onClick={() => navigate({ to: "/" })}
        className="text-5xl md:text-6xl font-bold text-deepNavy mb-6 tracking-tight cursor-pointer"
      >
        YouTutor
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-deepNavy/80 mb-12 max-w-2xl mx-auto leading-relaxed">
        Turn any YouTube video into an interactive lesson. Paste a link, get a
        summary, and chat to understand concepts faster.
      </p>

      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray/40">
        <div className="mx-auto w-full  flex flex-col md:flex-row gap-3">
          <div className="relative md:flex-[3]">
            <Youtube
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "#979797" }}
            />
            <input
              type="url"
              placeholder="Paste YouTube URL here..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray/40 bg-white text-deepNavy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-[#151936] focus:border-transparent"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <button
            disabled={!url.trim()}
            onClick={async () => {
              const video = extractYouTubeVideoId(url);

              if (!video) {
                return handleErrorMessage("Invalid YouTube Link");
              }

              return await handleCreateSession({ video });
            }}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${
              url.trim()
                ? "bg-deepNavy text-white hover:opacity-90 shadow-lg hover:shadow-xl"
                : "bg-deepNavy/40 text-white cursor-not-allowed"
            }`}
          >
            {createSessionResult.loading ? (
              <>
                Processing
                <Spinner />
              </>
            ) : (
              <>
                Get Started
                <ArrowRight className="size-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <a
          href="#how-it-works"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray text-deepNavy bg-white hover:bg-[#BDF0E6] transition-colors"
        >
          How it works
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#features"
          className="px-5 py-2.5 rounded-lg text-deepNavy bg-white hover:bg-[#BDF0E6] transition-colors"
        >
          Features
        </a>
      </div>
    </section>
  );
};

export default LandingHero;
