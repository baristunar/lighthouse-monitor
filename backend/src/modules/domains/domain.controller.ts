import { Router, Response, Request } from "express";
import { DomainService } from "./domain.service.js";
import { StatusCodes } from "http-status-codes";

const domainRouter = Router();
const service = new DomainService();

domainRouter.get("/", async (req: Request, res: Response) => {
  const domains = await service.getAll();
  
  res.status(StatusCodes.OK).json(domains);
});

domainRouter.post("/", async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "URL is required" });
  }

  const domainCount = await service.count();
  if (domainCount >= 10) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: "Maximum 10 domains allowed. Please delete a domain to add a new one." 
    });
  }

  await service.create(url);
  
  res.status(StatusCodes.CREATED).json({ message: "Domain added",
    payload: { url }
   });
});

export default domainRouter;
