-- AlterTable
ALTER TABLE "PromptAnalysis" ADD COLUMN     "comparisonId" TEXT,
ADD COLUMN     "customScores" JSONB,
ADD COLUMN     "mode" TEXT NOT NULL DEFAULT 'single';
