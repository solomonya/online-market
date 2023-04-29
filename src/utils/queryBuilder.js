class QueryBuilder {
  constructor(db) {
    this.db = db;
    this.tableName = "";
    this.selectFields = "*";
    this.whereConditions = [];
    this.orderByFields = [];
  }

  reset() {
    this.tableName = "";
    this.selectFields = "*";
    this.whereConditions = [];
    this.orderByFields = [];
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

    if (Array.isArray(conditions)) this.whereConditions = [...this.whereConditions, ...conditions];
    else this.whereConditions.push(conditions);

    return this;
  }

  orderBy(field, direction = "ASC") {
    this.orderByFields.push(`${field} ${direction.toUpperCase()}`);
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

    try {
      const { rows } = await this.db.query(queryString);
      this.reset();
      return rows;
    } catch (err) {
      throw err;
    }
  }
}

export { QueryBuilder };
