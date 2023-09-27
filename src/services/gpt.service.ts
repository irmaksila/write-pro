import OpenAI from "openai";
export class GptService {
    public openai:OpenAI;
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser:true
        });
    }

    public async sendPrompt(prompt:string): Promise<any> {
        console.log('Prompt sending: ',prompt)
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [{role: "user", content: prompt}],
            model: "gpt-3.5-turbo",
        });
        return chatCompletion.choices[0].message.content
    }
}
