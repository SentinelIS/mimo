import { Controller, Post, Body } from '@nestjs/common';
import { MimoService, ChatbotResponse } from './mimo.service';

@Controller('mimo')
export class MimoController {
    constructor(private readonly mimoService: MimoService) {}

    @Post('chatbot')
    async chatbot(@Body('question') question: string): Promise<ChatbotResponse> {
        return this.mimoService.getAnswer(question);
    }
}
