import { DomainModel } from "./domain.model";
import { Url } from "./domain.types";

export class DomainRepository {
  async getAll() {
    return DomainModel.find().sort({ _id: -1 });
  }

  async create(url: Url) {
    const domain = new DomainModel({ url });
    
    return domain.save();
  }

  async findByUrl(url: Url) {
    return DomainModel.findOne({ url });
  }
}
