class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const { keyword } = this.queryStr
    const searchQuery = keyword
      ? {
        "$or": [
          { title: { $regex: keyword, $options: "i" } },
          { author: { $regex: keyword, $options: "i", } },
          { publisher: { $regex: keyword, $options: "i" } },
          { catagory: { $regex: keyword, $options: "i" } }
        ]
      }
      : {};

    this.query = this.query.find(searchQuery);
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }

  // Add this method to execute the query and return the results
  async execute() {
    return this.query.exec();
  }
}

module.exports = ApiFeatures;