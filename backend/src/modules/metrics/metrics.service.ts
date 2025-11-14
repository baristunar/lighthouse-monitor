import { MetricsRepository } from "./metrics.repository.js";
import { runLighthouse } from "../../lighthouse/lighthouse.service.js";
import { Domain, MetricsData } from "./metrics.types.js";

export class MetricsService {
  constructor(private repo = new MetricsRepository()) {}

  async runOnce(domain: Domain) {
    const data = await runLighthouse(domain);

    await this.repo.create(data as MetricsData);
    
    return data;
  }

  getHistory(domain: Domain) {
    return this.repo.findByDomain(domain);
  }
}
