"use strict";
exports.id = 354;
exports.ids = [354];
exports.modules = {

/***/ 7354:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_ExpertCard)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "reactstrap"
var external_reactstrap_ = __webpack_require__(6981);
// EXTERNAL MODULE: external "jsonwebtoken"
var external_jsonwebtoken_ = __webpack_require__(9344);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(6517);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);
// EXTERNAL MODULE: ./hooks/useAuth.tsx
var useAuth = __webpack_require__(5277);
;// CONCATENATED MODULE: ./dateHelper.ts

const dayNumberMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};
function isThisInFuture(targetDayNum) {
    const todayNum = external_moment_default()().isoWeekday();
    if (todayNum <= targetDayNum) {
        return external_moment_default()().isoWeekday(targetDayNum);
    }
    return false;
}
function findNextInstanceInDaysArray(daysArray) {
    const tests = daysArray.map(isThisInFuture);
    const thisWeek = tests.find((sample)=>{
        return sample instanceof (external_moment_default());
    });
    return thisWeek || external_moment_default()().add(1, "weeks").isoWeekday(daysArray[0]);
}
// eslint-disable-next-line import/prefer-default-export
function getNext3AppointmentOptions(availability) {
    let availableDate;
    let availableDate2;
    let availableDate3;
    switch(availability.length){
        case 0:
            return [];
        case 1:
            availableDate = findNextInstanceInDaysArray([
                dayNumberMap[availability[0].day], 
            ]);
            availableDate.set({
                hour: availability[0].startTime.split(":")[0],
                minute: availability[0].startTime.split(":")[1]
            });
            return [
                availableDate,
                availableDate.clone().add(1, "week"),
                availableDate.clone().add(2, "week"), 
            ];
        case 2:
            availableDate = findNextInstanceInDaysArray([
                dayNumberMap[availability[0].day], 
            ]);
            availableDate2 = findNextInstanceInDaysArray([
                dayNumberMap[availability[1].day], 
            ]);
            availableDate.set({
                hour: availability[0].startTime.split(":")[0],
                minute: availability[0].startTime.split(":")[1]
            });
            availableDate2.set({
                hour: availability[1].startTime.split(":")[0],
                minute: availability[1].startTime.split(":")[1]
            });
            return [
                availableDate,
                availableDate2,
                availableDate.clone().add(1, "week"), 
            ];
        default:
            availableDate = findNextInstanceInDaysArray([
                dayNumberMap[availability[0].day], 
            ]);
            availableDate2 = findNextInstanceInDaysArray([
                dayNumberMap[availability[1].day], 
            ]);
            availableDate3 = findNextInstanceInDaysArray([
                dayNumberMap[availability[2].day], 
            ]);
            availableDate.set({
                hour: availability[0].startTime.split(":")[0],
                minute: availability[0].startTime.split(":")[1]
            });
            availableDate2.set({
                hour: availability[1].startTime.split(":")[0],
                minute: availability[1].startTime.split(":")[1]
            });
            availableDate3.set({
                hour: availability[2].startTime.split(":")[0],
                minute: availability[2].startTime.split(":")[1]
            });
            return [
                availableDate,
                availableDate2,
                availableDate3
            ];
    }
}

;// CONCATENATED MODULE: ./components/ExpertCard.tsx
/* eslint-disable import/no-extraneous-dependencies */ 







const ExpertCard = ({ expert , me  })=>{
    const { userData  } = (0,useAuth/* useAuth */.aC)();
    return /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_.Card, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_.CardBody, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "d-flex align-items-center mb-2",
                    children: [
                        expert?.image && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: expert?.image,
                            alt: expert?.name,
                            className: "float-right mr-3 rounded-circle"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: "m-0 p-0",
                                    children: expert?.name
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                    className: "m-0 p-0 font-weight-bold",
                                    children: expert?.email
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                            className: "mr-3",
                            children: "Bio:"
                        }),
                        " ",
                        expert?.bio
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "d-flex align-items-start",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                            className: "mr-3",
                            children: "Expertise:"
                        }),
                        " ",
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "w-100",
                            children: expert?.expertise?.map((exp)=>/*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_.Badge, {
                                    color: "warning",
                                    pill: true,
                                    className: "mr-2",
                                    children: exp.name
                                }, `expertise-${external_lodash_default().snakeCase(exp.name)}-${expert.id}`))
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "d-flex align-items-start mt-2",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                            className: "mr-3",
                            children: "Availability:"
                        }),
                        " ",
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "w-100",
                            children: expert?.availability?.map((exp)=>/*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_.Badge, {
                                    color: "success",
                                    pill: true,
                                    className: "mr-2 text-black",
                                    children: `${exp.day} ${exp.startTime}-${exp.endTime}`
                                }, `availability-${exp.key}-${expert.id}`))
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
                me && /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: `/experts/edit/${expert.email}`,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_.Button, {
                        color: "warning",
                        children: "Edit your profile."
                    })
                }),
                !me && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "d-flex align-items-center",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "mr-2",
                            children: "\uD83D\uDCC5: "
                        }),
                        getNext3AppointmentOptions(expert?.availability).map((slot)=>{
                            // todo: remove this duplication
                            const baseUrl =  true ? "https://10n1.tikalk.dev" : 0;
                            const meeting = {
                                time: slot,
                                expert,
                                userName: userData.name,
                                expertise: "experts list"
                            };
                            const data = (0,external_jsonwebtoken_.sign)(meeting, `10n1Secret-${external_moment_default()().isoWeekday()}`);
                            const url = `${baseUrl}/ds/meeting/?data=${data}`;
                            return /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_.Button, {
                                color: "success",
                                className: "mr-2 my-2 text-black font-weight-bold",
                                size: "sm",
                                onClick: ()=>window.open(url),
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    style: {
                                        fontSize: 9
                                    },
                                    children: slot.format("dddd - DD/MM/YY HH:mm")
                                })
                            }, `availability-btn-${slot}-${expert.id}`);
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const components_ExpertCard = (ExpertCard);


/***/ })

};
;