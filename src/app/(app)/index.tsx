import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useClinikaiTheme } from "@/features/theme/theme.context";
import type { ClinikaiPalette } from "@/constants/clinikai-theme";
import { usePatient } from "@/features/patient/patient.context";

export default function PatientDashboardScreen() {
  const { profile } = usePatient();
  const { palette } = useClinikaiTheme();
  const insets = useSafeAreaInsets();
  const firstName = profile.fullName.trim().split(" ")[0] || "Patient";
  const initial = profile.fullName.trim().charAt(0).toUpperCase() || "P";
  const [searchQuery, setSearchQuery] = useState("");
  const styles = createStyles(palette);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerBrandBlock}>
              <Text style={styles.brand}>ClinikAI OS</Text>
              <Text style={styles.tagline}>Your health, understood.</Text>
            </View>

            <Pressable
              style={styles.profileButton}
              onPress={() => router.push("./profile" as never)}
              accessibilityRole="button"
              accessibilityLabel="Open profile"
            >
              <View style={styles.profileAvatar}>
                <Text style={styles.profileInitial}>{initial}</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={19} color={palette.textMuted} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search your health, visits, medicines..."
              placeholderTextColor={palette.textMuted}
              style={styles.searchInput}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery("")}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
              >
                <Ionicons name="close-circle" size={18} color={palette.textMuted} />
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.greetingSection}>
          <Text style={styles.goodMorning}>Good morning,</Text>

          <Text style={styles.patientName}>
            {firstName} <Text style={styles.wave}>👋</Text>
          </Text>

          <Text style={styles.greetingDescription}>
            Mitra is here to help you{"\n"}stay ahead of your health.
          </Text>

          <View style={styles.healthScore}>
            <View style={styles.healthScoreIcon}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={19}
                color={palette.azure}
              />
            </View>

            <Text style={styles.healthScoreLabel}>Health Score</Text>

            <Text style={styles.healthScoreValue}>82</Text>

            <Text style={styles.healthScoreTotal}>/100</Text>
          </View>
        </View>

        <Pressable
          style={styles.mitraHero}
          onPress={() => router.push("./mitra" as never)}
        >
          <View style={styles.mitraGlowLarge} />
          <View style={styles.mitraGlowSmall} />

          <View style={styles.mitraContent}>
            <View style={styles.mitraLabel}>
              <View style={styles.onlineDot} />
              <Text style={styles.mitraLabelText}>AI Mitra</Text>
            </View>

            <Text style={styles.mitraTitle}>
              I've reviewed your health{"\n"}data while you slept.
            </Text>

            <View style={styles.mitraButton}>
              <Text style={styles.mitraButtonText}>See what I found</Text>
              <Ionicons name="arrow-forward" size={18} color={palette.onAzure} />
            </View>
          </View>

          <View style={styles.robot}>
            <Image
              source={require("@/../assets/images/clinikai-ai-logo.png")}
              style={styles.aiLogoImage}
              resizeMode="contain"
            />
          </View>
        </Pressable>

        <View style={styles.quickActions}>
          <DashboardAction
            styles={styles}
            palette={palette}
            icon="calendar-month"
            title="Book"
            subtitle="Appointment"
            iconBackground={palette.mitraMuted}
            iconColor={palette.mitra}
            onPress={() => router.push("./appointment-issue" as never)}
          />

          <DashboardAction
            styles={styles}
            palette={palette}
            icon="folder-lock-outline"
            title="Health"
            subtitle="Locker"
            iconBackground={palette.successMuted}
            iconColor={palette.success}
            onPress={() => router.push("./medical-timeline" )}
          />

          <DashboardAction
            styles={styles}
            palette={palette}
            icon="bell-badge-outline"
            title="Medication"
            subtitle="Reminders"
            iconBackground={palette.warningMuted}
            iconColor={palette.warning}
            onPress={() => router.push("./medications" as never)}
          />

          <DashboardAction
            styles={styles}
            palette={palette}
            icon="file-document-outline"
            title="Recent"
            subtitle="Visits"
            iconBackground={palette.criticalMuted}
            iconColor={palette.critical}
            onPress={() => router.push("./visits" as never)}
          />
        </View>

        <View style={styles.twoColumnSection}>
          <UpcomingAppointment styles={styles} palette={palette} />
          <ProactiveInsight styles={styles} palette={palette} />
        </View>

        <View style={styles.reportCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Health Report Card</Text>

            <Pressable>
              <Text style={styles.viewReport}>View full report →</Text>
            </Pressable>
          </View>

          <View style={styles.reportContent}>
            <View style={styles.healthCircle}>
              <View style={styles.healthCircleInner}>
                <Text style={styles.healthNumber}>78</Text>
                <Text style={styles.healthOutOf}>/100</Text>
                <Text style={styles.healthGood}>Good</Text>
              </View>
            </View>

            <View style={styles.healthRows}>
              <HealthRow
                styles={styles}
                icon="heart-pulse"
                label="Vitals"
                status="Good"
                color={palette.success}
              />
              <HealthRow
                styles={styles}
                icon="pill"
                label="Meds"
                status="On Track"
                color={palette.success}
              />
              <HealthRow
                styles={styles}
                icon="run"
                label="Lifestyle"
                status="Improving"
                color={palette.warning}
              />
              <HealthRow
                styles={styles}
                icon="alert-circle-outline"
                label="Risks"
                status="Low"
                color={palette.success}
              />
              <HealthRow
                styles={styles}
                icon="flask-outline"
                label="Labs"
                status="Normal"
                color={palette.success}
              />
            </View>
          </View>
        </View>

        <View style={styles.explainCard}>
          <View style={styles.explainIcon}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color={palette.mitra}
            />
          </View>

          <Text style={styles.explainTitle}>Explain this</Text>

          <Text style={styles.explainText}>
            Understand any prescription,{"\n"}lab result or health term.
          </Text>

          <Pressable
            style={styles.explainButton}
            onPress={() => router.push("./mitra" as never)}
          >
            <Text style={styles.explainButtonText}>Try it now</Text>
            <Ionicons name="arrow-forward" size={16} color={palette.azure} />
          </Pressable>
        </View>

        <View style={styles.featureGrid}>
          <FeatureCard
            styles={styles}
            icon="stethoscope"
            title="AI Symptom Triage"
            description="Tell us how you feel. We'll suggest possible causes & the right specialist."
            button="Check now"
            color={palette.success}
            background={palette.successMuted}
          />

          <FeatureCard
            styles={styles}
            icon="pill"
            title="Medication Coach"
            description="Smart reminders, adherence tracking & habit nudges."
            button="Open coach"
            color={palette.warning}
            background={palette.warningMuted}
          />

          <FeatureCard
            styles={styles}
            icon="trophy-outline"
            title="Rewards"
            description="Earn points for healthy habits & unlock exciting rewards."
            button="1,240 pts"
            color={palette.mitra}
            background={palette.mitraMuted}
          />

          <FeatureCard
            styles={styles}
            icon="file-document-outline"
            title="Auto Clinical Notes"
            description="AI generates clinical notes from your visit instantly."
            button="View notes"
            color={palette.azure}
            background={palette.azureMuted}
          />
        </View>

        <View style={styles.copilotCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.copilotTitle}>Chronic Condition Copilot</Text>
              <Text style={styles.copilotSubtitle}>
                Track trends. Stay in control.
              </Text>
            </View>

            <View style={styles.rangeSelector}>
              <Text style={styles.rangeText}>7D</Text>
              <Text style={[styles.rangeText, styles.rangeActive]}>30D</Text>
              <Text style={styles.rangeText}>90D</Text>
            </View>
          </View>

          <ConditionRow
            styles={styles}
            palette={palette}
            icon="water"
            title="Diabetes"
            status="Stable"
            color={palette.azure}
          />

          <ConditionRow
            styles={styles}
            palette={palette}
            icon="heart"
            title="Hypertension"
            status="Improving"
            color={palette.critical}
          />

          <ConditionRow
            styles={styles}
            palette={palette}
            icon="butterfly-outline"
            title="Thyroid"
            status="Stable"
            color={palette.mitra}
          />

          
<View style={styles.trendChart}>
  <View style={styles.trendHeader}>
    <View>
      <Text style={styles.trendTitle}>Health trends</Text>
      <Text style={styles.trendSubtitle}>Your recent progress</Text>
    </View>

    <View style={styles.trendLegend}>
      <View
        style={[
          styles.trendLegendDot,
          { backgroundColor: palette.mitra },
        ]}
      />
      <Text style={styles.trendLegendText}>30 days</Text>
    </View>
  </View>

  <View style={styles.trendPlot}>
    {[0, 1, 2].map((item) => (
      <View
        key={`guide-${item}`}
        style={[
          styles.trendGuideLine,
          { top: item * 25 },
        ]}
      />
    ))}

    <View style={styles.trendBars}>
      {[32, 45, 38, 56, 42, 62, 49, 70, 55, 76, 64, 84].map(
        (height, index) => (
          <View
            key={`bar-${index}`}
            style={[
              styles.trendBar,
              {
                height,
                backgroundColor:
                  index === 11 ? palette.mitra : palette.azureMuted,
              },
            ]}
          />
        ),
      )}
    </View>
  </View>

  <View style={styles.trendLabels}>
    <Text style={styles.trendAxisLabel}>30 days ago</Text>
    <Text style={styles.trendAxisLabel}>Today</Text>
  </View>
</View>


        <View style={styles.mitraNote}>
          <Text style={styles.mitraNoteTitle}>Mitra Note</Text>

          <Text style={styles.mitraNoteText}>
            Your sleep quality was good, but late dinners may affect your
            sugar levels.
          </Text>

          <Pressable
            style={styles.askMitraButton}
            onPress={() => router.push("./mitra" as never)}
          >
            <Text style={styles.askMitraText}>Ask Mitra</Text>
            <Ionicons name="arrow-forward" size={16} color={palette.onAzure} />
          </Pressable>
        </View>
        </View>
      </ScrollView>
      

      <Pressable
        style={[styles.floatingAiButton, { bottom: insets.bottom + 92 }]}
        onPress={() => router.push("./mitra" as never)}
        accessibilityRole="button"
        accessibilityLabel="Open Mitra AI assistant"
      >
        <Image
          source={require("@/../assets/images/clinikai-ai-logo.png")}
          style={styles.floatingAiLogo}
          resizeMode="contain"
        />
      </Pressable>

      <View style={[styles.bottomNavigation, { bottom: Math.max(insets.bottom + 8, 8) }]}>
        <BottomTab styles={styles} palette={palette} icon="home" label="Home" active />

        <BottomTab
          styles={styles}
          palette={palette}
          icon="stethoscope"
          label="Symptoms"
          onPress={() => router.push("./symptoms" as never)}
        />

        <Pressable
          style={styles.emergencyTab}
          onPress={() => router.push("./emergency" as never)}
          accessibilityRole="button"
          accessibilityLabel="Emergency alert"
        >
          <View style={styles.emergencyTabCircle}>
            <Ionicons name="warning" size={27} color={palette.onAzure} />
          </View>
          <Text style={styles.emergencyTabText}>Emergency</Text>
        </Pressable>

        <BottomTab
          styles={styles}
          palette={palette}
          icon="pill"
          label="Medication"
          onPress={() => router.push("./medications" as never)}
        />

        <BottomTab
          styles={styles}
          palette={palette}
          icon="calendar-month-outline"
          label="Visits"
          onPress={() => router.push("./visits" as never)}
        />
      </View>
    </SafeAreaView>
  );
}

