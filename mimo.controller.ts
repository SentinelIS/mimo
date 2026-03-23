import { Controller, Post, Body } from '@nestjs/common';
import { MimoService, ChatbotResponse } from './mimo.service';
import { AskQuestionDto } from './dto/ask-question.dto';

@Controller('mimo')
export class MimoController {
    constructor(private readonly mimoService: MimoService) {}

    @Post('chatbot')
    async chatbot(@Body() askQuestionDto: AskQuestionDto): Promise<ChatbotResponse> {
        return this.mimoService.getAnswer(askQuestionDto.question);
    }
}
