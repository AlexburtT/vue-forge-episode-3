import { Configuration, OpenAIApi } from 'openai';

const config = useRuntimeConfig();

const openaiConfig = new Configuration({
    apiKey: config.openai.apiKey
});

export const $openai = new OpenAIApi(openaiConfig);

export const newClient = $fetch.create({
    method: 'POST',
    baseURL: 'https://api.openai.com/',
    headers: {
        Authorization: `Bearer ${config.openai.apiKey}`,
    },
});
