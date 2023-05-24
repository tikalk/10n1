"use strict";
exports.id = 345;
exports.ids = [345];
exports.modules = {

/***/ 345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6981);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9723);
/* harmony import */ var react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_AvailabilitySelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3682);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1644);
/* harmony import */ var _graphql_mutations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4845);
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5277);
/* harmony import */ var _graphql_queries__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(876);
/* harmony import */ var _data_radar_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(395);
/* eslint-disable react/jsx-props-no-spreading */ 














const RegistrationSchema = yup__WEBPACK_IMPORTED_MODULE_7__.object().shape({
    name: yup__WEBPACK_IMPORTED_MODULE_7__.string().min(2, "To short!").max(50, "To long!").required("Required!"),
    phone: yup__WEBPACK_IMPORTED_MODULE_7__.string().min(7, "To short!").max(15, "To long!").required("Required!"),
    email: yup__WEBPACK_IMPORTED_MODULE_7__.string().email("Invalid email").required("Required!"),
    bio: yup__WEBPACK_IMPORTED_MODULE_7__.string(),
    expertise: yup__WEBPACK_IMPORTED_MODULE_7__.array().min(1, "Minimum 1 expertise").required("Required!"),
    availability: yup__WEBPACK_IMPORTED_MODULE_7__.array().of(yup__WEBPACK_IMPORTED_MODULE_7__.object({
        day: yup__WEBPACK_IMPORTED_MODULE_7__.string(),
        startTime: yup__WEBPACK_IMPORTED_MODULE_7__.string(),
        endTime: yup__WEBPACK_IMPORTED_MODULE_7__.string(),
        key: yup__WEBPACK_IMPORTED_MODULE_7__.string()
    })).min(1, "Minimum 1 Availability").required("Required!")
});
const Add = ()=>{
    const { 0: options , 1: setOptions  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [createExpert] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useMutation)(_graphql_mutations__WEBPACK_IMPORTED_MODULE_11__/* .CREATE_EXPERT */ .N);
    const [updateExpert] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useMutation)(_graphql_mutations__WEBPACK_IMPORTED_MODULE_11__/* .UPDATE_EXPERT */ .J);
    const { userData  } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .ZP)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const { email  } = router.query;
    const [getExpertData, { data  }] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useLazyQuery)(_graphql_queries__WEBPACK_IMPORTED_MODULE_13__/* .GET_EXPERT_BY_EMAIL */ .TY, {
        variables: {
            email
        }
    });
    const expertData = data?.expert || {};
    const formik = (0,formik__WEBPACK_IMPORTED_MODULE_3__.useFormik)({
        initialValues: {
            name: userData?.name || expertData?.name || "",
            phone: userData?.phone || expertData?.phone || "",
            email: userData?.email || expertData?.email || "",
            bio: expertData?.bio || "",
            image: userData?.image || expertData?.image || "",
            expertise: expertData?.expertise || [],
            availability: expertData?.availability || []
        },
        enableReinitialize: true,
        validationSchema: RegistrationSchema,
        onSubmit: (values)=>{
            if (email) {
                updateExpert({
                    variables: {
                        input: {
                            ...values,
                            expertise: [
                                ...values.expertise.map((theme)=>typeof theme === "object" ? lodash__WEBPACK_IMPORTED_MODULE_6___default().pick(theme, [
                                        "name"
                                    ]) : {
                                        name: theme
                                    }), 
                            ]
                        }
                    }
                }).then(()=>{
                    router.push(`/experts/${email}`);
                });
            } else {
                createExpert({
                    variables: {
                        input: {
                            ...values,
                            expertise: [
                                ...values.expertise.map((theme)=>typeof theme === "object" ? lodash__WEBPACK_IMPORTED_MODULE_6___default().pick(theme, [
                                        "name"
                                    ]) : {
                                        name: theme
                                    }), 
                            ]
                        }
                    }
                }).then(()=>{
                    router.push("/");
                });
            }
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (email) {
            getExpertData();
        }
    }, [
        email
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const techs = [];
        _data_radar_json__WEBPACK_IMPORTED_MODULE_14__/* .blips.forEach */ .BV.forEach((blip)=>{
            techs.push(blip.name);
        });
        setOptions(lodash__WEBPACK_IMPORTED_MODULE_6___default().uniq(techs));
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                title: "1 On 1 - Registration page"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Container, {
                fluid: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                    className: "mt-4",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            md: 3
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                            md: 6,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Card, {
                                className: "p-3",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.CardBody, {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Form, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                        md: 6,
                                                        sm: 12,
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormGroup, {
                                                            className: "d-flex flex-column",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Label, {
                                                                    for: "name",
                                                                    children: "Name:"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                                                    type: "text",
                                                                    name: "name",
                                                                    id: "name",
                                                                    value: formik?.values?.name,
                                                                    onChange: formik.handleChange,
                                                                    placeholder: "Enter your name...",
                                                                    ...formik.getFieldProps("name")
                                                                }),
                                                                formik.errors?.name && formik.touched.name && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormFeedback, {
                                                                    children: formik.errors?.name
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                        md: 6,
                                                        sm: 12,
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormGroup, {
                                                            className: "d-flex flex-column",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Label, {
                                                                    for: "phone",
                                                                    children: "Phone #:"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                                                    type: "tel",
                                                                    name: "phone",
                                                                    id: "phone",
                                                                    value: formik?.values?.phone,
                                                                    onChange: formik.handleChange,
                                                                    placeholder: "Enter your phone #...",
                                                                    ...formik.getFieldProps("phone")
                                                                }),
                                                                formik.errors?.phone && formik.touched.phone && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormFeedback, {
                                                                    children: formik.errors?.phone
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    md: 12,
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormGroup, {
                                                        className: "d-flex flex-column",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Label, {
                                                                for: "email",
                                                                children: "Email:"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                                                type: "email",
                                                                name: "email",
                                                                id: "email",
                                                                value: formik?.values?.email,
                                                                onChange: formik.handleChange,
                                                                placeholder: "Enter your email...",
                                                                ...formik.getFieldProps("email")
                                                            }),
                                                            formik.errors?.email && formik.touched.email && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormFeedback, {
                                                                children: formik.errors?.email
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    md: 12,
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormGroup, {
                                                        className: "d-flex flex-column",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Label, {
                                                                for: "bio",
                                                                children: "Bio:"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                                                type: "textarea",
                                                                name: "bio",
                                                                id: "bio",
                                                                value: formik?.values?.bio,
                                                                onChange: formik.handleChange,
                                                                ...formik.getFieldProps("bio")
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    md: 12,
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormGroup, {
                                                        className: "d-flex flex-column",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Label, {
                                                                for: "expertise",
                                                                children: "Expertise:"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap_typeahead__WEBPACK_IMPORTED_MODULE_4__.Typeahead, {
                                                                id: "expertise",
                                                                name: "expertise",
                                                                labelKey: "name",
                                                                size: "large",
                                                                multiple: true,
                                                                allowNew: true,
                                                                onChange: (value)=>{
                                                                    formik.setFieldValue("expertise", value);
                                                                },
                                                                options: options,
                                                                placeholder: "Choose several expertise...",
                                                                selected: formik?.values?.expertise ?? [].map((expertise)=>expertise.name),
                                                                className: formik.errors?.expertise && formik.touched.expertise ? "border-danger border rounded" : ""
                                                            }),
                                                            formik.errors?.expertise && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "text-danger",
                                                                children: formik.errors?.expertise
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    md: 12,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.FormGroup, {
                                                            className: formik.errors?.availability && formik.touched.availability ? "border-danger border rounded d-flex flex-column" : "d-flex flex-column",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Label, {
                                                                    for: "availability",
                                                                    children: "Availability:"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AvailabilitySelector__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                                                    values: formik.values?.availability,
                                                                    onChange: (value)=>{
                                                                        formik.setFieldValue("availability", value);
                                                                    }
                                                                })
                                                            ]
                                                        }),
                                                        formik.errors?.availability && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "text-danger",
                                                            children: formik.errors?.availability
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                                                    md: 12,
                                                    className: "d-flex justify-content-end ",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                        color: "warning",
                                                        onClick: formik.submitForm,
                                                        disabled: !formik.isValid,
                                                        children: "Edit"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                })
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Add);


/***/ })

};
;