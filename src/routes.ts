
import express = require("express");
import { Constants } from "./config/constants";
import { Middleware } from "./middleware";
import { AuthRoute } from "./modules/auth/authRoute";
import { NoteRoute } from "./modules/note/noteRoute";

export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "Hello !",
    });
  }

  public path() {
    const router = express.Router();

    const middleware = new Middleware()

    // for auth API route
    router.use("/auth", AuthRoute);

    // for notes API route
    router.use("/note", middleware.authenticateUser, NoteRoute);

    router.all("/*", (req, res) => {
      return res.status(Constants.NOT_FOUND_CODE).json({
        error: req.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}