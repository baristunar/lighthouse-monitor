import { DomainModel } from "./domain.model.js";
import { Url } from "./domain.types.js";

export class DomainRepository {
  async getAll() {
    return DomainModel.find().sort({ _id: -1 });
  }

  async count() {
    return DomainModel.countDocuments();
  }

  async create(url: Url) {
    const domain = new DomainModel({ url });
    
    return domain.save();
  }

  async findByUrl(url: Url) {
    return DomainModel.findOne({ url });
  }
}
