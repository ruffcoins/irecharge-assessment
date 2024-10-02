import moment from "moment";

  const currentHour = moment.utc().hour();
  export const greeting = currentHour >= 5 && currentHour < 12 ? 'morning' : currentHour >= 12 && currentHour < 18 ? 'afternoon' : 'evening';