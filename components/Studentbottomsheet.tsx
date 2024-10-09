import React, { useCallback, useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import axios from "axios";

interface User {
  name: string;
  profilePic: string;
  position: string;
  about: string;
  currentlyIn: string;
  instagram: string;
  linkedin: string;
}

export const BottomView = ({ onClose, studentid }: { onClose: () => void; studentid: string | null }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // To show loading state
  const bottomsheetref = useRef<BottomSheet>(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.22.61:3000/auth/getuserdetail?id=${studentid}`);
      setUser(response.data.user);
      setLoading(false); // Hide loading when data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Hide loading even in case of error
    }
  };

  useEffect(() => {
    if (studentid) {
      getUserDetails();
    }
  }, [studentid]);

  const handleSheetChange = useCallback((index: number) => {
    console.log("Sheet position changed to index:", index);
  }, []);

  const snapPoints = ["80%"]; // Adjust the height of the BottomSheet

  const openLink = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Can't handle URL:", url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6a0dad" />
      </View>
    );
  }

  return (
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomsheetref}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        onClose={onClose}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.userDetailsContainer}>
              {/* Square Image */}
              <Image
                source={{ uri: user?.profilePic || 'https://via.placeholder.com/150' }}
                style={styles.profileImage}
              />

              {/* Go to Profile Button */}
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push(`/profileshow/${studentid}`)}
              >
                <Text style={styles.buttonText}>Go to Profile</Text>
              </TouchableOpacity>

              {/* Name Text */}
              <Text style={styles.nameText}>{user?.name || "John Doe"}</Text>

              {/* Current Position Text */}
              <Text style={styles.positionText}>{user?.position || "Software Engineer at XYZ Corp"}</Text>

              {/* About Text */}
              <Text style={styles.aboutText}>
                {user?.about || "Passionate developer with experience in building scalable web applications."}
              </Text>

              {/* Currently Living In Text */}
              <Text style={styles.currentlyInText}>{user?.currentlyIn || "Currently living in New York City, USA"}</Text>

              {/* Social Media Links */}
              {user?.instagram && (
                <TouchableOpacity
                  style={[styles.socialButton, styles.instagramButton]}
                  onPress={() => openLink(`https://instagram.com/${user.instagram}`)}
                >
                  <Text style={styles.socialButtonText}>Instagram</Text>
                </TouchableOpacity>
              )}

              {user?.linkedin && (
                <TouchableOpacity
                  style={[styles.socialButton, styles.linkedinButton]}
                  onPress={() => openLink(`https://linkedin.com/in/${user.linkedin}`)}
                >
                  <Text style={styles.socialButtonText}>LinkedIn</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'90%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 20,
  },
  userDetailsContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  profileButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  positionText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  currentlyInText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  socialButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  instagramButton: {
    backgroundColor: "#E1306C",
  },
  linkedinButton: {
    backgroundColor: "#0077b5",
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
