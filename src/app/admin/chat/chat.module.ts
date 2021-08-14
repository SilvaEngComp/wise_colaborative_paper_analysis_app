import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ConversationComponent } from './conversation/conversation.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { MenuConversationComponent } from './conversation/menu-conversation/menu-conversation.component';
import { MenuChatUsersComponent } from './chat-users/menu-chat-users/menu-chat-users.component';



@NgModule({
  declarations: [ChatComponent, ConversationComponent, MenuConversationComponent, ChatUsersComponent, MenuChatUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4EmojiPickerModule,
    PipesModule
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
