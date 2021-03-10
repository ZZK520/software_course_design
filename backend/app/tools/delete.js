

const deleteAttribute_book=function(entity){
    delete user.password;
    delete user.roles;
    delete user.code;
    delete user.__v;
    delete user.create_time;
    return 
}
const deleteAttribute_user=function(user){
    user=user.toObject()
    delete user.password;
    delete user.roles;
    delete user.code;
    delete user.__v;
    delete user.create_time;
    return user;
}
exports.deleteAttribute_book=deleteAttribute_book;
exports.deleteAttribute_user=deleteAttribute_user;