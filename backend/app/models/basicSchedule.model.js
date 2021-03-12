const dayjs = require("dayjs");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Employee: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Employee"
            },
        Amount:{ type: Number ,required:true},//数据库中 就截断成3位小数
        Time:{type:String,required:true},//存储的时候按照 年/月 格式就行了
      },
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;

      return object;
    });
  
    const BasicSchedule = mongoose.model("basicSchedule", schema);
    return BasicSchedule;
  };
  