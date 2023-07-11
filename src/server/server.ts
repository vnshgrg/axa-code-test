import express from "express";
import bodyParser from "body-parser";

import { messageRouter } from "./routes/messageRoute";
import { Log, cronJob, environment } from "./utils";
import { processEmails } from "./email/processEmails";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/api/message", messageRouter);

// set up our simple interval based cron job
cronJob(async () => {
  processEmails();
}, 15 * 1000); // runs every 15 seconds

const port = environment.app_port || 3000;
app.listen(port, () => Log(`Server listening on port: ${port}`));
