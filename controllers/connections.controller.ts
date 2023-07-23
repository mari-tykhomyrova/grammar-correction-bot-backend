import {NextFunction, Request, Response} from "express";
import prismaService from "../services/prisma.service";
import {checkGrammarResponse} from '../services/openai.service';

export class ConnectionsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const corrections = await prismaService.correction.findMany();
      res.json(corrections);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.body;
      if (!text) {
        res.status(400).json({
          message: "Text is required",
        });
      }

      const aiResponse = await checkGrammarResponse(text);
      const correctedPhrase = aiResponse.data.choices[0].message?.content || '';

      const newCorrection = await prismaService.correction.create({
        data: {
          original: text,
          corrected: correctedPhrase,
        },
      });

      res.status(200).json(newCorrection);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