type HomeStyles = ReturnType<typeof createStyles>;

function DashboardAction({
  styles,
  palette,
  icon,
  title,
  subtitle,
  iconBackground,
  iconColor,
  onPress,
}: {
  styles: HomeStyles;
  palette: ClinikaiPalette;
  icon: string;
  title: string;
  subtitle: string;
  iconBackground: string;
  iconColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: iconBackground }]}>
        <MaterialCommunityIcons
          name={icon as never}
          size={23}
          color={iconColor}
        />
      </View>

      <View style={styles.actionArrow}>
        <Ionicons name="chevron-forward" size={14} color={palette.azure} />
      </View>

      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

function UpcomingAppointment({ styles, palette }: { styles: HomeStyles; palette: ClinikaiPalette }) {
  return (
    <View style={styles.appointmentCard}>
      <View style={styles.cardHeadingRow}>
        <Text style={styles.appointmentTitle}>Upcoming Appointment</Text>

        <Ionicons name="ellipsis-horizontal" size={20} color={palette.azure} />
      </View>

      <View style={styles.appointmentInfo}>
        <View style={styles.dateBox}>
          <Text style={styles.dateMonth}>MAY</Text>
          <Text style={styles.dateNumber}>24</Text>
          <Text style={styles.dateDay}>FRI</Text>
        </View>

        <View style={styles.doctorInfo}>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={16} color={palette.mitra} />
            <Text style={styles.timeText}>Tomorrow • 4:30 PM</Text>
          </View>

          <Text style={styles.doctorName}>Dr. Priyanka Sharma</Text>
          <Text style={styles.doctorSpeciality}>General Physician</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={palette.textSecondary} />
            <Text style={styles.locationText}>
              ClinikAI Care Center, Noida
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.appointmentButtons}>
        <Pressable
          style={styles.checkInButton}
          onPress={() => router.push("./queue" as never)}
        >
          <Text style={styles.checkInText}>Check-in now</Text>
        </Pressable>

        <Pressable style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={20} color={palette.azure} />
        </Pressable>
      </View>
    </View>
  );
}

