
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useClinikaiTheme } from "@/features/theme/theme.context";

type TabItem = {
  label: string;
  route: string;
  icon: string;
};

const tabs: TabItem[] = [
  { label: "Home", route: "/(app)/home", icon: "home" },
  { label: "Symptoms", route: "/(app)/medical-issue", icon: "stethoscope" },
  { label: "Medication", route: "/(app)/medications", icon: "pill" },
  { label: "Visits", route: "/(app)/appointment-status", icon: "calendar-month-outline" },
];

export default function AppBottomNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { palette } = useClinikaiTheme();

  const isActive = (route: string) => pathname === route;

  return (
    <View
      style={[
        styles.navigation,
        {
          bottom: Math.max(insets.bottom + 8, 8),
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      {tabs.slice(0, 2).map((tab) => (
        <NavigationTab
          key={tab.label}
          tab={tab}
          active={isActive(tab.route)}
          palette={palette}
        />
      ))}

      <Pressable
        style={styles.emergencyTab}
        onPress={() => router.push("/(app)/queue" as never)}
        accessibilityRole="button"
        accessibilityLabel="Emergency"
      >
        <View style={[styles.emergencyCircle, { backgroundColor: palette.critical }]}>
          <Ionicons name="warning" size={25} color="#FFFFFF" />
        </View>
        <Text style={[styles.emergencyText, { color: palette.critical }]}>
          Emergency
        </Text>
      </Pressable>

      {tabs.slice(2).map((tab) => (
        <NavigationTab
          key={tab.label}
          tab={tab}
          active={isActive(tab.route)}
          palette={palette}
        />
      ))}
    </View>
  );
}

function NavigationTab({
  tab,
  active,
  palette,
}: {
  tab: TabItem;
  active: boolean;
  palette: ReturnType<typeof useClinikaiTheme>["palette"];
}) {
  return (
    <Pressable
      style={styles.tab}
      onPress={() => router.push(tab.route as never)}
      accessibilityRole="button"
      accessibilityLabel={tab.label}
      accessibilityState={{ selected: active }}
    >
      <MaterialCommunityIcons
        name={tab.icon as never}
        size={23}
        color={active ? palette.azure : "#64748B"}
      />
      <Text
        style={[
          styles.tabText,
          { color: active ? palette.azure : "#64748B" },
          active && styles.activeText,
        ]}
      >
        {tab.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  navigation: {
    position: "absolute",
    left: 10,
    right: 10,
    height: 78,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 3,
    zIndex: 10,
    elevation: 8,
  },
  tab: {
    flex: 1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabText: {
    fontSize: 10,
    fontWeight: "500",
  },
  activeText: {
    fontWeight: "800",
  },
  emergencyTab: {
    flex: 1.15,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  emergencyCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyText: {
    fontSize: 9,
    fontWeight: "800",
  },
});