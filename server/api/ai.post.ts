import {$openai, newClient} from "~/server/utils/openai";

const storage = useStorage();
export default defineEventHandler(async (event) => {
	const { message } = await readBody(event);
	const session = await useSession(event, {
		password: '123654789-123654789-123654789-123654789',
	});

	const key = session.id + ':messages';

	const messages = await storage.getItem(key) as Array<any> || [];
	messages.push({ 'role': 'user', 'content': message });

	// новый клиент
	// const data = await newClient('/v1/chat/completions', {
	// 	body: {
	// 		model: 'gpt-3.5-turbo',
	// 		messages: [
	// 			{ 'role': 'system', 'content': 'You are a helpful assistant for on AI-powered social media img generation.' },
	// 			...messages
	// 		]
	// 	}
	// });

	const data = await $openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{ 'role': 'system', 'content': 'You are a helpful assistant for on AI-powered social media img generation.' },
				...messages
			]
	});

	const response = data.data.choices[0].message;
	messages.push({ 'role': 'assistant', 'content': response?.content });

	await storage.setItem(key, messages);
	return response;
});


