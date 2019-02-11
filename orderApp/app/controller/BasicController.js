const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
  //文件存储路径
  destination: (req , file , cb )=>{
     cb(null , path.join(__dirname , '../../public/uploads'));
  },
  //修改上传文件的名字
  //file 是个文件对象 ,fieldname对应在客户端的name属性
  filename: (req , file , cb ) => {
     cb( null, file.fieldname +'-' + Date.now());
  }
});
let METHOD_MODE = { SINGLE:'single',ARRAY:'array' , ANY:"any"};
let isDest = false;  //不是dest就是storage

let obj = null;

let multerobj =  null;
if( isDest ){
  multerobj = multer({
    dest: path.join(__dirname,'../../public/uploads')
  });
}else {
  multerobj = multer({
    storage: storage
  });
};

let mode = METHOD_MODE.SINGLE;
const  FIELD_NAME = "_file";
let upload_multer ;

(function(){
  switch( mode ){
    case METHOD_MODE.SINGLE: upload_multer = multerobj.single(FIELD_NAME);break;
    case METHOD_MODE.ARRAY: upload_multer = multerobj.array(FIELD_NAME);break;
    case METHOD_MODE.ANY: upload_multer = multerobj.any();break;
    default:
       upload_multer = null; break;
  }
})();

if(upload_multer == null ){
   throw new Error("exception");
}
let objMulter = multer({storage : storage });


const BasicController = (function(){
  function BasicC(){}

  BasicC.prototype.uploadImg = function(req,res){
    upload_multer( req, res , function( err ){
      if( mode == METHOD_MODE.ARRAY || mode == METHOD_MODE.ANY){
        //console.log( "file length: " + req.files.length );
      }else if(mode == METHOD_MODE.SINGLE){
        //console.log(JSON.stringify( req.file ));
      }
      if(err) return res.json({issuccessful: 0, message: err });
      else
      return res.json({issuccessful: 1, message: "File is uploaded ",fileUrl:'/uploads/'+req.file.filename });
   });
  }

  return BasicC
})()

export default BasicController