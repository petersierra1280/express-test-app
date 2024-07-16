import mongoose from 'mongoose';

const { MONGO_USER: user, MONGO_PWD: pwd } = process.env;

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${pwd}@restdb.vf6ibgj.mongodb.net/?retryWrites=true&w=majority&appName=restdb`);
        console.log('MongooDB connected');
    } catch (error) {
        console.error(error);
    }
})();