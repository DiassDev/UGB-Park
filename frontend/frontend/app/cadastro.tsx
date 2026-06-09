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

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedUsername) {
      Alert.alert("Usuário obrigatório", "Digite um nome de usuário.");
      return false;
    }

    if (normalizedUsername.length < 3) {
      Alert.alert("Usuário inválido", "Use pelo menos 3 caracteres.");
      return false;
    }

    if (!normalizedEmail) {
      Alert.alert("Email obrigatório", "Digite seu email.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      Alert.alert("Email inválido", "Digite um email válido.");
      return false;
    }

    if (!password) {
      Alert.alert("Senha obrigatória", "Digite sua senha.");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Senha muito curta", "Use pelo menos 6 caracteres.");
      return false;
    }

    return true;
  }

  async function handleRegister() {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post("/cadastro/", {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      Alert.alert("Cadastro realizado", "Sua conta foi criada com sucesso.");
      router.replace("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Não foi possível criar sua conta.";

      Alert.alert("Erro", message);
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

      <Text style={styles.title}>Crie sua conta.</Text>

      <Text style={styles.subtitle}>
        Cadastre-se para gerenciar entradas, saídas e histórico.
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
        <Ionicons name="mail" size={18} color="#B8B8C0" />

        <TextInput
          style={styles.input}
          placeholder="Digite seu email..."
          placeholderTextColor="#B8B8C0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#111217" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/login")}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          Já tem uma conta ? <Text style={styles.loginBold}>Entrar</Text>
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
    marginBottom: 58,
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

  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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

  loginText: {
    color: "#C7C7CD",
    fontSize: 14,
  },

  loginBold: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
