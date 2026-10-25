import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Replace this with your computer's local IP address and backend port.
// Do not use localhost when testing on a physical phone.
const BACKEND_URL = "http://192.168.1.100:5000";

export default function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getBooks = async () => {
    setIsLoading(true);
    setError("");

    try {
      // This request matches: bookRouter.get("/books", getBooks)
      const response = await fetch(`${BACKEND_URL}/books`);
      const bookData = await response.json();

      if (!response.ok) {
        throw new Error(bookData.message || "Could not load books.");
      }

      setBooks(Array.isArray(bookData.data) ? bookData.data : []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Book API Test</Text>
        <Text style={styles.explanation}>
          Press the button to request GET /books from the backend.
        </Text>

        <Pressable
          disabled={isLoading}
          onPress={getBooks}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isLoading && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading…" : "Load Books"}
          </Text>
        </Pressable>

        {isLoading && <ActivityIndicator color="#0f4c5c" size="large" />}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <FlatList
          contentContainerStyle={styles.list}
          data={books}
          keyExtractor={(book) => String(book.id)}
          ListEmptyComponent={
            !isLoading && !error ? (
              <Text style={styles.empty}>Press “Load Books” to begin.</Text>
            ) : null
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>By {item.author}</Text>
              {item.category ? (
                <Text style={styles.category}>{item.category}</Text>
              ) : null}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f1e8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    color: "#102a43",
    fontSize: 30,
    fontWeight: "700",
  },
  explanation: {
    color: "#52606d",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    marginTop: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0f4c5c",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 14,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  list: {
    flexGrow: 1,
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderColor: "#d9d3c7",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  bookTitle: {
    color: "#102a43",
    fontSize: 20,
    fontWeight: "700",
  },
  author: {
    color: "#52606d",
    fontSize: 15,
    marginTop: 5,
  },
  category: {
    color: "#0f4c5c",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    textTransform: "uppercase",
  },
  error: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    color: "#991b1b",
    marginBottom: 16,
    padding: 12,
  },
  empty: {
    color: "#7b8794",
    fontSize: 15,
    paddingTop: 24,
    textAlign: "center",
  },
});
