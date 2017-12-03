import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

const DemoSchema = new Schema({
  greet: {
    type: String,
    required: [true, 'Greet is required.']
  },
  language: {
    type: String,
    required: [true, 'Language is required.']
  }
});

DemoSchema.plugin(mongoosePaginate);

export default mongoose.model('Demo', DemoSchema);