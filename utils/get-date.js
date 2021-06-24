import moment from "moment";
export const getDate = (releaseData) => {
  return moment(releaseData, "YYYY-MM-DD").format("D MMMM YYYY");
};
