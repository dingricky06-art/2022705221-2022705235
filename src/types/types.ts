export interface User {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

export interface Channel {
  id: string;
  name: string;
  lastMessage?: string;
  unreadCount?: number;  
}