"use strict";Object.defineProperty(exports,"__esModule",{value:true});const _express=_interopRequireDefault(require("express"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const app=(0,_express.default)();app.use(_express.default.urlencoded({extended:true}));app.use(_express.default.json());const PORT=process.env.PORT||4e3;app.listen(PORT,()=>{console.log("server start!!");console.log("12312");console.log(PORT)});app.get("/",(req,res)=>{res.send("asdfasdfasdf");res.end()})