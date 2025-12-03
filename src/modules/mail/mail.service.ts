import { createTransport, Transporter } from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../../config/env";
import path from "path";
import fs from "fs/promises";
import Handlebars, { templates } from "handlebars";

export class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  renderTemplate = async (templateName: string, context: object) => {
    const templateDir = path.resolve(__dirname, "./templates");
    const tempaltePath = path.join(templateDir, `${templateName}.hbs`);
    const templateSource = await fs.readFile(tempaltePath, "utf-8");
    const compiledTemplate = Handlebars.compile(templateSource);
    return compiledTemplate(context);
  };

  sendEmail = async (
    to: string,
    subject: string,
    templateName: string,
    context: object
  ) => {
    const html = await this.renderTemplate(templateName, context);
    await this.transporter.sendMail({
      to,
      subject,
      html,
    });
  };
}
