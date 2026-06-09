import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../services/api";

type HistoryItem = {
  id: number;
  vehicle: number;
  vehicle_plate: string;
  entry_time: string;
  exit_time: string | null;
  is_active: boolean;
};

export default function Historico() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadHistory() {
    try {
      const response = await api.get("/historico/");
      setHistory(response.data);
    } catch (error) {
      console.log("Erro ao buscar histórico:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadHistory();
    }, []),
  );

  function formatDate(date: string | null) {
    if (!date) return "Em aberto";

    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function renderItem({ item }: { item: HistoryItem }) {
    const active = item.exit_time === null;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.plateBox}>
            <Text style={styles.plateText}>{item.vehicle_plate}</Text>
          </View>

          <View
            style={[styles.statusBadge, active && styles.statusBadgeActive]}
          >
            <Text
              style={[styles.statusText, active && styles.statusTextActive]}
            >
              {active ? "No pátio" : "Finalizado"}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="enter-outline" size={18} color="#22C55E" />
          <Text style={styles.infoText}>
            Entrada: {formatDate(item.entry_time)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="exit-outline" size={18} color="#C7C7CD" />
          <Text style={styles.infoText}>
            Saída: {formatDate(item.exit_time)}
          </Text>
        </View>
      </View>
    );
  }

  function handleRefresh() {
    setRefreshing(true);
    loadHistory();
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.overline}>UGB Park</Text>
        <Text style={styles.title}>Histórico</Text>
        <Text style={styles.subtitle}>
          Consulte as entradas e saídas registradas.
        </Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          history.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FFFFFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="car-outline" size={34} color="#FFFFFF" />
            </View>

            <Text style={styles.emptyTitle}>Nenhum carro registrado ainda</Text>

            <Text style={styles.emptyText}>
              Quando uma entrada ou saída for registrada, ela aparecerá aqui.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111217",
    paddingHorizontal: 24,
    paddingTop: 54,
  },

  header: {
    marginBottom: 24,
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
    fontWeight: "900",
  },

  subtitle: {
    color: "#C7C7CD",
    fontSize: 14,
    marginTop: 6,
  },

  listContent: {
    paddingBottom: 120,
    gap: 14,
  },

  card: {
    backgroundColor: "#1C1D23",
    borderWidth: 1,
    borderColor: "#2E3038",
    borderRadius: 22,
    padding: 18,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  plateBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  plateText: {
    color: "#111217",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  statusBadge: {
    backgroundColor: "#2E3038",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  statusBadgeActive: {
    backgroundColor: "#DCFCE7",
  },

  statusText: {
    color: "#C7C7CD",
    fontSize: 12,
    fontWeight: "800",
  },

  statusTextActive: {
    color: "#166534",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  infoText: {
    color: "#C7C7CD",
    fontSize: 14,
  },

  centerContainer: {
    flex: 1,
    backgroundColor: "#111217",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#C7C7CD",
    marginTop: 12,
    fontSize: 14,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyState: {
    alignItems: "center",
    paddingHorizontal: 12,
  },

  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1C1D23",
    borderWidth: 1,
    borderColor: "#2E3038",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  emptyText: {
    color: "#C7C7CD",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
});
