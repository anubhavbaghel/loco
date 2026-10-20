import mongoose, { Schema } from "mongoose";

export type EventStatus = "scheduled" | "cancelled" | "postponed";

const geoPointSchema = new Schema(
  {
    type: { type: String, enum: ["Point"], default: "Point", required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (value: number[]) => Array.isArray(value) && value.length === 2,
        message: "coordinates must be [longitude, latitude]",
      },
    },
  },
  { _id: false },
);

const sourceSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    externalId: { type: String },
  },
  { _id: false },
);

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    categoryRaw: { type: String },
    image: { type: String },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date },
    allDay: { type: Boolean, default: false },
    venueName: { type: String },
    address: { type: String },
    city: { type: String, required: true, index: true },
    location: { type: geoPointSchema },
    priceMin: { type: Number },
    priceMax: { type: Number },
    currency: { type: String, default: "INR" },
    isFree: { type: Boolean, default: false },
    description: { type: String },
    organizer: { type: String },
    url: { type: String },
    source: { type: sourceSchema, required: true },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "postponed"],
      default: "scheduled",
    },
    ingestedAt: { type: Date, default: Date.now },
    rating: { type: Number },
    reviewsCount: { type: Number },
  },
  { timestamps: true },
);

eventSchema.index({ location: "2dsphere" });
eventSchema.index({ "source.url": 1 }, { unique: true });
eventSchema.index({ city: 1, startDate: 1 });
eventSchema.index({ city: 1, category: 1, startDate: 1 });
eventSchema.index({ startDate: 1, endDate: 1 });
eventSchema.index({ title: "text", description: "text" });

export type EventDoc = mongoose.InferSchemaType<typeof eventSchema>;

export const Event =
  (mongoose.models.Event as mongoose.Model<EventDoc>) ||
  mongoose.model<EventDoc>("Event", eventSchema);

export default Event;
