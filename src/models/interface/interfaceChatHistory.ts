export interface Chat {
    name: string;
    role: string;
    text: string;
    date: string;
  }
  export interface ChatHistory {
    _id: string;
    roomID: string;
    chat: Chat[];
  }