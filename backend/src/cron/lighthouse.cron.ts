import cron from "node-cron";
import { DomainRepository } from "../modules/domains/domain.repository.js";
import { MetricsService } from "../modules/metrics/metrics.service.js";

export  const startCron = () => {
  const domainRepo = new DomainRepository();
  const metricsService = new MetricsService();

  cron.schedule("0 */3 * * *", async () => {
    console.log("⏱ Running Lighthouse checks...");

    const domains = await domainRepo.getAll();
    
    for (const d of domains) {
      const metrics = await metricsService.runOnce(d.url);
      console.log(`✔ ${d.url} updated`);
    }
  });
}
