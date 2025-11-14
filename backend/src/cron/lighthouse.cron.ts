import cron from "node-cron";
import { DomainRepository } from "../modules/domains/domain.repository.js";
import { MetricsService } from "../modules/metrics/metrics.service.js";
import { MetricsRepository } from "../modules/metrics/metrics.repository.js";

export const startCron = () => {
  const domainRepo = new DomainRepository();
  const metricsService = new MetricsService();
  const metricsRepo = new MetricsRepository();

  // Run every 3 hours: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00
  cron.schedule("0 */3 * * *", async () => {
    console.log("⏱️ Running Lighthouse checks...");

    try {
      const domains = await domainRepo.getAll();

      if (domains.length === 0) {
        console.log("📭 No domains to check");
        return;
      }

      console.log(`📊 Found ${domains.length} domain(s) to check`);

      for (const d of domains) {
        try {
          console.log(`🔍 Checking: ${d.url}`);
          const metrics = await metricsService.runOnce(d.url) as any;
          
          console.log(`✅ ${d.url} - Performance: ${metrics.performance}/100`);
        } catch (error) {
          console.error(`❌ Error checking ${d.url}:`, error);
        }
      }

      const deletedCount = await metricsRepo.deleteOldMetrics(90);
      if (deletedCount > 0) {
        console.log(`🗑️ Cleaned up ${deletedCount} old metric(s)`);
      }

      console.log("✨ Lighthouse checks completed");
    } catch (error) {
      console.error("❌ Cron job error:", error);
    }
  });

  console.log("🕐 Cron job started: Running every 3 hours");
};
