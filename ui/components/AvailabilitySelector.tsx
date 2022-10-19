/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useState } from 'react';
import { Badge, Col, Input, Row } from 'reactstrap';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const arr: any = Array(47)
  .fill(null)
  .map((_, item) =>
    item % 2 === 0 ? `${item / 2 + 1}:00` : `${Math.floor(item / 2 + 1)}:30`,
  );

const AvailabilityRow = ({
  day,
  days,
  setDays,
  i,
  change,
  defaultChecked,
}: any) => {
  const [startTime, setStartTime] = useState('9:00');
  const [endTime, setEndTime] = useState('10:00');
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    change(
      `day-${day}-${i}`,
      checked ? 'add' : 'remove',
      day,
      startTime,
      endTime,
    );
  }, [checked, startTime, endTime]);

  useEffect(() => {
    setEndTime(arr[arr.indexOf(startTime) + 2]);
  }, [startTime, endTime]);

  return (
    <Row noGutters className="d-flex align-items-center mb-2">
      <Col md={1} className="d-flex align-items-center">
        <Input
          type="checkbox"
          className="ml-2"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </Col>
      <Col md={2}>{day}</Col>
      <Col md={3} className="d-flex align-items-center pl-3">
        from:
        <Input
          type="select"
          defaultValue={startTime}
          className="mx-1"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        >
          {arr.map((item) => (
            <option key={`hours${item}`}>{item}</option>
          ))}
        </Input>
      </Col>
      <Col md={3} className="d-flex align-items-center pl-4">
        to:
        <Input
          type="select"
          value={endTime}
          className="mx-1"
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        >
          {arr.map((item, ind) => (
            <option
              key={`hours${item}`}
              disabled={ind <= arr.indexOf(startTime)}
            >
              {item}
            </option>
          ))}
        </Input>
      </Col>
      <Col md={3} className="text-right">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            const newDays = [...days];
            newDays.splice(i, 0, day);
            setDays(newDays);
          }}
        >
          Add another slot &gt;
        </a>
      </Col>
    </Row>
  );
};

const CheckedRow = ({ day, change }: any) => {
  return (
    <Badge
      color="info"
      style={{ cursor: 'pointer' }}
      onClick={() =>
        change(day.key, 'remove', day.day, day.startTime, day.endTime)
      }
      className="mr-3"
    >
      <span className="mx-2">X</span>
      📅 {day.day} - {day.startTime} - {day.endTime}
    </Badge>
  );
};

const AvailabilitySelector = ({ onChange, values }: any) => {
  const [days, setDays] = useState(daysOfWeek);
  const [selected, setSelected] = useState({});

  const change = useCallback(
    (key, method, day, startTime, endTime) => {
      const newVal = { day, startTime, endTime, key };
      const selectedCopy = { ...selected };
      if (method === 'add') {
        selectedCopy[key] = newVal;
      } else {
        delete selectedCopy[key];
      }
      setSelected(selectedCopy);
      onChange(Object.values(selectedCopy));
    },
    [selected],
  );

  return (
    <>
      {days.map((day, i) => (
        <AvailabilityRow
          key={`day-${day}-${i}`}
          day={day}
          days={days}
          setDays={setDays}
          i={i}
          change={change}
        />
      ))}
      <div className="mt-4">
        <p className="font-weight-bold">Selected slots:</p>
        {values.map((val, i) => (
          <CheckedRow
            key={`Checkeday-${val.day}-${i}`}
            day={val}
            change={change}
          />
        ))}
      </div>
    </>
  );
};

export default AvailabilitySelector;
