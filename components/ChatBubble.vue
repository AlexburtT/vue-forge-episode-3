<script lang="ts" setup>
  import { Message, User } from "~~/types";
  //@ts-expect-error: no types
  import Markdown from "vue3-markdown-it";

  const props = defineProps<{
      user?: User,
      message?: Message,
      isMine?: boolean
  }>();

  const realTime = useTimeAgo(() => props.message?.createdAt ?? new Date());
</script>

<template>
  <div class="chat"
  :class="{ 'chat-end': isMine, 'chat-start': !isMine }">
      <div class="chat-image avatar">
          <div class="w-10 rounded-full">
              <img :src="user?.avatar" alt="avatar"/>
          </div>

      </div>

      <div class="chat-header text-xs opacity-50 mb-2">
          <strong>{{ user?.name }}</strong>
          &nbsp;
          <time v-if="message">{{ realTime }}</time>
      </div>

      <div class="chat-bubble max-w-max w-full prose prose-sm py-0">
          <Markdown v-if="message" :source="message.text" class="w-full" />
          <slot v-else />
      </div>
  </div>
</template>
