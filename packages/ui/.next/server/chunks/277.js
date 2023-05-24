"use strict";
exports.id = 277;
exports.ids = [277];
exports.modules = {

/***/ 8712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export cache */
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const cache = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache();
function startApollo() {
    const DS_HOST =  true ? "10n1.tikalk.dev" : 0;
    const DS_PORT =  true ? "" : 0;
    const DS_PATH = "/graphql";
    const httpLink = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.HttpLink({
        uri: `//${DS_HOST}:${DS_PORT}${DS_PATH}`
    });
    const cleanTypeName = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloLink((operation, forward)=>{
        if (operation.variables) {
            const omitTypename = (key, value)=>key === "__typename" ? undefined : value;
            // eslint-disable-next-line no-param-reassign
            operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
        }
        return forward(operation).map((data)=>{
            return data;
        });
    });
    const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({
        link: _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.from([
            cleanTypeName,
            httpLink
        ]),
        cache
    });
    return client;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startApollo());


/***/ }),

/***/ 4845:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ UPDATE_EXPERT),
/* harmony export */   "N": () => (/* binding */ CREATE_EXPERT)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const CREATE_EXPERT = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  mutation createExpert($input: ExpertInput!) {
    addExpert(input: $input) {
      name
    }
  }
`;
const UPDATE_EXPERT = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  mutation updateExpert($input: ExpertInput!) {
    updateExpert(input: $input) {
      name
    }
  }
`;


/***/ }),

/***/ 876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hc": () => (/* binding */ EXPERTS_LIST),
/* harmony export */   "TY": () => (/* binding */ GET_EXPERT_BY_EMAIL),
/* harmony export */   "ti": () => (/* binding */ EXPERTISE)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const EXPERT_FRAGMENT = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  fragment expertAttributes on Expert {
    name
    email
    bio
    phone
    image
    expertise {
      name
    }
    availability {
      day
      startTime
      endTime
      key
    }
    slackData {
      accessToken
      authedUserId
    }
  }
`;
const GET_EXPERT_BY_EMAIL = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  query getExpertByEmail($email: String!) {
    expert(email: $email) {
      ...expertAttributes
    }
  }
  ${EXPERT_FRAGMENT}
`;
const EXPERTS_LIST = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  {
    experts {
      ...expertAttributes
    }
  }
  ${EXPERT_FRAGMENT}
`;
const EXPERTISE = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  {
    expertise {
      value: _id
      count
    }
  }
`;


/***/ }),

/***/ 5277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ho": () => (/* binding */ AuthProvider),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "aC": () => (/* binding */ useAuth)
/* harmony export */ });
/* unused harmony export AuthContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_google_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);
/* harmony import */ var react_google_login__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_google_login__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6981);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8712);
/* harmony import */ var _graphql_queries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(876);
/* harmony import */ var _graphql_mutations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4845);










const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
const googleClientId = "158154804757-5oja12b2flilb717ndvrdct3or8uqjqi.apps.googleusercontent.com";
const AuthProvider = ({ children  })=>{
    const [createExpert] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__.useMutation)(_graphql_mutations__WEBPACK_IMPORTED_MODULE_9__/* .CREATE_EXPERT */ .N);
    const { 0: isLoggedIn , 1: setIsLoggedIn  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const userDataRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const onSuccess = async (response)=>{
        setIsLoading(true);
        setIsLoggedIn(true);
        userDataRef.current = {
            ...userDataRef.current,
            name: response.profileObj.name,
            email: response.profileObj.email,
            image: response.profileObj.imageUrl
        };
        if (response?.tokenObj?.access_token && !userDataRef?.current?.phone) {
            const { data  } = await axios__WEBPACK_IMPORTED_MODULE_4___default().get("https://people.googleapis.com/v1/people/me?personFields=phoneNumbers", {
                headers: {
                    Authorization: `Bearer ${response?.tokenObj?.access_token}`
                }
            });
            if (data?.phoneNumbers?.[0]?.value) {
                userDataRef.current = {
                    ...userDataRef.current,
                    phone: data?.phoneNumbers[0]?.value || null
                };
            }
        }
        if (userDataRef.current?.email) {
            const { data: data1  } = await _apollo_client__WEBPACK_IMPORTED_MODULE_7__/* ["default"].query */ .Z.query({
                query: _graphql_queries__WEBPACK_IMPORTED_MODULE_8__/* .GET_EXPERT_BY_EMAIL */ .TY,
                variables: {
                    email: userDataRef.current?.email
                }
            });
            if (data1?.expert) {
                userDataRef.current = {
                    ...userDataRef.current,
                    ...data1.expert
                };
            } else {
                await createExpert({
                    variables: {
                        input: {
                            name: userDataRef.current?.name || "",
                            phone: userDataRef.current?.phone || "",
                            email: userDataRef.current?.email || "",
                            image: userDataRef.current?.image || ""
                        }
                    }
                });
            }
        }
        if (!userDataRef.current?.slackData?.accessToken) {
            router.push("/registration/step2");
        } else if (!userDataRef?.current?.expertise?.length) {
            router.push("/registration/step3");
        } else if (!userDataRef?.current?.availability?.length) {
            router.push("/registration/step4");
        } else if (!userDataRef?.current?.bio) {
            router.push("/registration/step5");
        }
        setIsLoading(false);
    };
    const onLogout = async ()=>{
        setIsLoading(false);
        userDataRef.current = {};
        await router.push("/");
        await router.reload();
    };
    const onFailure = async ()=>{
        setIsLoading(false);
    };
    const onAutoLoadFinished = async (connected)=>{
        console.warn({
            connected
        });
        if (!connected) {
            setIsLoading(false);
        }
    };
    const refetch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const { data  } = await _apollo_client__WEBPACK_IMPORTED_MODULE_7__/* ["default"].query */ .Z.query({
            query: _graphql_queries__WEBPACK_IMPORTED_MODULE_8__/* .GET_EXPERT_BY_EMAIL */ .TY,
            variables: {
                email: userDataRef.current?.email
            }
        });
        if (data?.expert) {
            userDataRef.current = {
                ...userDataRef.current,
                ...data.expert
            };
        }
        return data?.expert;
    }, [
        userDataRef.current
    ]);
    const { signIn  } = (0,react_google_login__WEBPACK_IMPORTED_MODULE_2__.useGoogleLogin)({
        // @ts-ignore
        onSuccess,
        onFailure,
        onAutoLoadFinished,
        clientId: googleClientId,
        cookiePolicy: "single_host_origin",
        isSignedIn: true,
        scope: "https://www.googleapis.com/auth/user.phonenumbers.read",
        redirectUri:  true ? "https://10n1.tikalk.dev/registration/step2" : 0
    });
    const { signOut  } = (0,react_google_login__WEBPACK_IMPORTED_MODULE_2__.useGoogleLogout)({
        onLogoutSuccess: onLogout,
        clientId: googleClientId,
        cookiePolicy: "single_host_origin"
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            isLoggedIn,
            userData: userDataRef.current ?? {},
            login: signIn,
            logout: signOut,
            isLoading,
            refetch
        },
        children: isLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_3__.Container, {
            className: "d-flex align-items-center justify-content-center vh-100",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_3__.Spinner, {
                size: "lg",
                color: "warning"
            })
        }) : children
    });
};
const useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useAuth);


/***/ })

};
;