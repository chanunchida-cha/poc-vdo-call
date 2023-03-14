import React, { ReactElement, useState, useEffect } from "react";
import ChatLayout from "@/features/chat/layouts/ChatLayout";
import ChatHistory from "@/features/chat/layouts/ChatHistory";
import ChatChannel from "@/features/chat/components/ChatChannel";
import {
  useLazyGetHistoryByPatientIdQuery,
  useLazyGetHistoryByIdQuery,
} from "@/stores/service/getHistoryService";
import { type User } from "@/models/interface/InterfaceUser";
import ChatByRoomId from "./ChatByRoomId";
interface Props {
  user: User;
}

function UserChat({ user }: Props): ReactElement {
  const [activeChannel, setActiveChannel] = useState(0);
  const [historyId, sethistoryId] = useState<string>("");
  const [pharmacyName, setPharmacyName] = useState<string>("");
  const [
    getAllhistorys,
    { data: historys, isLoading: loadingHistory, error: errorHistory },
  ] = useLazyGetHistoryByPatientIdQuery();

  const [getHistory, { data: history, isLoading, error }] =
    useLazyGetHistoryByIdQuery();

  useEffect(() => {
    const getAllHistory = async () => {
      const response = await getAllhistorys(user.id);
      sethistoryId(response?.data?.[0]?._id!);
      setPharmacyName(response?.data?.[0]?.pharmacyName!);
    };
    getAllHistory();
  }, []);

  useEffect(() => {
    const getHistoryById = async () => {
      await getHistory(historyId);
    };
    getHistoryById();
  }, [historyId]);

  console.log("roomId", history?.roomID);

  return (
    <div>
      <ChatLayout>
        <ChatHistory>
          {historys?.map((history, index) => {
            return (
              <ChatChannel
                key={history._id}
                name={history.pharmacyName}
                avatar={`https://ui-avatars.com/api/?name= ${history.pharmacyName}`}
                isActive={activeChannel === index}
                onClick={() => {
                  setActiveChannel(index);
                  sethistoryId(history._id);
                  setPharmacyName(history.pharmacyName);
                }}
              />
            );
          })}
        </ChatHistory>

        <ChatByRoomId
          roomId={history?.roomID!}
          userLogin={user.firstName}
          phamacyName={pharmacyName}
        />
      </ChatLayout>
    </div>
  );
}

export default UserChat;
