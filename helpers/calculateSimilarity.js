// Helper function to calculate similarity score (0-1)
function calculateSimilarity(input, question) {
    const inputLower = input.toLowerCase().trim();
    const questionLower = question.toLowerCase().trim();

    // Exact match
    if (inputLower === questionLower) {
        return 1.0;
    }

    // Word-based similarity
    const inputWords = inputLower.split(/\s+/);
    const questionWords = questionLower.split(/\s+/);
    const commonWords = inputWords.filter(word => questionWords.includes(word));
    const wordSimilarity = (commonWords.length * 2) / (inputWords.length + questionWords.length);

    // Levenshtein distance similarity
    const maxLength = Math.max(inputLower.length, questionLower.length);
    const levenshteinSim = maxLength > 0 ? 1 - (levenshteinDistance(inputLower, questionLower) / maxLength) : 0;

    // Combined score (weighted average)
    return (wordSimilarity * 0.6) + (levenshteinSim * 0.4);
}
