<script setup lang="ts">
import {nanoid} from "nanoid";
import {Message, User} from "~~/types";

const me = ref<User>({
    id: "user",
    avatar: "/avatar.jpg",
    name: "Я",
});
const bot = ref<User>({
    id: "assistant",
    avatar: "/bot.jpg",
    name: "ИИшка",
});

const users = computed(() => [me.value, bot.value]);

const messages = useSessionStorage<Message[]>('messages', []);

const usersTyping = ref<User[]>([]);

// send messages to Chat API here
// and in the empty function below

async function handleNewMessage(message: Message) {
    messages.value.push(message);
    usersTyping.value.push(bot.value);
    try {
        const res = await $fetch('/api/ai', {
            method: 'POST',
            body: {
                message: message.text,
            }
        });

        messages.value.push({
            id: nanoid(),
            createdAt: new Date(),
            text: res.content,
            userId: "assistant",
        });
    } catch (err) {
        messages.value.push({
            id: nanoid(),
            createdAt: new Date(),
            text: 'Проблемы с подключением ко мне, проверьте своё Интернет соединение',
            userId: "assistant",
        });
    }
    usersTyping.value.splice(usersTyping.value.indexOf(bot.value));
}
</script>

<template>
    <ChatBox
            :me="me"
            :users="users"
            :messages="messages"
            @new-message="handleNewMessage"
            :usersTyping="usersTyping"
    />
</template>
