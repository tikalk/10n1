"use strict";
(() => {
var exports = {};
exports.id = 557;
exports.ids = [557];
exports.modules = {

/***/ 139:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ radar)
});

;// CONCATENATED MODULE: external "csvtojson"
const external_csvtojson_namespaceObject = require("csvtojson");
var external_csvtojson_default = /*#__PURE__*/__webpack_require__.n(external_csvtojson_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/radar.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/* harmony default export */ const radar = ((req, res)=>{
    fetch("https://www.tikalk.com/data/radar.csv").then((resp)=>resp.text()).then((data)=>{
        external_csvtojson_default()({
            noheader: true,
            output: "csv"
        }).fromString(data).then((csvRow)=>{
            res.status(200).json(csvRow);
        });
    });
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(139));
module.exports = __webpack_exports__;

})();