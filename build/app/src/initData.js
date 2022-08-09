"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"runServer",{enumerable:true,get:()=>runServer});const _client=require("@prisma/client");const _cors=_interopRequireDefault(require("cors"));const _express=_interopRequireDefault(require("express"));const _router=require("../../router");function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const prisma=new _client.PrismaClient;const init={schema:true};const initCheck=function(){var _ref=_asyncToGenerator(function*(){if(init.schema===false){yield prisma.user.create({data:{email:"admin@master.com",name:"admin",password:"admin"}})}});return function initCheck(){return _ref.apply(this,arguments)}}();const runServer=function(){var _ref=_asyncToGenerator(function*(){const app=(0,_express.default)();const PORT=process.env.PORT||4e3;initCheck();app.use((0,_cors.default)());app.use(_express.default.urlencoded({extended:true}));app.use(_express.default.json());app.use("/api/account",_router.accountRouter);app.use("/api/config",_router.configRouter);app.listen(PORT,()=>{console.log(PORT);console.log("server running...")})});return function runServer(){return _ref.apply(this,arguments)}}()