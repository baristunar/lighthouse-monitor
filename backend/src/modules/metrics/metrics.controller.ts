import { Router } from "express";
import { MetricsService } from "./metrics.service.js";
import { StatusCodes } from "http-status-codes";

const metricsRouter = Router();
const service = new MetricsService();

metricsRouter.get("/:domain", async (req, res) => {
  const data = await service.getHistory(req.params.domain);

  res.status(StatusCodes.OK).json(data);
});

metricsRouter.post("/run", async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: { message: "Domain is required in request body" } 
      });
    }
    
    console.log(`🚀 Running Lighthouse for domain: ${domain}`);
    const metrics = await service.runOnce(domain);
    
    res.status(StatusCodes.OK).json(metrics);
  } catch (err) {
    console.error("❌ Error running Lighthouse:", err);
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: {
        message: "Failed to run Lighthouse",
    } });
  }
});

export default metricsRouter;
