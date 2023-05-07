<script lang="ts" setup>
  import { Message, User } from "~~/types";

  const props = defineProps<{
      user?: User,
      message: Message
  }>();
</script>

<template>
  <div class="chat">
      <div class="chat-image avatar">

      </div>

      <div class="chat-header">

      </div>

      <div class="chat-bubble">{{ message }}</div>
  </div>
</template>
