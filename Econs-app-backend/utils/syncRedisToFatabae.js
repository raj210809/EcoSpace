import client from "./redisClient.js";
import activeChat from "../models/chat.model.js";

export const syncRedisToDatabase = async () => {
    try {
        const chatArray = await client.lRange('activemessages', 0, -1); // Get all data from Redis list

        if (chatArray.length === 0) {
            console.log('No data to sync');
            return;
        }

        // Parse Redis string data into JSON (assuming data is stored as JSON string)
        const chats = chatArray.map((chat) => JSON.parse(chat));
        console.log('Data to sync:', chats);

        // Insert the data into MongoDB
        await activeChat.insertMany(chats);

        // Clear the Redis list after syncing to the database
        await client.del('activemessages');

        console.log('Synced data to the database');
    } catch (error) {
        console.error('Error syncing data:', error);
    }
};