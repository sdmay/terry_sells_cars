import * as mongoose from 'mongoose';

const NewsLetterSchema = new mongoose.Schema({
  newsLetterEmail: String
});

const NewsLetter = mongoose.model('NL', NewsLetterSchema);


export default NewsLetter;
