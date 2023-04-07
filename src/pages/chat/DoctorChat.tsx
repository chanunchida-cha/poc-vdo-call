import React, { ReactElement, useState, useEffect } from "react";
import ChatLayout from "@/features/chat/layouts/ChatLayout";
import ChatHistory from "@/features/chat/layouts/ChatHistory";
import ChatRoom from "@/features/chat/layouts/ChatRoom";
import ChatChannel from "@/features/chat/components/ChatChannel";
import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";
import { type User } from "@/models/interface/InterfaceUser";
import {
  useLazyGetAllHistoryQuery,
  useLazyGetHistoryByIdQuery,
} from "@/stores/service/getHistoryService";
import ChatByRoomId from "./ChatByRoomId";
import SearchBar from "@/utils/SearchBar";
interface Props {
  user: User;
}

function DoctorChat({ user }: Props): ReactElement {
  const [activeChannel, setActiveChannel] = useState(0);
  const [historyId, sethistoryId] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");

  const [
    getAllHistorys,
    { data: allHistory, isLoading: loadingHistory, error: errorHistory },
  ] = useLazyGetAllHistoryQuery();

  const [getHistory, { data: history, isLoading, error }] =
    useLazyGetHistoryByIdQuery();

  useEffect(() => {
    const getHistory = async () => {
      const response = await getAllHistorys();
      sethistoryId(response?.data?.[0]?._id!);
      setPatientName(response?.data?.[0]?.patientName!);
    };
    getHistory();
  }, []);

  useEffect(() => {
    const getHistoryById = async () => {
      await getHistory(historyId);
    };
    getHistoryById();
  }, [historyId]);

  return (
    <div>
      <ChatLayout> 
        <ChatHistory>
          {allHistory?.map((history, index) => {
            return (
              <ChatChannel
                key={history._id}
                name={history.patientName}
                avatar={`https://ui-avatars.com/api/?name= ${history.patientName}`}
                isActive={activeChannel === index}
                onClick={() => {
                  setActiveChannel(index);
                  sethistoryId(history._id);
                  setPatientName(history.patientName);
                }}
              />
            );
          })}
        </ChatHistory>

        <ChatByRoomId
          roomId={history?.roomID!}
          userLogin={user}
          patientName={patientName}
        />
      </ChatLayout>
    </div>
  );
}

export default DoctorChat;
