import express from "express";
import logger from "./util/logger.ts";
import cors from "cors";
const app = express();

app.listen(8800, () => {
  logger.info("Server started on port 8800");
});
