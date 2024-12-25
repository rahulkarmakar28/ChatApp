import moment from 'moment';

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const formatMessageTime = (timestamp) => {
  return moment(timestamp).format('hh:mm A');
};