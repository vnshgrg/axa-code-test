import * as express from "express";
import { login, userDetails as getUserDetails } from "../user";
import { ageChecker } from "../utils";
import { emailDB } from "../email/emailDB";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { username, message } = req.body;

    if (
      !username ||
      !message ||
      username.trim() === "" ||
      message.trim() === ""
    ) {
      res.status(401).json({
        result: false,
        error: "bad-input",
        message: "Missing required fields.",
      });
      return;
    }

    // login user
    // i.e. check if user is registered
    const user = await login(username);

    // check if user is available
    if (!user) {
      res.status(404).json({
        result: false,
        error: "user-not-found",
        message: "User not found.",
      });
      return;
    }

    // get user details
    const userDetails = await getUserDetails(user.uid);

    if (!userDetails) {
      res.status(500).json({
        result: false,
        error: "internal-server-error",
        message: "An internal server occurred!",
      });
      return;
    }

    // check child's age
    if (!ageChecker(userDetails.birthdate)) {
      res.status(400).json({
        result: false,
        error: "ineligible",
        message: "Age is more than 10 years.",
      });
      return;
    }

    // everything looks fine
    // prepare email to send
    emailDB.addEmail({
      subject: `A letter to Santa by ${user.username}`,
      body: `Username: ${user.username}
Address: ${userDetails.address}
Wish for Christmas: ${message}
`,
    });

    res.json({
      result: true,
      error: null,
      message: "Your message have been sent to Santa.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      error: "internal-server-error",
      message: "An internal server error occurred.",
    });
  }
});

export const messageRouter = router;
