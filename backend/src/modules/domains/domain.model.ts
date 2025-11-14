import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
});

export const DomainModel = mongoose.model("Domain", domainSchema);
