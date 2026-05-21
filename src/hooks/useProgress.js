import { useLocalStorage } from './useLocalStorage'

const INITIAL_PROGRESS = {
  completedTests: [], // array of test IDs completed
  testResults: {},    // { testId: { wpm, accuracy, time, completedAt } }
  totalPracticeTime: 0,
  totalTests: 0,
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage('typemaster_progress', INITIAL_PROGRESS)

  const completeTest = (testId, result) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedTests.includes(testId)
      const existingResult = prev.testResults[testId]

      // Keep best result
      const bestResult = existingResult
        ? { ...result, wpm: Math.max(result.wpm, existingResult.wpm) }
        : result

      return {
        ...prev,
        completedTests: alreadyCompleted
          ? prev.completedTests
          : [...prev.completedTests, testId],
        testResults: {
          ...prev.testResults,
          [testId]: bestResult,
        },
        totalPracticeTime: prev.totalPracticeTime + (result.time || 0),
        totalTests: alreadyCompleted ? prev.totalTests : prev.totalTests + 1,
      }
    })
  }

  const isTestLocked = (testId) => {
    if (testId === 1) return false
    return !progress.completedTests.includes(testId - 1)
  }

  const isTestCompleted = (testId) => {
    return progress.completedTests.includes(testId)
  }

  const getTestResult = (testId) => {
    return progress.testResults[testId] || null
  }

  const getStats = () => {
    const results = Object.values(progress.testResults)
    if (results.length === 0) return { avgWpm: 0, bestWpm: 0, avgAccuracy: 0, totalTime: 0 }

    const totalWpm = results.reduce((sum, r) => sum + r.wpm, 0)
    const bestWpm = Math.max(...results.map((r) => r.wpm))
    const totalAccuracy = results.reduce((sum, r) => sum + r.accuracy, 0)

    return {
      avgWpm: Math.round(totalWpm / results.length),
      bestWpm,
      avgAccuracy: Math.round(totalAccuracy / results.length),
      totalTime: Math.round(progress.totalPracticeTime),
      completedCount: progress.completedTests.length,
    }
  }

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS)
  }

  return {
    progress,
    completeTest,
    isTestLocked,
    isTestCompleted,
    getTestResult,
    getStats,
    resetProgress,
  }
}
