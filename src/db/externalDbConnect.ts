import mongoose from "mongoose";
import { logger } from "../lib/utils/logger";
import { ENV } from "../constants";

export const dbConnect = () =>
  mongoose
    .connect(ENV.MONGO_URI)
    .then(() => logger.info(`MongoDB connected`))
    .catch((err) => logger.error(`MongoDB connection error: ${err}`));
