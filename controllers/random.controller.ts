import {NextFunction, Request, Response} from "express";
import prismaService from "../services/prisma.service";
import {getRandomInt} from "../helpers/random";

export class RandomController {
  async getRandom(req: Request, res: Response, next: NextFunction) {
    try {
      const countCorrections = await prismaService.correction.aggregate({
        _count: { id: true },
      });
      const randomNumber = getRandomInt(countCorrections._count.id);
      const randomCorrection = await prismaService.correction.findMany({
        skip: randomNumber,
        take: 1,
      });

      res.status(200).json(randomCorrection[0]);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
