import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: string;
  action: string;
};

const AMENITIES: Amenity[] = [
  {
    id: "refreshments",
    name: "Tea & Coffee",
    description: "Order a tea or coffee while you wait.",
    icon: "☕",
    action: "Order",
  },
  {
    id: "washroom",
    name: "Washroom",
    description: "Find the nearest available washroom.",
    icon: "🚻",
    action: "View",
  },
  {
    id: "water",
    name: "Drinking Water",
    description: "Find a drinking water station.",
    icon: "💧",
    action: "View",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Locate the clinic pharmacy.",
    icon: "💊",
    action: "View",
  },
];

export default function AmenitiesScreen() {
  const handleAmenityPress = (amenity: Amenity) => {
       console.log(`Selected amenity: ${amenity.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WHILE YOU WAIT</Text>
            <Text style={styles.title}>Amenities</Text>
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
              Make yourself comfortable
            </Text>

            <Text style={styles.introductionText}>
              Find useful clinic facilities and services available while you
              wait for your consultation.
            </Text>
          </View>

          <View style={styles.currentVisitCard}>
            <View style={styles.visitStatusDot} />

            <View style={styles.visitInformation}>
              <Text style={styles.visitLabel}>CURRENT VISIT</Text>

              <Text style={styles.clinicName}>ClinikAI Care Centre</Text>

              <Text style={styles.visitStatus}>
                You are currently waiting for your consultation.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Available at the clinic</Text>

          <View style={styles.amenitiesList}>
            {AMENITIES.map((amenity) => (
              <Pressable
                key={amenity.id}
                onPress={() => handleAmenityPress(amenity)}
                style={({ pressed }) => [
                  styles.amenityCard,
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={styles.amenityIcon}>
                  <Text style={styles.amenityIconText}>{amenity.icon}</Text>
                </View>

                <View style={styles.amenityInformation}>
                  <Text style={styles.amenityName}>{amenity.name}</Text>

                  <Text style={styles.amenityDescription}>
                    {amenity.description}
                  </Text>
                </View>

                <View style={styles.actionButton}>
                  <Text style={styles.actionText}>{amenity.action}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.helpCard}>
            <Text style={styles.helpIcon}>ℹ️</Text>

            <View style={styles.helpInformation}>
              <Text style={styles.helpTitle}>Need help?</Text>

              <Text style={styles.helpText}>
                Ask the clinic reception team if you need assistance finding any
                facility.
              </Text>
            </View>
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
    paddingBottom: 20,
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

  currentVisitCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    marginBottom: 24,
  },

  visitStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A34A",
    marginTop: 5,
    marginRight: 12,
  },

  visitInformation: {
    flex: 1,
  },

  visitLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#1677FF",
  },

  clinicName: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  visitStatus: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 17,
    color: "#475569",
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  amenitiesList: {
    gap: 12,
  },

  amenityCard: {
    minHeight: 86,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardPressed: {
    opacity: 0.75,
  },

  amenityIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    marginRight: 13,
  },

  amenityIconText: {
    fontSize: 23,
  },

  amenityInformation: {
    flex: 1,
  },

  amenityName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  amenityDescription: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: "#64748B",
  },

  actionButton: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: "#EFF6FF",
  },

  actionText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1677FF",
  },

  helpCard: {
    flexDirection: "row",
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  helpIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  helpInformation: {
    flex: 1,
  },

  helpTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  helpText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 17,
    color: "#64748B",
  },
});
