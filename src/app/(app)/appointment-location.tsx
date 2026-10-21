import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useClinikaiTheme } from "@/features/theme/theme.context";

const popularLocations = [
  "Noida",
  "Greater Noida",
  "Delhi",
  "Ghaziabad",
  "Gurugram",
];

export default function AppointmentLocationScreen() {
  const { palette } = useClinikaiTheme();
  const { issue } = useLocalSearchParams<{ issue?: string }>();

  const [location, setLocation] = useState("");

  function handleContinue() {
    const selectedLocation = location.trim();

    if (!selectedLocation) {
      return;
    }

    router.push({
      pathname: "./find-clinic",
      params: {
        issue: issue ?? "",
        location: selectedLocation,
      },
    });
  }

  function selectLocation(value: string) {
    setLocation(value);
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: palette.background },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={palette.textPrimary}
            />
          </Pressable>

          <Text
            style={[
              styles.headerTitle,
              { color: palette.textPrimary },
            ]}
          >
            Location
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressRow}>
          <View
            style={[
              styles.progressActive,
              { backgroundColor: palette.azure },
            ]}
          />
          <View
            style={[
              styles.progressActive,
              { backgroundColor: palette.azure },
            ]}
          />
          <View
            style={[
              styles.progressActive,
              { backgroundColor: palette.azure },
            ]}
          />
          <View
            style={[
              styles.progressInactive,
              { backgroundColor: palette.border },
            ]}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Ionicons
              name="location-outline"
              size={30}
              color={palette.azure}
            />
          </View>

          <Text
            style={[
              styles.title,
              { color: palette.textPrimary },
            ]}
          >
            Where would you like to visit?
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: palette.textSecondary },
            ]}
          >
            Enter your location so we can find nearby clinics and hospitals.
          </Text>

          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={20}
              color={palette.textMuted}
            />

            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Enter city or area"
              placeholderTextColor={palette.textMuted}
              style={[
                styles.searchInput,
                { color: palette.textPrimary },
              ]}
              autoCapitalize="words"
              returnKeyType="done"
            />

            {location.length > 0 && (
              <Pressable
                onPress={() => setLocation("")}
                accessibilityRole="button"
                accessibilityLabel="Clear location"
              >
                <Ionicons
                  name="close-circle"
                  size={19}
                  color={palette.textMuted}
                />
              </Pressable>
            )}
          </View>

          <Pressable
            style={[
              styles.currentLocationButton,
              { borderColor: palette.border },
            ]}
            onPress={() => setLocation("Current Location")}
          >
            <View
              style={[
                styles.currentLocationIcon,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Ionicons
                name="navigate-outline"
                size={19}
                color={palette.azure}
              />
            </View>

            <View style={styles.currentLocationContent}>
              <Text
                style={[
                  styles.currentLocationTitle,
                  { color: palette.textPrimary },
                ]}
              >
                Use current location
              </Text>

              <Text
                style={[
                  styles.currentLocationSubtitle,
                  { color: palette.textSecondary },
                ]}
              >
                Find clinics near you
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={palette.textMuted}
            />
          </Pressable>

          <Text
            style={[
              styles.sectionTitle,
              { color: palette.textPrimary },
            ]}
          >
            Popular locations
          </Text>

          <View style={styles.locationList}>
            {popularLocations.map((item) => {
              const selected = location === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => selectLocation(item)}
                  style={[
                    styles.locationItem,
                    {
                      backgroundColor: palette.card,
                      borderColor: selected
                        ? palette.azure
                        : palette.border,
                    },
                    selected && {
                      backgroundColor: palette.azureMuted,
                    },
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={
                      selected
                        ? palette.azure
                        : palette.textSecondary
                    }
                  />

                  <Text
                    style={[
                      styles.locationText,
                      {
                        color: selected
                          ? palette.azure
                          : palette.textPrimary,
                      },
                    ]}
                  >
                    {item}
                  </Text>

                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={19}
                      color={palette.azure}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>

          {issue ? (
            <View
              style={[
                styles.issueSummary,
                {
                  backgroundColor: palette.cardRaised,
                },
              ]}
            >
              <Text
                style={[
                  styles.issueSummaryLabel,
                  { color: palette.textSecondary },
                ]}
              >
                Appointment reason
              </Text>

              <Text
                style={[
                  styles.issueSummaryValue,
                  { color: palette.textPrimary },
                ]}
              >
                {issue}
              </Text>
            </View>
          ) : null}
        </ScrollView>

        <View
          style={[
            styles.footer,
            { backgroundColor: palette.background },
          ]}
        >
          <Pressable
            onPress={handleContinue}
            disabled={!location.trim()}
            style={[
              styles.continueButton,
              {
                backgroundColor: location.trim()
                  ? palette.azure
                  : palette.cardRaised,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color: location.trim()
                    ? palette.onAzure
                    : palette.textMuted,
                },
              ]}
            >
              Find Clinics
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={
                location.trim()
                  ? palette.onAzure
                  : palette.textMuted
              }
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
  },
  progressRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  progressActive: {
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  progressInactive: {
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  searchContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
  },
  currentLocationButton: {
    minHeight: 70,
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 12,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  currentLocationContent: {
    flex: 1,
  },
  currentLocationTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
  },
  currentLocationSubtitle: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 10,
  },
  locationList: {
    gap: 9,
  },
  locationItem: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },
  issueSummary: {
    borderRadius: 14,
    padding: 14,
    marginTop: 22,
  },
  issueSummaryLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  issueSummaryValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 14,
  },
  continueButton: {
    height: 52,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  continueText: {
    fontSize: 15,
    fontWeight: "700",
  },
});