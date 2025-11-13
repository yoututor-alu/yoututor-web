import { useEffect } from "react";
import ChatPanel from "../components/ChatPanel";
import VideoSummaryCard from "../components/VideoSummaryCard";
import { useRecoilState } from "recoil";
import { currentSessionState } from "../resources/session";
import { useParams } from "@tanstack/react-router";
import { useLazyQuery } from "@apollo/client";
import {
  GET_SESSION,
  type GetSessionInput,
  type GetSessionResponse
} from "../api/queries/session";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import Progress from "../components/Progress";

const Chat = () => {
  const params = useParams({ from: "/_layout/chat/$id/" });

  const [session, setSession] = useRecoilState(currentSessionState);

  const [getSession, getSessionResult] = useLazyQuery<
    GetSessionResponse,
    GetSessionInput
  >(GET_SESSION);

  const handleGetSession = async (id: string) => {
    try {
      const response = await getSession({ variables: { id } });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getSession) {
        return;
      }

      setSession(response.data.getSession);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!session.id && params.id) {
      handleGetSession(params.id);
    }
  }, []);

  return (
    <div className="px-4 py-8 lg:px-8 bg-[#fafafa] min-h-full">
      <div className="mb-6">
        {/* <p className="text-sm text-deepNavy/70">
          Session • 32 minutes remaining
        </p> */}
        {/* <h2 className="text-3xl font-semibold text-deepNavy mt-2">
          {session.name || ""}
        </h2> */}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr),minmax(0,1.2fr)]">
        <VideoSummaryCard />
        <ChatPanel />
      </div>
      <Progress loading={getSessionResult.loading} />
    </div>
  );
};

export default Chat;
