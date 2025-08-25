import { Component, OnInit } from '@angular/core';
import { Conversation } from '../models/message.model';
import { MessageService } from '../service/message.service';


@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  newMessageContent = '';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.messageService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
      if (conversations.length > 0) {
        this.selectConversation(conversations[0].id);
      }
    });
  }

  selectConversation(id: number): void {
    this.messageService.getConversation(id).subscribe(conversation => {
      this.selectedConversation = conversation;
    });
  }

  sendMessage(): void {
    if (this.newMessageContent.trim() && this.selectedConversation) {
      this.messageService.sendMessage(this.selectedConversation.id, this.newMessageContent).subscribe(message => {
        if (this.selectedConversation) {
          this.selectedConversation.messages.push(message);
          this.newMessageContent = '';
        }
      });
    }
  }
 

}
