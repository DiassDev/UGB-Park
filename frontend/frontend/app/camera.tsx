import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "../services/api";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);

  const { type } = useLocalSearchParams();

  const actionType = type === "saida" ? "saida" : "entrada";

  async function handleTakePicture() {
    try {
      setLoading(true);

      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.8,
      });

      if (!photo?.uri) {
        Alert.alert("Erro", "Não foi possível capturar a imagem.");
        return;
      }

      const formData = new FormData();

      formData.append("image", {
        uri: photo.uri,
        name: "plate.jpg",
        type: "image/jpeg",
      } as any);

      const ocrResponse = await api.post("/ocr/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const plate = ocrResponse.data.plate;

      if (!plate) {
        Alert.alert(
          "Placa não identificada",
          "Tente capturar a imagem novamente.",
        );
        return;
      }

      await api.post(`/${actionType}/`, {
        plate,
      });

      Alert.alert(
        "Sucesso",
        actionType === "entrada"
          ? `Entrada registrada para ${plate}.`
          : `Saída registrada para ${plate}.`,
      );

      router.replace("/(tabs)");
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Não foi possível processar a placa.";

      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  }

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#FFFFFF" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera" size={48} color="#FFFFFF" />

        <Text style={styles.permissionTitle}>Acesso à câmera</Text>

        <Text style={styles.permissionText}>
          Precisamos da câmera para capturar a placa do veículo.
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Permitir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.topTitle}>
              {actionType === "entrada"
                ? "Registrar entrada"
                : "Registrar saída"}
            </Text>

            <View style={styles.backButtonPlaceholder} />
          </View>

          <View style={styles.scanArea}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              Posicione a placa dentro da área indicada
            </Text>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={[
                styles.captureButton,
                loading && styles.captureButtonDisabled,
              ]}
              onPress={handleTakePicture}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#111217" />
              ) : (
                <Ionicons name="camera" size={32} color="#111217" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111217",
  },

  camera: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 52,
    paddingBottom: 42,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(17,18,23,0.75)",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonPlaceholder: {
    width: 42,
    height: 42,
  },

  topTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  scanArea: {
    alignItems: "center",
  },

  scanFrame: {
    width: "92%",
    height: 170,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  scanText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 18,
  },

  bottomBar: {
    alignItems: "center",
  },

  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  captureButtonDisabled: {
    opacity: 0.8,
  },

  center: {
    flex: 1,
    backgroundColor: "#111217",
    alignItems: "center",
    justifyContent: "center",
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: "#111217",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  permissionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 18,
  },

  permissionText: {
    color: "#C7C7CD",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 28,
  },

  permissionButton: {
    height: 52,
    paddingHorizontal: 28,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  permissionButtonText: {
    color: "#111217",
    fontSize: 16,
    fontWeight: "700",
  },
});
