(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2337:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
;// CONCATENATED MODULE: external "@sentry/react"
const react_namespaceObject = require("@sentry/react");
;// CONCATENATED MODULE: external "@sentry/tracing"
const tracing_namespaceObject = require("@sentry/tracing");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./apollo-client.ts
var apollo_client = __webpack_require__(8712);
// EXTERNAL MODULE: ./hooks/useAuth.tsx
var useAuth = __webpack_require__(5277);
// EXTERNAL MODULE: ../../node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(5332);
;// CONCATENATED MODULE: ./pages/_app.tsx
/* eslint-disable react/jsx-props-no-spreading */ 










react_namespaceObject.init({
    dsn: "https://baf201991dd4488282eaa3c505cfa1e2@o575983.ingest.sentry.io/5730638",
    integrations: [
        new tracing_namespaceObject.Integrations.BrowserTracing()
    ],
    tracesSampleRate: 1.0
});
function App({ Component , pageProps  }) {
    (0,external_react_.useEffect)(()=>{
        const protocol =  false ? 0 : "";
        const hostname =  false ? 0 : "";
        if ( true && (protocol !== "https:" || hostname !== "10n1.tikalk.dev")) {
            window.location.assign(`https://10n1.tikalk.dev`);
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(client_.ApolloProvider, {
        client: apollo_client/* default */.Z,
        children: /*#__PURE__*/ jsx_runtime_.jsx(useAuth/* AuthProvider */.Ho, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}


/***/ }),

/***/ 5332:
/***/ (() => {



/***/ }),

/***/ 9114:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ 2167:
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 67:
/***/ ((module) => {

"use strict";
module.exports = require("react-google-login");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6981:
/***/ ((module) => {

"use strict";
module.exports = require("reactstrap");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [277], () => (__webpack_exec__(2337)));
module.exports = __webpack_exports__;

})();