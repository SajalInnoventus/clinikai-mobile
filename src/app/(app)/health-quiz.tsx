import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HealthQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

const HEALTH_QUIZ_QUESTIONS: HealthQuizQuestion[] = [
  {
    id: "hydration-01",
    question: "Which habit generally helps maintain good hydration?",
    options: [
      "Drinking water regularly throughout the day",
      "Only drinking water when extremely thirsty",
      "Replacing all water with sugary drinks",
      "Avoiding fluids during the day",
    ],
    correctOptionIndex: 0,
    explanation:
      "Regular fluid intake helps support normal hydration. Individual fluid needs can vary based on factors such as activity and climate.",
  },
  {
    id: "sleep-01",
    question: "Which habit can support better sleep?",
    options: [
      "Keeping a consistent sleep schedule",
      "Using bright screens immediately before bed",
      "Changing your sleep time every night",
      "Drinking large amounts of caffeine before sleeping",
    ],
    correctOptionIndex: 0,
    explanation:
      "A consistent sleep and wake schedule can help support a regular sleep routine.",
  },
  {
    id: "nutrition-01",
    question: "Which is generally considered part of a balanced diet?",
    options: [
      "Eating a variety of nutrient-rich foods",
      "Eating only one type of food",
      "Avoiding all fruits and vegetables",
      "Skipping meals regularly",
    ],
    correctOptionIndex: 0,
    explanation:
      "A varied diet can provide a wider range of nutrients. Individual dietary needs may differ.",
  },
  {
    id: "activity-01",
    question: "What is one general benefit of regular physical activity?",
    options: [
      "It can support overall physical and mental wellbeing",
      "It guarantees that illness will never occur",
      "It eliminates the need for sleep",
      "It means medical check-ups are unnecessary",
    ],
    correctOptionIndex: 0,
    explanation:
      "Regular physical activity is associated with several health benefits, although it does not eliminate the need for appropriate healthcare.",
  },
  {
    id: "nutrition-01",
    question: "Which is generally considered part of a balanced diet?",
    options: [
      "Eating a variety of nutrient-rich foods",
      "Eating only one type of food",
      "Avoiding all fruits and vegetables",
      "Skipping meals regularly",
    ],
    correctOptionIndex: 0,
    explanation:
      "A varied diet can provide a wider range of nutrients. Individual dietary needs may differ.",
  },
];

export default function HealthQuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = HEALTH_QUIZ_QUESTIONS[currentQuestionIndex];

  const progressPercentage = useMemo(() => {
    return (
      ((currentQuestionIndex + (selectedOptionIndex !== null ? 1 : 0)) /
        HEALTH_QUIZ_QUESTIONS.length) *
      100
    );
  }, [currentQuestionIndex, selectedOptionIndex]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOptionIndex !== null) {
      return;
    }

    setSelectedOptionIndex(optionIndex);

    if (optionIndex === currentQuestion.correctOptionIndex) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) {
      return;
    }

    const isLastQuestion =
      currentQuestionIndex === HEALTH_QUIZ_QUESTIONS.length - 1;

    if (isLastQuestion) {
      setIsCompleted(true);
      return;
    }

    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedOptionIndex(null);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.resultContainer}>
          <View style={styles.resultIcon}>
            <Text style={styles.resultIconText}>✓</Text>
          </View>

          <Text style={styles.resultTitle}>Quiz completed</Text>

          <Text style={styles.resultSubtitle}>
            Nice work! Here's how you did.
          </Text>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>YOUR SCORE</Text>

            <Text style={styles.scoreValue}>
              {score}/{HEALTH_QUIZ_QUESTIONS.length}
            </Text>

            <Text style={styles.scoreDescription}>
              {score === HEALTH_QUIZ_QUESTIONS.length
                ? "Excellent! You answered every question correctly."
                : "Keep learning and try the quiz again."}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleRestartQuiz}
          >
            <Text style={styles.primaryButtonText}>Try again</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Back to waiting room</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Health Quiz</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.introduction}>
          <Text style={styles.title}>Learn while you wait</Text>

          <Text style={styles.description}>
            Test your general health knowledge with a few quick questions.
          </Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of{" "}
              {HEALTH_QUIZ_QUESTIONS.length}
            </Text>

            <Text style={styles.progressText}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: `${Math.max(progressPercentage, 5)}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            QUESTION {currentQuestionIndex + 1}
          </Text>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, optionIndex) => {
              const isSelected = selectedOptionIndex === optionIndex;
              const isCorrect =
                optionIndex === currentQuestion.correctOptionIndex;

              const showCorrectState =
                selectedOptionIndex !== null && isCorrect;

              const showIncorrectState =
                selectedOptionIndex === optionIndex && !isCorrect;

              return (
                <Pressable
                  key={option}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                    showCorrectState && styles.optionCorrect,
                    showIncorrectState && styles.optionIncorrect,
                  ]}
                  onPress={() => handleOptionSelect(optionIndex)}
                  accessibilityRole="button"
                  accessibilityLabel={option}
                >
                  <View
                    style={[
                      styles.optionIndicator,
                      isSelected && styles.optionIndicatorSelected,
                      showCorrectState && styles.optionIndicatorCorrect,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionIndicatorText,
                        (isSelected || showCorrectState) &&
                          styles.optionIndicatorTextSelected,
                      ]}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </Text>
                  </View>

                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          {selectedOptionIndex !== null && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                {selectedOptionIndex === currentQuestion.correctOptionIndex
                  ? "Correct"
                  : "Good try"}
              </Text>

              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            selectedOptionIndex === null && styles.nextButtonDisabled,
            pressed && selectedOptionIndex !== null && styles.buttonPressed,
          ]}
          onPress={handleNextQuestion}
          disabled={selectedOptionIndex === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === HEALTH_QUIZ_QUESTIONS.length - 1
              ? "Finish quiz"
              : "Next question"}
          </Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          This quiz is for general educational purposes and is not medical
          advice or a diagnostic tool.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    fontSize: 34,
    lineHeight: 36,
    color: "#0F172A",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 44,
  },

  introduction: {
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "700",
    color: "#0F172A",
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
    marginTop: 8,
  },

  progressSection: {
    marginBottom: 20,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },

  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#1677FF",
  },

  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  questionNumber: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#1677FF",
    marginBottom: 10,
  },

  questionText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 24,
  },

  optionsContainer: {
    gap: 10,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    minHeight: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },

  optionSelected: {
    borderColor: "#1677FF",
    backgroundColor: "#EFF6FF",
  },

  optionCorrect: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },

  optionIncorrect: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },

  optionIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    marginRight: 12,
  },

  optionIndicatorSelected: {
    backgroundColor: "#1677FF",
  },

  optionIndicatorCorrect: {
    backgroundColor: "#16A34A",
  },

  optionIndicatorText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  optionIndicatorTextSelected: {
    color: "#FFFFFF",
  },

  optionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#334155",
  },

  explanationBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },

  explanationTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 5,
  },

  explanationText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  nextButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  nextButtonDisabled: {
    backgroundColor: "#CBD5E1",
  },

  nextButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  disclaimer: {
    fontSize: 11,
    lineHeight: 17,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 16,
  },

  resultContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  resultIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  resultIconText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#16A34A",
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  resultSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
    marginBottom: 28,
  },

  scoreCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },

  scoreLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
  },

  scoreValue: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1677FF",
    marginVertical: 8,
  },

  scoreDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
    textAlign: "center",
  },

  primaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  secondaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1677FF",
  },

  buttonPressed: {
    opacity: 0.75,
  },
});
