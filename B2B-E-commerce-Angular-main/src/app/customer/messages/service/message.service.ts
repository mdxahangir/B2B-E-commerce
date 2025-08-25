import { Injectable } from '@angular/core';
import { Conversation, Message } from '../models/message.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000'; // JSON server URL

  constructor(private http: HttpClient) { }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations`);
  }

  getConversation(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/conversations/${id}`);
  }

  sendMessage(conversationId: number, content: string): Observable<Message> {
    const newMessage: Message = {
      id: Date.now(),
      content: content,
      timestamp: new Date().toISOString(),
      isSent: true
    };
    return of(newMessage); // Simulate API response
  }
}