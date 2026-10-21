
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  background: "#F6F8FC",
  card: "#FFFFFF",
  cardRaised: "#F1F4F9",
  border: "#E4E7EC",
  mitra: "#7C3AED",
  mitraMuted: "#F1E8FE",
  textPrimary: "#111827",
  textSecondary: "#667085",
  textMuted: "#98A2B3",
};

type Message = {
  id: string;
  text: string;
  sender: "mitra" | "patient";
};

const SUGGESTED_QUESTIONS = [
  {
    icon: "document-text-outline" as const,
    title: "Understand my reports",
    subtitle: "Explain a medical report",
  },
  {
    icon: "time-outline" as const,
    title: "My health history",
    subtitle: "Explore previous visits",
  },
  {
    icon: "medkit-outline" as const,
    title: "My medications",
    subtitle: "Review saved medication details",
  },
  {
    icon: "calendar-outline" as const,
    title: "My appointments",
    subtitle: "Ask about upcoming visits",
  },
];

export default function ClinikAiAssistantScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatStarted, setIsChatStarted] = useState(false);

  const sendMessage = (text = input) => {
    const question = text.trim();

    if (!question) return;

    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-patient`,
        text: question,
        sender: "patient",
      },
      {
        id: `${Date.now()}-mitra`,
        text:
          "I have received your question.I will use your available health information to prepare an answer with relevant source references.",
        sender: "mitra",
      },
    ]);

    setInput("");
    setIsChatStarted(true);
  };

  const startSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
                <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.textPrimary}
            />
          </Pressable>

          <View style={styles.headerIdentity}>
            <View style={styles.avatar}>
              <Ionicons
                name="sparkles"
                size={22}
                color={COLORS.mitra}
              />
            </View>

            <View>
              <Text style={styles.headerTitle}>Mitra</Text>
              <Text style={styles.headerSubtitle}>
                Your health assistant
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.headerAction}
            onPress={() => {
              setMessages([]);
              setIsChatStarted(false);
              setInput("");
            }}
            accessibilityLabel="Start a new conversation"
          >
            <Ionicons
              name="create-outline"
              size={23}
              color={COLORS.textPrimary}
            />
          </Pressable>
        </View>
            <ScrollView
          style={styles.conversation}
          contentContainerStyle={styles.conversationContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {!isChatStarted ? (
            <>
              <View style={styles.welcomeSection}>
                <View style={styles.largeAvatar}>
                  <Ionicons
                    name="sparkles"
                    size={34}
                    color={COLORS.mitra}
                  />
                </View>

                <Text style={styles.welcomeTitle}>
                  Hello, I'm Mitra
                </Text>

                <Text style={styles.welcomeDescription}>
                  Your personal health companion. Ask questions about
                  your medical history, reports, medications, and visits.
                </Text>

                <View style={styles.privacyNote}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={17}
                    color={COLORS.mitra}
                  />
                  <Text style={styles.privacyText}>
                    Your health information deserves care.
                  </Text>
                </View>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  What can I help with?
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Choose a starting point
                </Text>
              </View>

              <View style={styles.suggestionsGrid}>
                {SUGGESTED_QUESTIONS.map((item) => (
                  <Pressable
                    key={item.title}
                    style={({ pressed }) => [
                      styles.suggestionCard,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => startSuggestedQuestion(item.title)}
                  >
                    <View style={styles.suggestionIcon}>
                      <Ionicons
                        name={item.icon}
                        size={21}
                        color={COLORS.mitra}
                      />
                    </View>

                    <Text style={styles.suggestionTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.suggestionSubtitle}>
                      {item.subtitle}
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={17}
                      color={COLORS.textMuted}
                      style={styles.suggestionArrow}
                    />
                  </Pressable>
                ))}
              </View>

              <View style={styles.disclaimer}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.disclaimerText}>
                  Mitra is an assistant, not a substitute for professional
                  medical advice or emergency care.
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.messageList}>
              <Text style={styles.conversationLabel}>
                YOUR CONVERSATION
              </Text>

              {messages.map((message) => {
                const isPatient = message.sender === "patient";

                return (
                  <View
                    key={message.id}
                    style={[
                      styles.messageRow,
                      isPatient && styles.patientMessageRow,
                    ]}
                  >
                    {!isPatient && (
                      <View style={styles.messageAvatar}>
                        <Ionicons
                          name="sparkles"
                          size={15}
                          color={COLORS.mitra}
                        />
                      </View>
                    )}

                    <View
                      style={[
                        styles.messageBubble,
                        isPatient
                          ? styles.patientBubble
                          : styles.mitraBubble,
                      ]}
                    >
                      {!isPatient && (
                        <Text style={styles.messageSender}>Mitra</Text>
                      )}

                      <Text
                        style={[
                          styles.messageText,
                          isPatient && styles.patientMessageText,
                        ]}
                      >
                        {message.text}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>

                <View style={styles.composerContainer}>
          <View style={styles.composer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask Mitra anything..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.textInput}
              multiline
              maxLength={2000}
              returnKeyType="default"
              accessibilityLabel="Message Mitra"
            />

            <Pressable
              onPress={() => sendMessage()}
              disabled={!input.trim()}
              style={({ pressed }) => [
                styles.sendButton,
                !input.trim() && styles.sendButtonDisabled,
                pressed && styles.pressed,
              ]}
              accessibilityLabel="Send message"
            >
              <Ionicons
                name="arrow-up"
                size={23}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          <Text style={styles.composerFootnote}>
            Responses require connection to Mitra's AI service.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backButton: {
    width: 40,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerIdentity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: COLORS.mitraMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  headerSubtitle: {
    marginTop: 3,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  headerAction: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  conversation: {
    flex: 1,
  },
  conversationContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 24,
  },
  welcomeSection: {
    alignItems: "center",
    paddingTop: 13,
    paddingBottom: 29,
  },
  largeAvatar: {
    width: 78,
    height: 78,
    borderRadius: 27,
    backgroundColor: COLORS.mitraMuted,
    borderWidth: 1,
    borderColor: "#E7D9FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 19,
  },
  welcomeTitle: {
    color: COLORS.textPrimary,
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  welcomeDescription: {
    maxWidth: 330,
    marginTop: 11,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: COLORS.mitraMuted,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 17,
  },
  privacyText: {
    color: COLORS.mitra,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    marginTop: 5,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  suggestionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  suggestionCard: {
    width: "48%",
    flexGrow: 1,
    minWidth: 135,
    minHeight: 155,
    padding: 15,
    borderRadius: 19,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  suggestionIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: COLORS.mitraMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  suggestionTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  suggestionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
    paddingRight: 3,
  },
  suggestionArrow: {
    position: "absolute",
    right: 13,
    bottom: 13,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 22,
    padding: 14,
    borderRadius: 15,
    backgroundColor: COLORS.cardRaised,
  },
  disclaimerText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 17,
  },
  messageList: {
    gap: 19,
    paddingBottom: 20,
  },
  conversationLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
    marginBottom: 5,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 9,
    paddingRight: 18,
  },
  patientMessageRow: {
    justifyContent: "flex-end",
    paddingRight: 0,
    paddingLeft: 28,
  },
  messageAvatar: {
    width: 29,
    height: 29,
    borderRadius: 11,
    backgroundColor: COLORS.mitraMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  messageBubble: {
    maxWidth: "88%",
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  mitraBubble: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 5,
  },
  patientBubble: {
    backgroundColor: COLORS.mitra,
    borderBottomRightRadius: 5,
  },
  messageSender: {
    color: COLORS.mitra,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 6,
  },
  messageText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 21,
  },
  patientMessageText: {
    color: "#FFFFFF",
  },
  composerContainer: {
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 7,
  },
  composer: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.cardRaised,
    borderRadius: 19,
    paddingLeft: 16,
    paddingRight: 7,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 110,
    paddingTop: 10,
    paddingBottom: 9,
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  sendButton: {
    width: 41,
    height: 41,
    borderRadius: 14,
    backgroundColor: COLORS.mitra,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.75,
  },
  composerFootnote: {
    textAlign: "center",
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 9,
    marginBottom: 2,
  },
});
