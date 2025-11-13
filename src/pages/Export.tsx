import { useEffect } from "react";
import { useRecoilState } from "recoil";
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
import { exportSessionState } from "../resources/session";
import { MessageRole } from "../interfaces/session";
import SessionExport from "../components/SessionExport";
import Progress from "../components/Progress";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";

const SessionExportPage = () => {
  const params = useParams({ from: "/_layout/chat/$id/export" });

  const [exportSession, setExportSession] = useRecoilState(exportSessionState);

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

      setExportSession(response.data.getSession);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (params.id && (!exportSession.id || exportSession.id !== params.id)) {
      handleGetSession(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // Format date as MM/DD/YYYY
  const formattedDate = exportSession.createdAt
    ? dayjs(exportSession.createdAt).format("MM/DD/YYYY")
    : dayjs().format("MM/DD/YYYY");

  // Get user name
  const userName =
    exportSession.user?.firstName && exportSession.user?.lastName
      ? `${exportSession.user.firstName} ${exportSession.user.lastName}`
      : exportSession.user?.username || "User";

  // Convert messages to the format expected by SessionExport
  const messages = exportSession.messages.map(message => ({
    role: (message.role === MessageRole.User ? "user" : "agent") as
      | "user"
      | "agent",
    content: message.content
  }));

  return (
    <div className="print-page">
      <Helmet>
        {exportSession.id && (
          <title>YouTutor - {exportSession.name} Export</title>
        )}
      </Helmet>
      <SessionExport
        sessionTitle={exportSession.name || "Untitled Session"}
        sessionDate={formattedDate}
        userName={userName}
        messages={messages}
      />
      <Progress loading={getSessionResult.loading} />
    </div>
  );
};

export default SessionExportPage;
