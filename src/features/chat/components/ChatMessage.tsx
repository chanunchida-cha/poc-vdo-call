import { showImage } from "@/utils/awsSDK/showImage";
import { type } from "os";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ChatMessageProps {
  name: string;
  avatar: string;
  message?: string;
  type: string;
  userId: string;
}

const Wrapper = styled.div`
  font-size: 15px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1;
  }
`;

//export const ทำให้ export ได้หลายครั้งใน Folder เดียว
export const ChatMessageOther: React.FC<ChatMessageProps> = ({
  name,
  avatar,
  message,
  type,
  userId,
}) => {
  const [s3url, setS3url] = useState<string>();

  useEffect(() => {
    const loadImage = async () => {
      await showImage(type, message!, setS3url);
    };
    loadImage();
  }, [userId]);

  return (
    <div className="container ">
      <Wrapper>
        <div className="flex flex-row items-center justify-start space-x-2 p-4">
          <div className="flex flex-row">
            <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />

            <p className="message from text-sm font-semibold text-primary-light">
              {s3url !== "" ? (
                <img className="h-40 w-40 rounded-lg" src={s3url} />
              ) : (
                <>{message}</>
              )}
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export const ChatMessageMe: React.FC<ChatMessageProps> = ({
  name,
  avatar,
  message,
  type,
  userId,
}) => {
  const [s3url, setS3url] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      await showImage(type, message!, setS3url);
    };
    loadImage();
  }, [message]);
  return (
    <div className="container">
      <Wrapper>
        <div className="space-x-2 p-4">
          <div className="flex-row-2 flex justify-end">
            <p className="message to text-sm font-semibold text-primary-light">
              {type === "image" ? (
                <img className="h-40 w-40 rounded-lg" src={s3url} />
              ) : (
                <>{message}</>
              )}
            </p>
            <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
