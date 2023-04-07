export interface Chat {
  user_pk: string;
  name: string;
  role: string;
  text: string;
  date: string;
  type:string
}
export interface ChatHistory {
  _id: string;
  roomID: string;
  chat: Chat[];
}
