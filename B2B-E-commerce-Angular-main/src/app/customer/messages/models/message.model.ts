export interface Conversation {
  id: number;
  supplierName: string;
  supplierAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  supplierStatus: string;
  messages: Message[];
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  isSent: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: number;
  type: 'image' | 'document' | 'other';
  url: string;
  name?: string;
}