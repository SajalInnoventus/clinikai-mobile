import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type GameCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const GAMES: GameCard[] = [
  {
    id: "health-memory",
    title: "Health Memory",
    description: "Test your memory with simple health-related cards.",
    icon: "🧠",
  },
  {
    id: "wellness-quiz",
    title: "Wellness Challenge",
    description: "Answer quick questions about healthy habits.",
    icon: "💡",
  },
  {
    id: "breathing",
    title: "Calm Breathing",
    description: "Take a short breathing break while you wait.",
    icon: "🌿",
  },
];

export default function HealthGamesScreen() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGamePress = (gameId: string) => {
    setSelectedGame(gameId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WHILE YOU WAIT</Text>
            <Text style={styles.title}>Health Games</Text>
          </View>

          <Pressable
            onPress={() => router.back()}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.introduction}>
            <Text style={styles.introductionTitle}>
              Make your wait a little better
            </Text>

            <Text style={styles.introductionText}>
              Take a short break, learn something useful, or simply relax while
              you wait for your consultation.
            </Text>
          </View>

          <View style={styles.gameList}>
            {GAMES.map((game) => {
              const isSelected = selectedGame === game.id;

              return (
                <Pressable
                  key={game.id}
                  onPress={() => handleGamePress(game.id)}
                  style={({ pressed }) => [
                    styles.gameCard,
                    isSelected && styles.gameCardSelected,
                    pressed && styles.cardPressed,
                  ]}
                >
                  <View style={styles.gameIcon}>
                    <Text style={styles.gameIconText}>{game.icon}</Text>
                  </View>

                  <View style={styles.gameInformation}>
                    <Text style={styles.gameTitle}>{game.title}</Text>

                    <Text style={styles.gameDescription}>
                      {game.description}
                    </Text>
                  </View>

                  <Text style={styles.gameArrow}>→</Text>
                </Pressable>
              );
            })}
          </View>

          {selectedGame && (
            <View style={styles.comingSoonCard}>
              <Text style={styles.comingSoonIcon}>🎮</Text>

              <Text style={styles.comingSoonTitle}>Game coming next</Text>

              <Text style={styles.comingSoonText}>
                The game experience will be added here. For now, choose another
                activity while you wait.
              </Text>

              <Pressable
                onPress={() => setSelectedGame(null)}
                style={styles.backToGamesButton}
              >
                <Text style={styles.backToGamesText}>View all games</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.footerMessage}>
            <Text style={styles.footerTitle}>
              Waiting doesn't have to feel long.
            </Text>

            <Text style={styles.footerText}>
              Explore, relax, and stay comfortable until it's your turn.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#1677FF",
  },

  title: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
  },

  closeButtonText: {
    fontSize: 25,
    lineHeight: 27,
    color: "#475569",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  introduction: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  introductionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#0F172A",
  },

  introductionText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },

  gameList: {
    gap: 12,
  },

  gameCard: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  gameCardSelected: {
    borderColor: "#1677FF",
  },

  cardPressed: {
    opacity: 0.75,
  },

  gameIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    marginRight: 14,
  },

  gameIconText: {
    fontSize: 25,
  },

  gameInformation: {
    flex: 1,
  },

  gameTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  gameDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
  },

  gameArrow: {
    marginLeft: 10,
    fontSize: 20,
    color: "#1677FF",
  },

  comingSoonCard: {
    marginTop: 20,
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  comingSoonIcon: {
    fontSize: 32,
    marginBottom: 10,
  },

  comingSoonTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  comingSoonText: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: "#64748B",
  },

  backToGamesButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
  },

  backToGamesText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1677FF",
  },

  footerMessage: {
    marginTop: 28,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F0FDF4",
  },

  footerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#166534",
  },

  footerText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#166534",
  },
});
