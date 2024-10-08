import { StyleSheet, Text, View , FlatList, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import { StudentCard } from './studentshowingcard';
import { BottomView } from '@/components/Studentbottomsheet';

const Active = () => {
    const [drawer , setdrawer] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const students = [
        { id: '1', name: 'John Doe', about: 'CS Student at IITR', imageUrl: 'https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg' },
        { id: '2', name: 'Jane Smith', about: 'Mechanical Engg Student', imageUrl: 'https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg' },
        { id: '3', name: 'Alice Johnson', about: 'Electrical Engg Student', imageUrl: 'https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg' },
        { id: '4', name: 'Bob Brown', about: 'Civil Engg Student', imageUrl: 'https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg' },
        { id: '5', name: 'Charlie Davis', about: 'IT Student at IITR', imageUrl: 'https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg' },
      ];

      const handleCardPress = (id: string) => {
        setSelectedStudentId(id); // Set the selected student ID
        setdrawer(true); // Open the bottom sheet
      };
  return (
    <>
        <View className='flex-1'>
        <FlatList
        data={students}
        renderItem={({ item }) => (
            <StudentCard id={item.id} name={item.name} about={item.about} imageUrl={item.imageUrl} onPress={(id: string) => {
                setSelectedStudentId(id);
                setdrawer(true);
              }}/>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        />
        </View>
        {drawer && <BottomView onClose={()=>{setdrawer(false)}} studentid={selectedStudentId}/>}
    </>
  )
}

export default Active

const styles = StyleSheet.create({
    container : {
        
    }
})