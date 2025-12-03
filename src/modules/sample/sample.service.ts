import { ApiError } from "../../utils/apiError";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSampleDTO } from "./dto/create-sample.dto";
import { TestSendEmailDTO } from "./dto/test-send-email.dto";

export class SampleService {
  prisma: PrismaService;
  mailService: MailService;

  constructor() {
    this.prisma = new PrismaService();
    this.mailService = new MailService();
  }

  getSamples = async () => {
    const samples = await this.prisma.sample.findMany();
    return samples;
  };

  getSample = async (id: number) => {
    const sample = await this.prisma.sample.findFirst({
      where: { id },
    });

    if (!sample) throw new ApiError("Sample not found", 404);
    return sample;
  };

  createSample = async (body: CreateSampleDTO) => {
    await this.prisma.sample.create({
      data: body,
    });

    return {
      message: "create sample success",
    };
  };

  testSendEmail = async (body: TestSendEmailDTO) => {
    await this.mailService.sendEmail(
      body.email,
      "Welcome to my app",
      "welcome",
      {
        email: body.email,
      }
    );
    return { message: "send email success" };
  };
}
