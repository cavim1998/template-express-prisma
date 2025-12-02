import { Request, Response } from "express";
import { SampleService } from "./sample.service";

export class SampleController {
  sampleServices: SampleService;

  constructor() {
    this.sampleServices = new SampleService();
  }

  getSamples = async (req: Request, res: Response) => {
    const result = await this.sampleServices.getSamples();
    return res.status(200).send(result);
  };

  getSample = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this.sampleServices.getSample(id);
    return res.status(200).send(result);
  };

  createSample = async (req: Request, res: Response) => {
    const result = await this.sampleServices.createSample(req.body);
    return res.status(200).send(result);
  };
}
