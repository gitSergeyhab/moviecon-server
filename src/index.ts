import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./lib/middlewares/errorHandler";
import { logger } from "./lib/utils/logger";
import { router } from "./routes";
import { dbConnect } from "./db/externalDbConnect";
import { ENV } from "./constants";

const app: Application = express();

const corsOptions = {
  origin: [ENV.ALLOWED_HOST],
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(bodyParser.json());

app.use("/api/v1/", router);

app.use(errorHandler);

dbConnect();

app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});
