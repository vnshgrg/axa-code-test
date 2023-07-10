import * as express from "express";
import * as bodyParser from "body-parser";

import { messageRouter } from "./routes/messageRoute";
import { cronJob, environment } from "./utils";
import { processEmails } from "./email/processEmails";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/api/message", messageRouter);

// set up our simple interval based cron job
cronJob(async () => {
  processEmails();
}, 10 * 1000); // runs every 15 minutes

const port = environment.app_port || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
