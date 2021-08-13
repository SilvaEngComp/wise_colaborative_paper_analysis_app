import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MenuChatComponent } from './menu-chat/menu-chat.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';
import { ChatUsersComponent } from './chat-users/chat-users.component';



@NgModule({
  declarations: [ChatComponent, ConversationComponent, MenuChatComponent, ChatUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4EmojiPickerModule
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
