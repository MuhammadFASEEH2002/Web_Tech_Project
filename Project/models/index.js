import mongoose from 'mongoose'
import {Teachers} from './Teachers.js'
import {Courses} from './Courses.js'
import { Files } from './Files.js';

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/NCAC`);
})();

const db = {
    Courses,
    Teachers,
    Files
};
export default db;