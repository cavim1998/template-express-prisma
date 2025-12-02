import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDTO } from "./dto/create-product.dto";

export class ProductService {
  prisma: PrismaService;
  cloudinaryService: CloudinaryService;

  constructor() {
    this.prisma = new PrismaService();
    this.cloudinaryService = new CloudinaryService();
  }

  getProducts = async () => {
    const products = await this.prisma.product.findMany();
    return products;
  };

  createProduct = async (
    body: CreateProductDTO,
    image: Express.Multer.File
  ) => {
    const { secure_url } = await this.cloudinaryService.upload(image);

    await this.prisma.product.create({
      data: { ...body, image: secure_url },
    });

    return {
      message: "Create product success",
    };
  };
}
