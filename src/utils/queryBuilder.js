class QueryBuilder {
  constructor(db) {
    this.db = db;
    this.tableName = "";
    this.selectFields = "*";
    this.whereConditions = [];
    this.orderByFields = [];
    this.limit = 10;
    this.offset = 0;
  }

  reset() {
    this.tableName = "";
    this.selectFields = "*";
    this.whereConditions = [];
    this.orderByFields = [];
    this.offset = 0;
    this.limit = 10;
  }

  from(tableName) {
    this.tableName = tableName;
    return this;
  }

  select(fields) {
    this.selectFields = fields.join(", ");
    return this;
  }

  where(conditions) {
    if (!conditions) return this;

    if (Array.isArray(conditions)) {
      const filteredConditions = conditions.filter(Boolean);
      this.whereConditions = [...this.whereConditions, ...filteredConditions];
    } else this.whereConditions.push(conditions);

    return this;
  }

  orderBy(field, direction = "ASC") {
    if (!field) return this;

    this.orderByFields.push(`${field} ${direction.toUpperCase()}`);
    return this;
  }

  setLimit(limit) {
    if (!limit) return this;

    this.limit = limit;
    return this;
  }

  setOffset(offset) {
    if (!offset) return this;

    this.offset = offset;
    return this;
  }

  async execute() {
    if (!this.tableName) {
      throw new Error("Table name is not specified");
    }

    let queryString = `SELECT ${this.selectFields} FROM ${this.tableName}`;

    if (this.whereConditions.length > 0) {
      queryString += " WHERE " + this.whereConditions.join(" AND ");
    }

    if (this.orderByFields.length > 0) {
      queryString += " ORDER BY " + this.orderByFields.join(", ");
    }

    queryString += ` LIMIT ${this.limit} OFFSET ${this.offset}`;

    console.log(queryString);

    try {
      const { rows } = await this.db.query(queryString);
      this.reset();
      return rows;
    } catch (err) {
      console.error(err);
    }
  }
}

export { QueryBuilder };
