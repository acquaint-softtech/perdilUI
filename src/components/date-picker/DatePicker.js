/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, {useState} from 'react';
import {
  StyledImage,
  StyledPressable,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../StyledComponentsContstants';
import Images from '../../assets/Images';
import { Platform } from 'react-native';

/**
 * This component can be used to select a date.
 */

const DatePicker = ({
  title = 'Select Date',
  onSelectDate,
  datePickerInput,
  onDismiss,
  visible = false,
}) => {
  const currentDate = new Date();

  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <StyledView className={styles.header}>
        <StyledView className={styles.monthAndYearContainer}>
          <StyledText className={styles.month}>
            {currentMonth.toLocaleString('default', {month: 'long'})}
          </StyledText>
          <StyledText className={styles.year}>
            {currentMonth.toLocaleString('default', {year: 'numeric'})}
          </StyledText>
        </StyledView>
        <StyledView className={styles.monthAndYearContainer}>
          <StyledTouchableOpacity onPress={goToPreviousMonth}>
            <StyledImage
              source={Images.leftArrow}
              className={styles.leftAndRighArrow}
            />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity onPress={goToNextMonth}>
            <StyledImage
              source={Images.leftArrow}
              className={`${styles.leftAndRighArrow} ml-2 rotate-180`}
            />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <StyledView className={`${styles.week} mb-3`}>
        {days.map((day, index) => (
          <StyledView key={index} className={styles.day}>
            <StyledText className={styles.dayName}>{day}</StyledText>
          </StyledView>
        ))}
      </StyledView>
    );
  };
  const getDaysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  const getLastDayOfMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDay();
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const lastDay = getLastDayOfMonth(currentMonth);
    const daysByWeek = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const prevMonthDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        getDaysInMonth(currentMonth) - i,
      );

      days.push('');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    for (let i = lastDay + 1; i < 7; i++) {
      days.push('');
    }
    const chunkSize = 7;
    for (let i = 0; i < days.length; i += chunkSize) {
      const chunk = days.slice(i, i + chunkSize);
      daysByWeek.push(chunk);
    }
    return daysByWeek;
  };

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );
    setCurrentMonth(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1,
    );
    setCurrentMonth(nextMonth);
  };

  const onDayPress = date => {
    const d = new Date(
      currentMonth?.getFullYear(),
      currentMonth?.getMonth(),
      date,
    );

    if (onSelectDate) {
      onSelectDate(d);
    }

    setSelectedDate(d);
    onDismiss();
  };

  return (
    <>
      {datePickerInput}
      {visible && (
        <StyledPressable
          onPress={onDismiss}
          className="absolute bg-black opacity-50 top-0 left-0 bottom-0 right-0 z-[9999]"
        />
      )}
      <StyledView className={styles.datepickerContainer}>
        {visible && (
          <StyledView className={styles.datepicker}>
            {renderHeader()}
            {renderDays()}
            <StyledView>
              {renderCalendar().map((week, i) => (
                <StyledView key={i} className={styles.week}>
                  {week.map((date, index) => (
                    <StyledTouchableOpacity
                      key={index}
                      className={styles.dayContainer}
                      onPress={() => onDayPress(date)}
                      disabled={!date}>
                      <StyledView
                        className={`${styles.dateContainer} ${
                          currentDate?.getDate() === date &&
                          currentDate?.getMonth() ===
                            currentMonth?.getMonth() &&
                          currentDate?.getFullYear() ===
                            currentMonth?.getFullYear() &&
                          'bg-neutral-200'
                        } ${
                          selectedDate?.getDate() === date &&
                          selectedDate?.getMonth() ===
                            currentMonth?.getMonth() &&
                          selectedDate?.getFullYear() ===
                            currentMonth?.getFullYear() &&
                          'bg-neutral-800'
                        }`}>
                        <StyledText
                          className={`${styles.dayText} ${
                            currentDate?.getDate() === date &&
                            currentDate?.getMonth() ===
                              currentMonth?.getMonth() &&
                            currentDate?.getFullYear() ===
                              currentMonth?.getFullYear() &&
                            'text-black'
                          } ${
                            selectedDate?.getDate() === date &&
                            selectedDate?.getMonth() ===
                              currentMonth?.getMonth() &&
                            selectedDate?.getFullYear() ===
                              currentMonth?.getFullYear() &&
                            'text-white'
                          }`}>
                          {date.toString()}
                        </StyledText>
                      </StyledView>
                    </StyledTouchableOpacity>
                  ))}
                </StyledView>
              ))}
            </StyledView>
          </StyledView>
        )}
      </StyledView>
    </>
  );
};

const styles = {
  title: 'block mb-1 text-base font-medium text-neutral-500',
  datepickerInput:
    'flex-row items-center justify-between w-full px-3 py-2 bg-white border rounded-md border-neutral-300',
  date: 'text-base text-neutral-600',
  datepickerLogo: 'w-6 h-6 opacity-40',
  datepickerContainer: Platform.OS === 'android' ? 'shadow' : 'z-[9999]',
  datepicker:
    'absolute top-1 p-4 bg-white border rounded-lg shadow border-neutral-200 w-full',
  header: 'flex-row justify-between items-center mb-2',
  monthAndYearContainer: 'flex-row items-center space-x-1',
  month: 'text-lg font-bold text-gray-800',
  year: 'text-lg font-normal text-gray-600',
  leftAndRighArrow: 'w-7 h-7 opacity-30',
  week: 'flex-row',
  day: `flex-1 justify-center items-center px-0.5`,
  dayName: 'text-sm font-medium text-center text-gray-800',
  dayContainer: 'flex-1 items-center justify-center',
  dateContainer: 'rounded-full h-8 w-8 items-center justify-center',
  dayText: 'text-sm leading-none text-center text-gray-600',
};

export default DatePicker;
