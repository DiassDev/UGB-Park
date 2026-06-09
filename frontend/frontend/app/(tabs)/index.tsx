import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.overline}>UGB Park</Text>
          <Text style={styles.title}>Painel de controle</Text>
          <Text style={styles.subtitle}>
            Gerencie o fluxo do estacionamento.
          </Text>
        </View>

        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color="#111217" />
        </View>
      </View>

      <View style={styles.statusCard}>
        <View>
          <Text style={styles.statusLabel}>Ocupação atual</Text>
          <Text style={styles.statusValue}>128 / 300</Text>
          <Text style={styles.statusHint}>172 vagas disponíveis</Text>
        </View>

        <View style={styles.statusIcon}>
          <Ionicons name="car-sport" size={30} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryAction}
          onPress={() => router.push("/camera?type=entrada")}
        >
          <Ionicons name="enter-outline" size={28} color="#111217" />
          <Text style={styles.primaryActionText}>Registrar entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryAction}
          onPress={() => router.push("/camera?type=saida")}
        >
          <Ionicons name="exit-outline" size={28} color="#FFFFFF" />
          <Text style={styles.secondaryActionText}>Registrar saída</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Resumo rápido</Text>

        <TouchableOpacity onPress={() => router.push("/(tabs)/historico")}>
          <Text style={styles.sectionLink}>Ver histórico</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          </View>

          <Text style={styles.metricLabel}>Entradas hoje</Text>
          <Text style={styles.metricValue}>42</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          </View>

          <Text style={styles.metricLabel}>Saídas hoje</Text>
          <Text style={styles.metricValue}>31</Text>
        </View>
      </View>

      <View style={styles.lastMovement}>
        <Text style={styles.movementTitle}>Última movimentação</Text>

        <View style={styles.movementItem}>
          <View style={styles.plateBox}>
            <Text style={styles.plateText}>DQE2H66</Text>
          </View>

          <View style={styles.movementInfo}>
            <Text style={styles.movementType}>Entrada registrada</Text>
            <Text style={styles.movementTime}>há poucos minutos</Text>
          </View>

          <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111217",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 36,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  overline: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    color: "#C7C7CD",
    fontSize: 14,
    marginTop: 6,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    minHeight: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  statusLabel: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "500",
  },

  statusValue: {
    color: "#111217",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 6,
  },

  statusHint: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 6,
  },

  statusIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#111217",
    alignItems: "center",
    justifyContent: "center",
  },

  actions: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 34,
  },

  primaryAction: {
    flex: 1,
    height: 112,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    justifyContent: "space-between",
  },

  secondaryAction: {
    flex: 1,
    height: 112,
    backgroundColor: "#1C1D23",
    borderWidth: 1,
    borderColor: "#2E3038",
    borderRadius: 24,
    padding: 18,
    justifyContent: "space-between",
  },

  primaryActionText: {
    color: "#111217",
    fontSize: 15,
    fontWeight: "800",
  },

  secondaryActionText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  sectionLink: {
    color: "#C7C7CD",
    fontSize: 13,
  },

  grid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 22,
  },

  metricCard: {
    flex: 1,
    backgroundColor: "#1C1D23",
    borderWidth: 1,
    borderColor: "#2E3038",
    borderRadius: 22,
    padding: 16,
  },

  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2E3038",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  metricLabel: {
    color: "#C7C7CD",
    fontSize: 13,
  },

  metricValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 4,
  },

  lastMovement: {
    backgroundColor: "#1C1D23",
    borderWidth: 1,
    borderColor: "#2E3038",
    borderRadius: 24,
    padding: 18,
  },

  movementTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
  },

  movementItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  plateBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 12,
  },

  plateText: {
    color: "#111217",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  movementInfo: {
    flex: 1,
  },

  movementType: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  movementTime: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
});
