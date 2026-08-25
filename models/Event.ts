import mongoose from "mongoose";

const vibeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  categoryBg: { type: String, default: "bg-violet-100" },
  categoryTextColor: { type: String, default: "text-violet-700" },
  image: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true, default: "Bengaluru" },
  price: { type: String, default: "Free Entry" },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 120 },
  description: { type: String, required: true },
  organizer: { type: String, default: "Urban Vibe Collective" },
  isPopular: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isHappeningToday: { type: Boolean, default: false },
});

export const Event = mongoose.models.Event || mongoose.model("Event", vibeSchema);
export default Event;