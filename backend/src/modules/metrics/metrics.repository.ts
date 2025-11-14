import { MetricsModel } from "./metrics.model.js";
import { MetricsData, Domain } from "./metrics.types.js";

export class MetricsRepository {
  async create(data: MetricsData) {
    const metrics = new MetricsModel(data);
    return metrics.save();
  }

  async findByDomain(domain: Domain) {
    return MetricsModel.find({ domain }).sort({ createdAt: -1 });
  }

  async deleteOldMetrics(daysToKeep: number = 90) {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    const result = await MetricsModel.deleteMany({ 
      createdAt: { $lt: cutoffDate } 
    });
    return result.deletedCount;
  }
}
