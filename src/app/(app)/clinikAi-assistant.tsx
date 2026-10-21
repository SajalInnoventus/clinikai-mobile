import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatMessage = {
  id: string;
  text: string;
  sender: "mitra" | "patient";
  time: string;
};

const SUGGESTED_QUESTIONS = [
  {
    icon: "medkit-outline" as const,
    title: "My medicines",
    prompt: "Help me understand my medicines.",
  },
  {
    icon: "document-text-outline" as const,
    title: "Health records",
    prompt: "Help me understand my health records.",
  },
  {
    icon: "heart-outline" as const,
    title: "Health questions",
    prompt: "I have a general health question.",
  },
  {
    icon: "calendar-outline" as const,
    title: "My next visit",
    prompt: "Help me prepare for my next doctor visit.",
  },
];

export default function ClinikAIAssistantScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage) return;

    const patientMessage: ChatMessage = {
      id: `${Date.now()}-patient`,
      text: trimmedMessage,
      sender: "patient",
      time: "Now",
    };

    setMessages((current) => [...current, patientMessage]);
    setMessage("");
       setTimeout(() => {
      const mitraMessage: ChatMessage = {
        id: `${Date.now()}-mitra`,
        text:
          "I'm here to help. I don't have access to a verified answer from your medical records in this version. You can share more context, or discuss personal medical decisions with your doctor.",
        sender: "mitra",
        time: "Now",
      };
      setMessages((current) => [...current, mitraMessage]);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
                <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={23} color="#172B4D" />
          </Pressable>

          <View style={styles.mitraAvatar}>
            <Ionicons name="sparkles" size={23} color="#FFFFFF" />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Mitra</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Your ClinikAI assistant</Text>
            </View>
          </View>

          <Pressable
            style={styles.moreButton}
            accessibilityRole="button"
            accessibilityLabel="More options"
            onPress={() => {
              setMessages([]);
              setMessage("");
            }}
          >
            <Ionicons name="refresh-outline" size={21} color="#172B4D" />
          </Pressable>
        </View>

                <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 ? (
            <View style={styles.welcomeContainer}>
              <View style={styles.heroAvatar}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={35}
                  color="#FFFFFF"
                />
                <View style={styles.heroSparkle}>
                  <Ionicons name="sparkles" size={15} color="#FFFFFF" />
                </View>
              </View>

              <Text style={styles.welcomeTitle}>
                Hello! I'm Mitra
              </Text>

              <Text style={styles.welcomeSubtitle}>
                Your health companion, here to help you understand your health
                information and prepare for conversations with your doctor.
              </Text>

              <View style={styles.disclaimerCard}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#087F8C"
                />
                <Text style={styles.disclaimerText}>
                  Your health matters. Mitra provides health information, not
                  a medical diagnosis or emergency service.
                </Text>
              </View>

              <Text style={styles.suggestionsTitle}>
                What can I help you with?
              </Text>

              <View style={styles.suggestionsGrid}>
                {SUGGESTED_QUESTIONS.map((item) => (
                  <Pressable
                    key={item.title}
                    style={({ pressed }) => [
                      styles.suggestionCard,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => sendMessage(item.prompt)}
                    accessibilityRole="button"
                  >
                    <View style={styles.suggestionIcon}>
                      <Ionicons
                        name={item.icon}
                        size={21}
                        color="#087F8C"
                      />
                    </View>

                    <Text style={styles.suggestionTitle}>
                      {item.title}
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={17}
                      color="#718096"
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.messageList}>
              {messages.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.messageRow,
                    item.sender === "patient" && styles.patientMessageRow,
                  ]}
                >
                  {item.sender === "mitra" && (
                    <View style={styles.smallMitraAvatar}>
                      <Ionicons
                        name="sparkles"
                        size={15}
                        color="#FFFFFF"
                      />
                    </View>
                  )}

                  <View
                    style={[
                      styles.messageBubble,
                      item.sender === "patient"
                        ? styles.patientBubble
                        : styles.mitraBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        item.sender === "patient" &&
                          styles.patientMessageText,
                      ]}
                    >
                      {item.text}
                    </Text>
                    <Text
                      style={[
                        styles.messageTime,
                        item.sender === "patient" &&
                          styles.patientMessageTime,
                      ]}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.composerSection}>
          <Text style={styles.inputDisclaimer}>
            Mitra can make mistakes. Verify important medical information.
          </Text>

          <View style={styles.composer}>
            <Pressable
              style={styles.attachButton}
              accessibilityRole="button"
              accessibilityLabel="Attach a document"
              onPress={() => {
                
              }}
            >
              <Ionicons
                name="attach-outline"
                size={23}
                color="#64748B"
              />
            </Pressable>

            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Ask Mitra anything..."
              placeholderTextColor="#94A3B8"
              multiline
              maxLength={2000}
              returnKeyType="default"
              accessibilityLabel="Message Mitra"
            />

            <Pressable
              style={[
                styles.sendButton,
                !message.trim() && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage()}
              disabled={!message.trim()}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Ionicons name="arrow-up" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  container: {
    flex: 1,
  },
  header: {
    minHeight: 76,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF3",
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 40,
    justifyContent: "center",
  },
  mitraAvatar: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#087F8C",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172B4D",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
  },
  statusText: {
    fontSize: 12,
    color: "#64748B",
  },
  moreButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6F9",
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 24,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 18,
  },
  heroAvatar: {
    width: 78,
    height: 78,
    borderRadius: 27,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#087F8C",
    marginBottom: 22,
  },
  heroSparkle: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#4B91D1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#F7F9FC",
  },
  welcomeTitle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "800",
    color: "#172B4D",
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    color: "#64748B",
    marginTop: 10,
    marginBottom: 22,
    paddingHorizontal: 4,
  },
  disclaimerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
    backgroundColor: "#E8F6F5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 28,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: "#285B64",
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 13,
  },
  suggestionsGrid: {
    gap: 10,
  },
  suggestionCard: {
    minHeight: 67,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EAF1",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F6F5",
  },
  suggestionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#263B53",
  },
  pressed: {
    opacity: 0.75,
  },
  messageList: {
    gap: 18,
    paddingTop: 8,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  patientMessageRow: {
    justifyContent: "flex-end",
  },
  smallMitraAvatar: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: "#087F8C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: "84%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
  },
  mitraBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EAF0",
    borderBottomLeftRadius: 5,
  },
  patientBubble: {
    backgroundColor: "#087F8C",
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#263B53",
  },
  patientMessageText: {
    color: "#FFFFFF",
  },
  messageTime: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 7,
    textAlign: "right",
  },
  patientMessageTime: {
    color: "#D2F0F0",
  },
  composerSection: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EDF3",
  },
  inputDisclaimer: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    color: "#94A3B8",
    marginBottom: 9,
  },
  composer: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE5ED",
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 5,
  },
  attachButton: {
    width: 37,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  messageInput: {
    flex: 1,
    maxHeight: 110,
    minHeight: 40,
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 4,
    fontSize: 14,
    lineHeight: 20,
    color: "#172B4D",
  },
  sendButton: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: "#087F8C",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#A8C9CC",
  },
});
