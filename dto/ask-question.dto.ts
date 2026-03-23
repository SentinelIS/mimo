import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AskQuestionDto {
  @ApiProperty({ description: 'The question to ask the chatbot.' })
  @IsString()
  @IsNotEmpty()
  question: string;
}
