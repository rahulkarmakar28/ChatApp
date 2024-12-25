import React from 'react';
import { formatDate } from '../../../utils/dateUtils';


const DateDivider = ({ date }) => {
  return (
    <div className="text-center text-gray-500 my-2">
      {formatDate(date, 'LL')}
    </div>
  );
};

export default DateDivider;