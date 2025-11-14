import { DomainRepository } from "./domain.repository.js";
import { Url } from "./domain.types.js";

export class DomainService {
  constructor(private repo = new DomainRepository()) {}

  getAll() {
    return this.repo.getAll();
  }

  create(url: Url) {
    return this.repo.create(url);
  }

  findByUrl(url: Url) {
    return this.repo.findByUrl(url);
  }
}
