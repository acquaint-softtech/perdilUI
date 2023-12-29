import React, { useState } from 'react';
import { StyledSafeAreaView } from '../../StyledComponentsContstants';
import DatePicker from './DatePicker';

const DatePickerView = () => {
  const [date, setDate] = useState(null);

  return (
    <StyledSafeAreaView className="flex-1 items-center justify-center mx-10">
      <DatePicker onSelectDate={e => setDate(e)} />
    </StyledSafeAreaView>
  );
};

export default DatePickerView;
