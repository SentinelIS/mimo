import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { calculateSimilarity } from './helpers/calculateSimilarity';

interface Faq {
    questions: string[];
    answer: string;
}

export interface ChatbotResponse {
    success: boolean;
    answer: string;
    similarity: number;
}

@Injectable()
export class MimoService {
    private faqs: Faq[] = [];
    private readonly faqPath = path.join(__dirname, 'qua.json');
    private readonly similarityThreshold = 0.3;

    constructor() {
        this.loadFaqs();
    }

    private async loadFaqs(): Promise<void> {
        try {
            const faqData = await fs.readFile(this.faqPath, 'utf8');
            const faqs = JSON.parse(faqData);
            if (faqs.faqs && Array.isArray(faqs.faqs)) {
                this.faqs = faqs.faqs;
            }
        } catch (error) {
            console.error('Error loading FAQ data:', error);
        }
    }

    async getAnswer(question: string): Promise<ChatbotResponse> {
        if (!question || typeof question !== 'string' || question.trim().length === 0) {
            return {
                success: false,
                answer: 'Question is required',
                similarity: 0
            };
        }

        if (this.faqs.length === 0) {
            return {
                success: false,
                answer: 'Invalid FAQ data structure',
                similarity: 0
            };
        }

        let bestMatch: Faq | null = null;
        let bestScore = 0;

        for (const faq of this.faqs) {
            if (!faq.questions || !Array.isArray(faq.questions)) continue;

            for (const faqQuestion of faq.questions) {
                const similarity = calculateSimilarity(question.trim(), faqQuestion);
                if (similarity > bestScore) {
                    bestScore = similarity;
                    bestMatch = faq;
                }
            }
        }

        if (bestScore < this.similarityThreshold || !bestMatch) {
            return {
                success: true,
                answer: "I'm sorry, I cannot answer that question. Please try rephrasing your question or ask about SentinelIS setup, features, or information security.",
                similarity: bestScore
            };
        }

        return {
            success: true,
            answer: bestMatch.answer,
            similarity: bestScore
        };
    }
}
