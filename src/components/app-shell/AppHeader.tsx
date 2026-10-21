import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { usePatient } from "@/features/patient/patient.context";
import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function AppHeader() {
  const { profile } = usePatient();
  const { palette } = useClinikaiTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const firstInitial = profile.fullName.trim().charAt(0).toUpperCase() || "P";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.background,
          borderBottomColor: palette.border,
        },
      ]}
    >
      <View style={styles.headerTopRow}>
        <View style={styles.brandBlock}>
          <Text style={[styles.brand, { color: palette.azure }]}>
            ClinikAI OS
          </Text>
          <Text style={[styles.tagline, { color: palette.textSecondary }]}>
            Your health, understood.
          </Text>
        </View>

        <Pressable
          style={[
            styles.profileButton,
            { backgroundColor: palette.azureMuted },
          ]}
          onPress={() => router.push("/(app)/profile" as never)}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
        >
          <View
            style={[
              styles.profileAvatar,
              { backgroundColor: palette.azure },
            ]}
          >
            <Text style={[styles.profileInitial, { color: palette.onAzure }]}>
              {firstInitial}
            </Text>
          </View>
        </Pressable>
      </View>

      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: palette.card,
            borderColor: palette.border,
          },
        ]}
      >
        <Ionicons name="search-outline" size={19} color={palette.textMuted} />

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search your health, visits, medicines..."
          placeholderTextColor={palette.textMuted}
          style={[styles.searchInput, { color: palette.textPrimary }]}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search health information"
        />

        {searchQuery.length > 0 && (
          <Pressable
            onPress={() => setSearchQuery("")}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={palette.textMuted}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandBlock: {
    flex: 1,
    minWidth: 0,
  },
  brand: {
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  tagline: {
    marginTop: 2,
    fontSize: 12,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    fontSize: 15,
    fontWeight: "800",
  },
  searchBar: {
    height: 48,
    marginTop: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    marginLeft: 9,
    paddingVertical: 0,
    fontSize: 13,
  },
});