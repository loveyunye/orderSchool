import { getAppParam } from '../config/config'
const path = require('path');
const multer = require('multer');
const request = require('request');


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

  BasicC.prototype.sendAppTemplate = function(req,res){

    const appId = getAppParam().appId
    const appSecret = getAppParam().appSecret
    const code = '023uxbTB0tTf5i2UVpTB07rlTB0uxbTV'
    console.log(appId,appSecret,code)
    request('https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+appSecret+'&js_code='+code+'&grant_type=authorization_code',function(error,response,body){
      if(!error && response.statusCode === 200){	//通过前端传过来的code获取openID
        console.log(body,'获取openID返回的信息')
        var bodyJson = JSON.parse(body);
        
        //获取access_token
        request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appId+'&secret='+appSecret,function(error2,response2,body2){
          
          if (!error2 && response2.statusCode == 200) {
            console.log(body2,'获取access_token返回的数据')
            var bodyJson2 = JSON.parse(body2);
            
            var requestData = {
              touser: bodyJson.openid,	//要通知的用户的openID
              form_id: 1540380591153,	//保存的form_id,因为编辑器无法获取到，只能真机测试才可以，所以只能从真机测试后拿过来写死
              template_id: "EVKZI7sq4vuEh_b0kmi--RiCC_ib_RAikRO_dadnmCU",	//模板id
              data: {	//要通知的模板数据
                "keyword1": {"value":"2018-10-24"},
                "keyword2": {"value":"顺丰"},
                "keyword3": {"value":"28orudfs0808uosdufou"},
                "keyword4": {"value":"发货通知成功，闪开，我要开始装逼了"}
              }
            };
                    
            request({	//调用接口进行模板消息发送
              url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+bodyJson2.access_token,
              method: 'POST',
              json: true,
              headers: {
                "content-type": "application/json",
              },
                body: requestData,
            },function(error3,response3,body3){
              
              if (!error3 && response3.statusCode == 200) {
                console.log(body3,'发送消息返回的参数')
              }	

            })

          }
        })
          
      }
    })	
  }



  return BasicC
})()

export default BasicController