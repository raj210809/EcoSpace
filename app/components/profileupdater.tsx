import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ currentProfile, onSave, onCancel }) => {
  // Create local state for editing
  const [updatedProfile, setUpdatedProfile] = useState(currentProfile);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask the user for permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    // Let the user pick an image from the media library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setTimeout(async () => {
      console.log(profileImage)
      await uploadImage();
    }, 2000);
  };

  const uploadImage = async () => {
    if (!profileImage) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('file', {
      name: 'profilepic.jpg', // The file name
      type: 'image/jpeg', // The MIME type of the file
      uri: profileImage, // The file URI from the ImagePicker
    } as any); // Casting as 'any' to bypass TypeScript type checking
    

    formData.append('upload_preset', 'ytnw1qht'); // Your Cloudinary upload preset

    try {
      const response1 = await axios.post('https://api.cloudinary.com/v1_1/dx2l62ub6/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // On successful upload, get the image URL
      const imageUrl =await response1.data.secure_url;
      await setUpdatedProfile({...updatedProfile , profilePic : imageUrl})
      console.log('Image URL: ', imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-lg font-bold mb-2">Edit Profile</Text>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: updatedProfile.profilePic }} className="w-32 h-32 rounded-full" />
        <Text className="text-blue-500 mt-2 text-center">Change Profile Picture</Text>
      </TouchableOpacity>

      {/* About */}
      <Text className="mt-4">About</Text>
      <TextInput
        value={updatedProfile.about}
        onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, about: text })}
        className="border p-2 mt-1 rounded"
      />

      {/* Position */}
      <Text className="mt-4">Position</Text>
      <TextInput
        value={updatedProfile.position}
        onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, position: text })}
        className="border p-2 mt-1 rounded"
      />

      {/* Currently In */}
      <Text className="mt-4">Currently In</Text>
      <TextInput
        value={updatedProfile.currentlyin}
        onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, currentlyIn: text })}
        className="border p-2 mt-1 rounded"
      />

      <Text className="mt-4">Instagram Handdle</Text>
            <TextInput
              value={updatedProfile.instagram}
              onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, instagram: text })}
              className="border p-2 mt-1 rounded"
            />

      <Text className="mt-4">Linked In Handle</Text>
            <TextInput
              value={updatedProfile.linkedin}
              onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, linkedin: text })}
              className="border p-2 mt-1 rounded"
            />

      {/* Save and Cancel Buttons */}
      <View className="flex-row justify-between mt-6 mb-10">
        <Button title="Cancel" onPress={onCancel} color="red" />
        <Button title="Save" onPress={() => onSave(updatedProfile)} color="green" />
      </View>
    </View>
  );
};

export default EditProfile;
