import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import { PORT } from "./config/env";
import { SampleRouter } from "./modules/sample/sample.router";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ProductRouter } from "./modules/product/product.router";

export class App {
  app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    const sampleRouter = new SampleRouter();
    const productRouter = new ProductRouter();

    this.app.use("/samples", sampleRouter.getRouter());
    this.app.use("/products", productRouter.getRouter());
  }

  private handleError() {
    this.app.use(errorMiddleware);
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
    });
  }
}
