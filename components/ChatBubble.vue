<script lang="ts" setup>
  import { Message, User } from "~~/types";
  //@ts-expect-error: no types
  import Markdown from "vue3-markdown-it";

  const props = defineProps<{
      user?: User,
      message: Message,
      isMine?: boolean
  }>();

  const realTime = useTimeAgo(() => props.message.createdAt);
</script>

<template>
  <div class="chat"
  :class="{ 'chat-end': isMine, 'chat-start': !isMine }">
      <div class="chat-image avatar">
          <div class="w-10 rounded-full">
              <img :src="user?.avatar" alt="avatar"/>
          </div>

      </div>

      <div class="chat-header">
          <strong>{{ user?.name }}</strong>
          &nbsp;
          <time>{{ realTime }}</time>
      </div>

      <div class="chat-bubble max-w-max w-full prose prose-sm py-0">
          <Markdown :source="message.text" class="w-full" />
      </div>
  </div>
</template>
