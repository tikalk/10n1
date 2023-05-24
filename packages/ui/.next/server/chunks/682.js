"use strict";
exports.id = 682;
exports.ids = [682];
exports.modules = {

/***/ 3682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6981);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable react/no-array-index-key */ 


const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday", 
];
const arr = Array(47).fill(null).map((_, item)=>item % 2 === 0 ? `${item / 2 + 1}:00` : `${Math.floor(item / 2 + 1)}:30`);
const AvailabilityRow = ({ day , days , setDays , i , change , defaultChecked  })=>{
    const { 0: startTime , 1: setStartTime  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("9:00");
    const { 0: endTime , 1: setEndTime  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("10:00");
    const { 0: checked , 1: setChecked  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultChecked);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        change(`day-${day}-${i}`, checked ? "add" : "remove", day, startTime, endTime);
    }, [
        checked,
        startTime,
        endTime
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setEndTime(arr[arr.indexOf(startTime) + 2]);
    }, [
        startTime,
        endTime
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Row, {
        noGutters: true,
        className: "d-flex align-items-center mb-2",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                md: 1,
                className: "d-flex align-items-center",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                    type: "checkbox",
                    className: "ml-2",
                    checked: checked,
                    onChange: ()=>setChecked(!checked)
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                md: 2,
                children: day
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                md: 3,
                className: "d-flex align-items-center pl-3",
                children: [
                    "from:",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                        type: "select",
                        defaultValue: startTime,
                        className: "mx-1",
                        onChange: (e)=>{
                            setStartTime(e.target.value);
                        },
                        children: arr.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                children: item
                            }, `hours${item}`))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                md: 3,
                className: "d-flex align-items-center pl-4",
                children: [
                    "to:",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Input, {
                        type: "select",
                        value: endTime,
                        className: "mx-1",
                        onChange: (e)=>{
                            setEndTime(e.target.value);
                        },
                        children: arr.map((item, ind)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                disabled: ind <= arr.indexOf(startTime),
                                children: item
                            }, `hours${item}`))
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Col, {
                md: 3,
                className: "text-right",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: "#/",
                    onClick: (e)=>{
                        e.preventDefault();
                        const newDays = [
                            ...days
                        ];
                        newDays.splice(i, 0, day);
                        setDays(newDays);
                    },
                    children: "Add another slot >"
                })
            })
        ]
    });
};
const CheckedRow = ({ day , change  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        color: "info",
        style: {
            cursor: "pointer"
        },
        onClick: ()=>change(day.key, "remove", day.day, day.startTime, day.endTime),
        className: "mr-3",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "mx-2",
                children: "X"
            }),
            "\uD83D\uDCC5 ",
            day.day,
            " - ",
            day.startTime,
            " - ",
            day.endTime
        ]
    });
};
const AvailabilitySelector = ({ onChange , values  })=>{
    const { 0: days , 1: setDays  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(daysOfWeek);
    const { 0: selected , 1: setSelected  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const change = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((key, method, day, startTime, endTime)=>{
        const newVal = {
            day,
            startTime,
            endTime,
            key
        };
        const selectedCopy = {
            ...selected
        };
        if (method === "add") {
            selectedCopy[key] = newVal;
        } else {
            delete selectedCopy[key];
        }
        setSelected(selectedCopy);
        onChange(Object.values(selectedCopy));
    }, [
        selected
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            days.map((day, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AvailabilityRow, {
                    day: day,
                    days: days,
                    setDays: setDays,
                    i: i,
                    change: change
                }, `day-${day}-${i}`)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "font-weight-bold",
                        children: "Selected slots:"
                    }),
                    values.map((val, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CheckedRow, {
                            day: val,
                            change: change
                        }, `Checkeday-${val.day}-${i}`))
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AvailabilitySelector);


/***/ })

};
;