import moment from 'moment';

const dayNumberMap: any = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function isThisInFuture(targetDayNum: number) {
  const todayNum = moment().isoWeekday();

  if (todayNum <= targetDayNum) {
    return moment().isoWeekday(targetDayNum);
  }
  return false;
}

function findNextInstanceInDaysArray(daysArray: number[]) {
  const tests = daysArray.map(isThisInFuture);

  const thisWeek = tests.find((sample: any) => {
    return sample instanceof moment;
  });

  return thisWeek || moment().add(1, 'weeks').isoWeekday(daysArray[0]);
}

// eslint-disable-next-line import/prefer-default-export
export function getNext3AppointmentOptions(availability: any) {
  let availableDate;
  let availableDate2;
  let availableDate3;
  switch (availability.length) {
    case 1:
      availableDate = findNextInstanceInDaysArray([
        dayNumberMap[availability[0].day],
      ]);
      availableDate.set({
        hour: availability[0].startTime.split(':')[0],
        minute: availability[0].startTime.split(':')[1],
      });
      return [
        availableDate,
        availableDate.clone().add(1, 'week'),
        availableDate.clone().add(2, 'week'),
      ];
    case 2:
      availableDate = findNextInstanceInDaysArray([
        dayNumberMap[availability[0].day],
      ]);
      availableDate2 = findNextInstanceInDaysArray([
        dayNumberMap[availability[1].day],
      ]);
      availableDate.set({
        hour: availability[0].startTime.split(':')[0],
        minute: availability[0].startTime.split(':')[1],
      });
      availableDate2.set({
        hour: availability[1].startTime.split(':')[0],
        minute: availability[1].startTime.split(':')[1],
      });
      return [
        availableDate,
        availableDate2,
        availableDate.clone().add(1, 'week'),
      ];
    case 3:
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
        hour: availability[0].startTime.split(':')[0],
        minute: availability[0].startTime.split(':')[1],
      });
      availableDate2.set({
        hour: availability[1].startTime.split(':')[0],
        minute: availability[1].startTime.split(':')[1],
      });
      availableDate3.set({
        hour: availability[2].startTime.split(':')[0],
        minute: availability[2].startTime.split(':')[1],
      });
      return [availableDate, availableDate2, availableDate3];
    default:
      return [];
  }
}
