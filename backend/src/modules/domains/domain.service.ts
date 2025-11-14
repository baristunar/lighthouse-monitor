import { DomainRepository } from "./domain.repository.js";
import { Url } from "./domain.types.js";

export class DomainService {
  private repository = new DomainRepository();

  async getAll() {
    return this.repository.getAll();
  }

  async count() {
    return this.repository.count();
  }

  async create(url: Url) {
    return this.repository.create(url);
  }

  async findByUrl(url: Url) {
    return this.repository.findByUrl(url);
  }
}
