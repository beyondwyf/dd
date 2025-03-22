import mongoose from 'mongoose';

export interface ITodo {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this todo.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema); 