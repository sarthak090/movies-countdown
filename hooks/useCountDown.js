import { useEffect, useState } from "react";
import moment from "moment";
export default function useCountDown(initalTime) {
  const [coundownText, setCountDownText] = useState("");
  const [showReleaseDate, setShowReleaseDate] = useState(true);
  const getCountDown = (rDate) => {
    let eventTime, duration, interval, intervalId;
    interval = 1000;
    eventTime = moment(rDate, "YYYY-MM-DD");
    duration = moment.duration(eventTime.diff(moment()));
    let myInterval = setInterval(() => {
      duration = moment.duration(duration - interval, "milliseconds");

      if (duration.asSeconds() <= 0) {
        clearInterval(myInterval);
        setShowReleaseDate(false);
      } else {
        let minutes =
          duration.minutes() == 0 ? `` : `${duration.minutes()} min `;

        setCountDownText(
          parseInt(duration.asDays()) +
            " days " +
            duration.hours() +
            " hours " +
            minutes +
            " " +
            duration.seconds() +
            " sec"
        );
      }
    }, interval);
    return () => {
      clearInterval(myInterval);
    };
  };
  useEffect(() => {
    getCountDown(initalTime);
  }, []);
  return {
    coundownText,
    showReleaseDate,
  };
}
