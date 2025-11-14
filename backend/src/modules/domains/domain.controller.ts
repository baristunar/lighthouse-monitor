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

  try {
    const urlObj = new URL(url);
    if (!urlObj.protocol.startsWith('http')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: "Invalid URL. Must start with http:// or https://" 
      });
    }
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: "Invalid URL format. Please enter a valid URL (e.g., https://example.com)" 
    });
  }

  const domainCount = await service.count();
  if (domainCount >= 10) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: "Maximum 10 domains allowed. Please delete a domain to add a new one." 
    });
  }

  const existing = await service.findByUrl(url);
  if (existing) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      error: "This domain is already being monitored." 
    });
  }

  await service.create(url);
  
  res.status(StatusCodes.CREATED).json({ message: "Domain added",
    payload: { url }
   });
});

export default domainRouter;
