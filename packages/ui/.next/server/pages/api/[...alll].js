"use strict";
(() => {
var exports = {};
exports.id = 362;
exports.ids = [362];
exports.modules = {

/***/ 3291:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _alll_)
});

;// CONCATENATED MODULE: external "next-http-proxy-middleware"
const external_next_http_proxy_middleware_namespaceObject = require("next-http-proxy-middleware");
var external_next_http_proxy_middleware_default = /*#__PURE__*/__webpack_require__.n(external_next_http_proxy_middleware_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/[...alll].ts

const DS_HOST = process.env.DS_HOST || "localhost";
/* harmony default export */ const _alll_ = ((req, res)=>external_next_http_proxy_middleware_default()(req, res, {
        target: `http://${DS_HOST}:4000`,
        pathRewrite: {
            "^/api/graphql": "/api/graphql",
            "^/api": ""
        },
        changeOrigin: true
    }));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3291));
module.exports = __webpack_exports__;

})();