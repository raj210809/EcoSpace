import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet, Image ,TouchableOpacity} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

export const BottomView = ({onClose , studentid}:{
    onClose :()=>void;
    studentid : string | null
}) => {
  const bottomsheetref = useRef<BottomSheet>(null);

  // Handle changes when the sheet position changes
  const handleSheetChange = useCallback((index: number) => {
    console.log("Sheet position changed to index:", index);
  }, []);

  // Snap points defining the available heights for the bottom sheet
  const snapPoints = ["100%"]; // Can be percentages or fixed values

  return (
    <View style={styles.container}>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomsheetref}
        snapPoints={snapPoints} // Provide snap points
        onChange={handleSheetChange}
        onClose={onClose}
      >
        <BottomSheetView style={styles.contentContainer}>
        <ScrollView className="flex-1 bg-white p-6">
      <View className="items-center mt-8">
        {/* Square Image */}
        <Image
          source={{ uri: 'https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg' }} // Replace with actual image URL
          className="w-3/5 h-3/5 rounded-lg mb-6"
          style={{ aspectRatio: 1 }}
        />
        <Text>{studentid}</Text>

        {/* Go to Profile Button */}
        <TouchableOpacity className="bg-purple-600 py-3 px-6 rounded-lg mb-8">
          <Text className="text-white text-lg font-semibold">Go to Profile</Text>
        </TouchableOpacity>

        {/* Name Text */}
        <Text className="text-2xl font-bold mb-2">John Doe</Text>

        {/* Current Position Text */}
        <Text className="text-lg text-gray-600 mb-4">Software Engineer at XYZ Corp</Text>

        {/* About Text */}
        <Text className="text-base text-gray-700 mb-4">
          Passionate developer with experience in building scalable web applications.
        </Text>

        {/* Currently Living In Text */}
        <Text className="text-base text-gray-500">Currently living in New York City, USA</Text>
      </View>
    </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'90%'
  },
  contentContainer: {
  },
});
