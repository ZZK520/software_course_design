module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        ID:  {type:String,required:true,max:15},
        Name:  {type:String,required:true,max:20},
        Man:{type:Boolean,default:true},//是否为男性，默认为是
        Degree:{type:String,required:true,max:10},
        PositionTitle:{type:String,required:true,max:20},
        Password:{type:String,required:true,max:10},
        IsAccountant:{type:Boolean,default:false},//是否为会计，默认为否
      },
     
    );
  
    // schema.method("toJSON", function() {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });
  
    const Employee = mongoose.model("Employee", schema);
    return Employee;
  };
  