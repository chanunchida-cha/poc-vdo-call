import { type } from "os";
import React, { useState } from "react";
import styled from "styled-components";

interface ChatMessageProps {
  name: string;
  avatar: string;
  message?: string;
  type: string;
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
}) => {
  const showImage = async () => {
    const AWS = require("aws-sdk");
    const buckerName = "researcher/";
    let imageUrl;

    if (type === "image") {
      imageUrl = message;
    }
  };

  return (
    <div className="container ">
      <Wrapper>
        <div className="flex flex-row items-center justify-start space-x-2 p-4">
          <div className="flex flex-row">
            <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />

            <p className="message from text-sm font-semibold text-primary-light">
              {message}
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
}) => {
  return (
    <div className="container">
      <Wrapper>
        <div className="space-x-2 p-4">
          <div className="flex-row-2 flex justify-end">
            <p className="message to text-sm font-semibold text-primary-light">
              {message}
            </p>
            <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
