import { Router } from "express";
import { MetricsService } from "./metrics.service.js";
import { DomainService } from "../domains/domain.service.js";
import { StatusCodes } from "http-status-codes";

const metricsRouter = Router();
const service = new MetricsService();
const domainService = new DomainService();

metricsRouter.get("/:domainId", async (req, res) => {
  try {
    const domainId = req.params.domainId;
    const domains = await domainService.getAll();
    const domain = domains.find(d => d._id.toString() === domainId);
    
    if (!domain) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: "Domain not found" 
      });
    }
    
    const data = await service.getHistory(domain.url);
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    console.error("❌ Error fetching metrics:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: "Failed to fetch metrics" 
    });
  }
});

metricsRouter.post("/run", async (req, res) => {
  try {
    const { domainId } = req.body;
    
    if (!domainId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: "Domain ID is required in request body" 
      });
    }
    
    const domains = await domainService.getAll();
    const domain = domains.find(d => d._id.toString() === domainId);
    
    if (!domain) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: "Domain not found" 
      });
    }
    
    console.log(`🚀 Running Lighthouse for domain: ${domain.url}`);
    const metrics = await service.runOnce(domain.url);
    
    res.status(StatusCodes.OK).json(metrics);
  } catch (err) {
    console.error("❌ Error running Lighthouse:", err);
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: "Failed to run Lighthouse"
    });
  }
});

export default metricsRouter;