function ProactiveInsight({ styles, palette }: { styles: HomeStyles; palette: ClinikaiPalette }) {
  return (
    <View style={styles.insightCard}>
      <View style={styles.cardHeadingRow}>
        <Text style={styles.insightTitle}>Proactive Insight</Text>

        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      </View>

      <View style={styles.insightBody}>
        <View style={styles.heartIcon}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={26}
            color={palette.success}
          />
        </View>

        <View style={styles.insightTextContainer}>
          <Text style={styles.insightMainText}>
            Your resting heart rate{"\n"}has improved 6% this week.
          </Text>

          <Text style={styles.insightSubText}>
            Great progress! Keep it up.
          </Text>

          <Pressable>
            <Text style={styles.insightLink}>View insight →</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.insightChart}>
        {[28, 42, 35, 48, 37, 54, 43, 61, 52, 70].map((height, index) => (
          <View
            key={index}
            style={[
              styles.chartBar,
              {
                height,
                backgroundColor: index % 2 === 0 ? palette.successMuted : palette.success,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function HealthRow({
  styles,
  icon,
  label,
  status,
  color,
}: {
  styles: HomeStyles;
  icon: string;
  label: string;
  status: string;
  color: string;
}) {
  return (
    <View style={styles.healthRow}>
      <MaterialCommunityIcons name={icon as never} size={15} color={color} />
      <Text style={styles.healthRowLabel}>{label}</Text>
      <Text style={[styles.healthRowStatus, { color }]}>{status}</Text>
    </View>
  );
}

function FeatureCard({
  styles,
  icon,
  title,
  description,
  button,
  color,
  background,
}: {
  styles: HomeStyles;
  icon: string;
  title: string;
  description: string;
  button: string;
  color: string;
  background: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIcon, { backgroundColor: background }]}>
        <MaterialCommunityIcons
          name={icon as never}
          size={30}
          color={color}
        />
      </View>

      <Text style={styles.featureTitle}>{title}</Text>

      <Text style={styles.featureDescription}>{description}</Text>

      <Pressable
        style={[
          styles.featureButton,
          { borderColor: `${color}35`, backgroundColor: `${color}08` },
        ]}
      >
        <Text style={[styles.featureButtonText, { color }]}>{button}</Text>
        <Ionicons name="arrow-forward" size={14} color={color} />
      </Pressable>
    </View>
  );
}

function ConditionRow({
  styles,
  palette,
  icon,
  title,
  status,
  color,
}: {
  styles: HomeStyles;
  palette: ClinikaiPalette;
  icon: string;
  title: string;
  status: string;
  color: string;
}) {
  return (
    <View style={styles.conditionRow}>
      <View style={[styles.conditionIcon, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons
          name={icon as never}
          size={17}
          color={color}
        />
      </View>

      <Text style={styles.conditionTitle}>{title}</Text>

      <View style={styles.conditionStatus}>
        <View style={[styles.statusDot, { backgroundColor: palette.success }]} />
        <Text style={styles.conditionStatusText}>{status}</Text>
      </View>
    </View>
  );
}

function BottomTab({
  styles,
  palette,
  icon,
  label,
  active,
  onPress,
}: {
  styles: HomeStyles;
  palette: ClinikaiPalette;
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.bottomTab} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon as never}
        size={23}
        color={active ? palette.azure : "#64748B"}
      />
      <Text
        style={[
          styles.bottomTabText,
          active && styles.bottomTabTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function createStyles(palette: ClinikaiPalette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },

    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 170,
    },

    headerTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    headerBrandBlock: {
      flex: 1,
      minWidth: 0,
    },

    profileButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: palette.azureMuted,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 12,
    },

    profileAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: palette.azure,
      alignItems: "center",
      justifyContent: "center",
    },

    profileInitial: {
      color: palette.onAzure,
      fontSize: 15,
      fontWeight: "800",
    },

    searchBar: {
      height: 48,
      marginTop: 14,
      paddingHorizontal: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.card,
      flexDirection: "row",
      alignItems: "center",
    },

    searchInput: {
      flex: 1,
      minWidth: 0,
      marginLeft: 9,
      paddingVertical: 0,
      fontSize: 13,
      color: palette.textPrimary,
    },

    header: {
      marginBottom: 22,
    },

    brand: {
      fontSize: 25,
      fontWeight: "800",
      color: palette.azure,
      letterSpacing: -0.8,
    },

    tagline: {
      marginTop: 2,
      fontSize: 12,
      color: palette.textSecondary,
    },

    settingsButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: palette.azureMuted,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: `${palette.azure}18`,
    },

    greetingSection: {
      marginBottom: 22,
    },

    goodMorning: {
      fontSize: 22,
      fontWeight: "700",
      color: palette.textPrimary,
      lineHeight: 29,
    },

    patientName: {
      fontSize: 42,
      lineHeight: 48,
      fontWeight: "800",
      color: palette.azure,
      letterSpacing: -1.2,
      marginTop: 1,
    },

    wave: {
      fontSize: 36,
    },

    greetingDescription: {
      marginTop: 13,
      fontSize: 15,
      lineHeight: 23,
      color: palette.textSecondary,
    },

    healthScore: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 18,
      paddingVertical: 8,
      paddingHorizontal: 11,
      borderRadius: 20,
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
    },

    healthScoreIcon: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: palette.azureMuted,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 7,
    },

    healthScoreLabel: {
      fontSize: 13,
      color: palette.textSecondary,
      fontWeight: "600",
    },

    healthScoreValue: {
      fontSize: 22,
      fontWeight: "800",
      color: palette.success,
      marginLeft: 14,
    },

    healthScoreTotal: {
      fontSize: 12,
      color: palette.textSecondary,
      marginLeft: 2,
    },

    mitraHero: {
      height: 300,
      borderRadius: 28,
      overflow: "hidden",
      backgroundColor: palette.azure,
      position: "relative",
      marginBottom: 18,
    },

    mitraGlowLarge: {
      position: "absolute",
      width: 360,
      height: 360,
      borderRadius: 180,
      backgroundColor: "#7A2454",
      right: -115,
      top: -110,
      opacity: 0.95,
    },

    mitraGlowSmall: {
      position: "absolute",
      width: 170,
      height: 170,
      borderRadius: 85,
      backgroundColor: "#68143B",
      left: -60,
      bottom: -65,
    },

    mitraContent: {
      position: "absolute",
      left: 24,
      top: 24,
      right: 20,
      zIndex: 3,
    },

    mitraLabel: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 9,
      paddingHorizontal: 15,
      borderRadius: 22,
      backgroundColor: palette.azureMuted,
    },

    onlineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: palette.mitra,
      marginRight: 8,
    },

    mitraLabelText: {
      color: palette.onAzure,
      fontSize: 16,
      fontWeight: "700",
    },

    mitraTitle: {
      marginTop: 43,
      fontSize: 25,
      lineHeight: 35,
      color: palette.onAzure,
      fontWeight: "600",
      maxWidth: 275,
    },

    mitraButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 24,
      paddingHorizontal: 19,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#5A0D31",
    },

    mitraButtonText: {
      color: palette.onAzure,
      fontSize: 14,
      fontWeight: "700",
    },

    robot: {
      position: "absolute",
      right: 18,
      bottom: 22,
      width: 145,
      height: 145,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },

    aiLogoImage: {
      width: 138,
      height: 138,
    },







    quickActions: {
      flexDirection: "row",
      gap: 9,
      marginBottom: 18,
    },

    actionCard: {
      flex: 1,
      minHeight: 145,
      backgroundColor: palette.card,
      borderRadius: 21,
      padding: 13,
      borderWidth: 1,
      borderColor: palette.border,
      position: "relative",
    },

    actionIcon: {
      width: 49,
      height: 49,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
    },

    actionArrow: {
      position: "absolute",
      top: 31,
      right: 10,
      width: 27,
      height: 27,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      alignItems: "center",
      justifyContent: "center",
    },

    actionTitle: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "700",
      color: palette.textPrimary,
    },

    actionSubtitle: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "700",
      color: palette.textPrimary,
    },

    twoColumnSection: {
      gap: 14,
    },

    appointmentCard: {
      backgroundColor: palette.card,
      borderRadius: 23,
      padding: 18,
      borderWidth: 1,
      borderColor: palette.border,
    },

    insightCard: {
      backgroundColor: palette.card,
      borderRadius: 23,
      padding: 18,
      borderWidth: 1,
      borderColor: palette.border,
    },

    cardHeadingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    appointmentTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: palette.azure,
    },

    appointmentInfo: {
      flexDirection: "row",
      marginTop: 20,
    },

    dateBox: {
      width: 74,
      height: 106,
      borderRadius: 16,
      backgroundColor: palette.azureMuted,
      borderWidth: 1,
      borderColor: palette.border,
      alignItems: "center",
      justifyContent: "center",
    },

    dateMonth: {
      fontSize: 12,
      fontWeight: "700",
      color: palette.mitra,
    },

    dateNumber: {
      fontSize: 34,
      lineHeight: 38,
      fontWeight: "800",
      color: palette.textPrimary,
    },

    dateDay: {
      fontSize: 11,
      fontWeight: "700",
      color: palette.textSecondary,
    },

    doctorInfo: {
      flex: 1,
      marginLeft: 13,
    },

    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    timeText: {
      fontSize: 13,
      color: palette.textPrimary,
      fontWeight: "600",
    },

    doctorName: {
      marginTop: 9,
      fontSize: 16,
      fontWeight: "800",
      color: palette.textPrimary,
    },

    doctorSpeciality: {
      marginTop: 3,
      fontSize: 13,
      color: palette.textSecondary,
    },

    locationRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 5,
      marginTop: 8,
    },

    locationText: {
      flex: 1,
      fontSize: 12,
      lineHeight: 17,
      color: palette.textSecondary,
    },

    appointmentButtons: {
      flexDirection: "row",
      gap: 10,
      marginTop: 17,
    },

    checkInButton: {
      flex: 1,
      height: 48,
      borderRadius: 13,
      backgroundColor: palette.azure,
      alignItems: "center",
      justifyContent: "center",
    },

    checkInText: {
      color: palette.onAzure,
      fontSize: 14,
      fontWeight: "700",
    },

    calendarButton: {
      width: 50,
      height: 48,
      borderRadius: 13,
      backgroundColor: palette.azureMuted,
      borderWidth: 1,
      borderColor: palette.border,
      alignItems: "center",
      justifyContent: "center",
    },

    insightTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: palette.success,
    },

    newBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      backgroundColor: palette.mitraMuted,
    },

    newBadgeText: {
      fontSize: 12,
      fontWeight: "700",
      color: palette.mitra,
    },

    insightBody: {
      flexDirection: "row",
      marginTop: 20,
    },

    heartIcon: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: palette.successMuted,
      alignItems: "center",
      justifyContent: "center",
    },

    insightTextContainer: {
      flex: 1,
      marginLeft: 12,
    },

    insightMainText: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "700",
      color: palette.textPrimary,
    },

    insightSubText: {
      marginTop: 5,
      fontSize: 12,
      color: palette.textSecondary,
    },

    insightLink: {
      marginTop: 12,
      fontSize: 13,
      color: palette.mitra,
      fontWeight: "700",
    },

    insightChart: {
      height: 65,
      marginTop: 10,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
    },

    chartBar: {
      width: 7,
      borderRadius: 5,
    },

    reportCard: {
      marginTop: 18,
      backgroundColor: palette.card,
      borderRadius: 23,
      padding: 18,
      borderWidth: 1,
      borderColor: palette.border,
    },

    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.mitra,
    },

    viewReport: {
      fontSize: 12,
      fontWeight: "700",
      color: palette.mitra,
    },

    reportContent: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 18,
    },

    healthCircle: {
      width: 135,
      height: 135,
      borderRadius: 68,
      borderWidth: 9,
      borderColor: "#E6DEFF",
      alignItems: "center",
      justifyContent: "center",
    },

    healthCircleInner: {
      alignItems: "center",
    },

    healthNumber: {
      fontSize: 31,
      fontWeight: "800",
      color: palette.textPrimary,
    },

    healthOutOf: {
      fontSize: 11,
      color: palette.textSecondary,
    },

    healthGood: {
      marginTop: 4,
      fontSize: 13,
      fontWeight: "700",
      color: palette.success,
    },

    healthRows: {
      flex: 1,
      marginLeft: 16,
      gap: 11,
    },

    healthRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    healthRowLabel: {
      flex: 1,
      marginLeft: 7,
      fontSize: 12,
      color: palette.textSecondary,
    },

    healthRowStatus: {
      fontSize: 11,
      fontWeight: "700",
    },

    explainCard: {
      marginTop: 18,
      backgroundColor: palette.mitraMuted,
      borderRadius: 23,
      padding: 20,
      borderWidth: 1,
      borderColor: palette.border,
    },

    explainIcon: {
      width: 45,
      height: 45,
      borderRadius: 15,
      backgroundColor: palette.card,
      alignItems: "center",
      justifyContent: "center",
    },

    explainTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight: "800",
      color: palette.mitra,
    },

    explainText: {
      marginTop: 7,
      fontSize: 13,
      lineHeight: 20,
      color: palette.textSecondary,
    },

    explainButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginTop: 14,
      paddingVertical: 9,
      paddingHorizontal: 14,
      borderRadius: 17,
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
    },

    explainButtonText: {
      fontSize: 12,
      fontWeight: "700",
      color: palette.azure,
    },

    featureGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 18,
    },

    featureCard: {
      width: "48%",
      backgroundColor: palette.card,
      borderRadius: 20,
      padding: 14,
      borderWidth: 1,
      borderColor: palette.border,
    },

    featureIcon: {
      width: 58,
      height: 58,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 13,
    },

    featureTitle: {
      fontSize: 14,
      lineHeight: 19,
      fontWeight: "800",
      color: palette.textPrimary,
    },

    featureDescription: {
      minHeight: 78,
      marginTop: 7,
      fontSize: 11,
      lineHeight: 17,
      color: palette.textSecondary,
    },

    featureButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 15,
      borderWidth: 1,
    },

    featureButtonText: {
      fontSize: 10,
      fontWeight: "700",
    },

    copilotCard: {
      marginTop: 18,
      backgroundColor: palette.card,
      borderRadius: 23,
      padding: 18,
      borderWidth: 1,
      borderColor: palette.border,
    },

    copilotTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.mitra,
    },

    copilotSubtitle: {
      marginTop: 4,
      fontSize: 12,
      color: palette.textSecondary,
    },

    rangeSelector: {
      flexDirection: "row",
      gap: 8,
      padding: 5,
      borderRadius: 16,
      backgroundColor: palette.cardRaised,
    },

    rangeText: {
      paddingHorizontal: 7,
      paddingVertical: 5,
      fontSize: 10,
      color: palette.textSecondary,
    },

    rangeActive: {
      color: palette.mitra,
      fontWeight: "800",
      backgroundColor: palette.card,
      borderRadius: 10,
    },

    conditionRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 17,
    },

    conditionIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },

    conditionTitle: {
      marginLeft: 10,
      flex: 1,
      fontSize: 12,
      fontWeight: "600",
      color: palette.textPrimary,
    },

    conditionStatus: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },

    conditionStatusText: {
      fontSize: 11,
      color: palette.success,
      fontWeight: "600",
    },

    
