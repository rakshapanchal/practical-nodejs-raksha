import * as express from "express";
require("express-async-errors");
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as helmet from "helmet"; // Security
import * as l10n from "jm-ez-l10n";
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as morgan from "morgan"; // log requests to the console (express4)
import * as path from "path";
import * as fileUpload from "express-fileupload";
import { Log } from "./helpers/logger";
import { Routes } from "./routes";
import { SendEmail } from "./helpers/sendEmail";
import { Constants } from "./config/constants";
import * as trimRequest from "trim-request";
const swaggerUi = require('swagger-ui-express');


dotenv.config();

export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
    this.app = express();
    this.app.use(helmet());
    const swaggerDocument = require('../swagger/swagger.json');
    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers,x-auth-token, x-device-type, x-app-version, x-build-number, uuid, x-l10n-locale");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE ,PUT");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });

    if (NODE_ENV === "development") {
      this.app.use(express.static(path.join(process.cwd(), "public")));
      // set the static files location of bower_components
      this.app.use(morgan("dev")); // log every request to the console
    } else {
      this.app.use(compression());
      // set the static files location /public/img will be /img for users
      this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
    }
    this.app.use(fileUpload({
      parseNested: true,
    }));
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(l10n.enableL10NExpress);
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(Constants.FAIL_CODE).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
    this.app.use(methodOverride());
    this.app.use(trimRequest.all);
    const routes = new Routes(NODE_ENV);
    var options = {
      customCss: '.swagger-ui .topbar { display: none }'
    };
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    this.app.use("/api", routes.path());
    this.app.use(async (err: any, req: any, res: any, next: () => void) => {
      if (err) {
        console.log(err)
        res.status(Constants.FAIL_CODE).json({ error: req.t("SOMETHING_WENT_WRONG") });
        const emailData = {
          to: [process.env.EXCEPTION_MAIL],
          subject: `Node API - ${NODE_ENV} - Unhandled Crash`,
          text: `API_URL: ${req.originalUrl}, REQ_METHOD: ${req.method}, ERR: ${err.stack}`,
        };
        await SendEmail.sendRawMail(emailData); // sending exception email
      }
    });
    this.app.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
    });
  }
}
