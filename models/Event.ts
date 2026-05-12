import mongoose, { Schema, models, model } from "mongoose";

const vibeSchema = new mongoose.Schema({
  name: String,
  category: { 
    type: String, 
    enum: ['Events', 'Places', 'Markets', 'Food', 'Music', 'Art & Culture', 'Outdoor', 'Nightlife'] 
  },
  location: String,
  description: String,
  rating: Number,
  image: String // URL placeholder
});

export default vibeSchema