trendChart: {
  marginTop: 22,
  padding: 14,
  borderRadius: 18,
  backgroundColor: palette.cardRaised,
  overflow: "hidden",
},

trendHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 18,
},

trendTitle: {
  fontSize: 13,
  fontWeight: "800",
  color: palette.textPrimary,
},

trendSubtitle: {
  marginTop: 3,
  fontSize: 10,
  color: palette.textSecondary,
},

trendLegend: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

trendLegendDot: {
  width: 7,
  height: 7,
  borderRadius: 4,
},

trendLegendText: {
  fontSize: 10,
  color: palette.textSecondary,
},

trendPlot: {
  height: 90,
  position: "relative",
  justifyContent: "flex-end",
},

trendGuideLine: {
  position: "absolute",
  left: 0,
  right: 0,
  height: StyleSheet.hairlineWidth,
  backgroundColor: palette.border,
},

trendBars: {
  height: 90,
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 5,
  zIndex: 1,
},

trendBar: {
  flex: 1,
  minWidth: 3,
  maxWidth: 15,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
},

trendLabels: {
  marginTop: 10,
  flexDirection: "row",
  justifyContent: "space-between",
},

trendAxisLabel: {
  fontSize: 10,
  color: palette.textSecondary,
},


    mitraNote: {
      marginTop: 18,
      borderRadius: 23,
      padding: 20,
      backgroundColor: "#EEE9FF",
      borderWidth: 1,
      borderColor: palette.border,
    },

    mitraNoteTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.mitra,
    },

    mitraNoteText: {
      marginTop: 10,
      fontSize: 14,
      lineHeight: 21,
      color: palette.textSecondary,
    },

    askMitraButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginTop: 15,
      paddingHorizontal: 15,
      height: 39,
      borderRadius: 20,
      backgroundColor: palette.azure,
    },

    askMitraText: {
      fontSize: 12,
      fontWeight: "700",
      color: palette.onAzure,
    },

    bottomNavigation: {
      position: "absolute",
      left: 10,
      right: 10,
      bottom: 10,
      height: 78,
      borderRadius: 26,
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 20,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      elevation: 8,
    },

    bottomTab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },

    bottomTabText: {
      fontSize: 9,
      color: "#64748B",
      fontWeight: "600",
    },

    bottomTabTextActive: {
      color: palette.azure,
      fontWeight: "800",
    },

    emergencyTab: {
      width: 75,
      height: 78,
      alignItems: "center",
      justifyContent: "center",
    },

    emergencyTabCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: palette.critical,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 4,
      borderColor: palette.criticalMuted,
      shadowColor: palette.critical,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 6,
    },

    emergencyTabText: {
      marginTop: 2,
      fontSize: 9,
      fontWeight: "800",
      color: palette.critical,
    },

    floatingAiButton: {
      position: "absolute",
      right: 20,
      width: 62,
      height: 62,
      borderRadius: 31,
      backgroundColor: palette.card,
      borderWidth: 2,
      borderColor: palette.azureMuted,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 20,
      shadowColor: "#000000",
      shadowOpacity: 0.16,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 5 },
      elevation: 10,
    },

    floatingAiLogo: {
      width: 52,
      height: 52,
      borderRadius: 26,
    },
  });
}
