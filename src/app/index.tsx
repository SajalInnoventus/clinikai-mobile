import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { aiGradient } from "@/constants/clinikai-theme";
import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function SplashScreen() {
  const { palette, scheme } = useClinikaiTheme();
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    const redirectTimer = setTimeout(() => {
      router.replace("/login");
    }, 1800);

    return () => clearTimeout(redirectTimer);
  }, [logoOpacity, logoScale]);

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <Animated.View
        style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
      >
        <LinearGradient
          colors={aiGradient[scheme] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoMark}
        >
          <Text style={styles.logoGlyph}>C</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.Text
        style={[styles.wordmark, { color: palette.textPrimary }, { opacity: logoOpacity }]}
      >
        ClinikAI
      </Animated.Text>
      <Animated.Text
        style={[styles.tagline, { color: palette.textSecondary }, { opacity: logoOpacity }]}
      >
        Your health, understood.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    marginBottom: 18,
  },
  logoMark: {
    width: 84,
    height: 84,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlyph: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "700",
  },
  wordmark: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 13,
    marginTop: 4,
  },
});