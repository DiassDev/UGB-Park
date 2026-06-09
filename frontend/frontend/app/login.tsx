import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateForm() {
    if (!username.trim()) {
      Alert.alert("Usuário obrigatório", "Digite seu usuário para continuar.");
      return false;
    }

    if (!password) {
      Alert.alert("Senha obrigatória", "Digite sua senha para continuar.");
      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post("/login/", {
        username: username.trim(),
        password,
      });

      router.replace("/(tabs)");
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Usuário ou senha inválidos.";

      Alert.alert("Erro no login", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Assuma o controle.</Text>

      <Text style={styles.subtitle}>
        Monitore vagas, entradas e saídas em um só lugar.
      </Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="person" size={18} color="#B8B8C0" />

        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário..."
          placeholderTextColor="#B8B8C0"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed" size={18} color="#B8B8C0" />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          placeholderTextColor="#B8B8C0"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          disabled={loading}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#B8B8C0"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotButton} disabled={loading}>
        <Text style={styles.forgotText}>Esqueceu sua senha ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#111217" />
        ) : (
          <Text style={styles.buttonText}>Continuar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/cadastro")}
        disabled={loading}
      >
        <Text style={styles.registerText}>
          Não tem uma conta ?{" "}
          <Text style={styles.registerBold}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111217",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 20,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 18,
  },

  subtitle: {
    color: "#C7C7CD",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 78,
  },

  inputWrapper: {
    width: "100%",
    height: 56,
    borderWidth: 1.4,
    borderColor: "#FFFFFF",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: 10,
  },

  forgotButton: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: -4,
    marginBottom: 40,
  },

  forgotText: {
    color: "#C7C7CD",
    fontSize: 13,
  },

  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },

  buttonDisabled: {
    opacity: 0.8,
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },

  registerText: {
    color: "#C7C7CD",
    fontSize: 14,
  },

  registerBold: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
