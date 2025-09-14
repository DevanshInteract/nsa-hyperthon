// Simple in-memory storage for testing without MongoDB
class MemoryStorage {
  constructor() {
    this.registrations = new Map();
    this.nextId = 1;
  }

  async create(registrationData) {
    const id = this.nextId++;
    const registration = {
      _id: id.toString(),
      ...registrationData,
      registrationDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.registrations.set(id.toString(), registration);
    return registration;
  }

  async findById(id) {
    return this.registrations.get(id.toString()) || null;
  }

  async findOne(query) {
    for (const registration of this.registrations.values()) {
      if (query.email && registration.email === query.email) {
        return registration;
      }
    }
    return null;
  }

  async findAll() {
    return Array.from(this.registrations.values());
  }

  async updateById(id, updateData) {
    const registration = this.registrations.get(id.toString());
    if (registration) {
      Object.assign(registration, updateData, { updatedAt: new Date() });
      this.registrations.set(id.toString(), registration);
      return registration;
    }
    return null;
  }

  // Debug method to see all registrations
  debug() {
    console.log('Memory Storage Debug:');
    console.log('Total registrations:', this.registrations.size);
    for (const [id, reg] of this.registrations) {
      console.log(`ID: ${id}, Name: ${reg.name}, Email: ${reg.email}`);
    }
  }
}

module.exports = new MemoryStorage();
