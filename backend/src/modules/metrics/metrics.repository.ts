import { MetricsModel } from "./metrics.model";
import { MetricsData, Domain } from "./metrics.types";

export class MetricsRepository {
  async saveMetrics(data: MetricsData) {
    const metrics = new MetricsModel(data);

    return metrics.save();
  }

  async getByDomain(domain: Domain) {
    return MetricsModel.find({ domain }).sort({ created_at: -1 }).limit(50);
  }
}
