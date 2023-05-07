<script lang="ts" setup>
import { Message, User } from "~~/types";

const props = defineProps<{
    messages: Message[],
    users: User[],
    me: User,
    userTyping?: User[]
}>();

function getUser(userId: string) {
    return props.users.find(user => user.id === userId);
}

const isOpen = ref(true);
</script>

<template>
  <div class="fixed bottom-[10px] right-[10px]">
      <button
              v-show="!isOpen"
              class="bg-blue-500 p-3 rounded"
              @click="isOpen = true">
          <IconChat class="w-8 h-8 text-white"/>
      </button>

      <div v-if="isOpen" class="box bg-gray-300 rounded w-[450px]">
          <header class="bg-gray-200 px-4 flex justify-between items-center">Customer Chat
              <button class="p-4 pr-0" @click="isOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/></svg>
              </button>
          </header>

          <div class="messages p-4 overflow-y-scroll max-h-[80vh]">
              <ChatBubble
                  v-for="message in messages"
                  :key="message.id"
                  :user="getUser(message.userId)"
                  :message="message"
              />
          </div>

          <footer class="p-2">
              <input type="text" placeholder="Type you message" class="input w-full block"/>
          </footer>
      </div>
  </div>
</template>
