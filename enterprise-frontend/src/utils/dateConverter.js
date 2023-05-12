export const dateConverter = (Time) => {
  if (Time === undefined) {
  } else {
    var date = new Date(Time);
    var time = date.toString().split(" ")[4];
    var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
    var exactminutes = minutes.split(":")[0];
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    exactminutes = exactminutes < 10 ? exactminutes : exactminutes;
    var strTime = hours + ":" + exactminutes + " " + ampm;
    return (
      date.toString().split(" ")[0] +
      " " +
      date.toString().split(" ")[1] +
      " " +
      date.toString().split(" ")[2] +
      " " +
      date.toString().split(" ")[3] +
      " " +
      strTime
    );
  }
};