Meteor.startup(function() {
        Meteor.methods({
                relTime: function(date, time) {

                    date = date.split("-");
                    formattedDate = new Date(date[2] + "-" + date[1] + "-" + date[0] + " " + time);

                    x = moment(new Date());
                    tasktime = moment(formattedDate);

                    readableDate = moment(formattedDate).format("dddd, MMM Do YY, h:mm a");

                    isPast = moment(formattedDate).isBefore();


                    if (!isPast) {
                        single = tasktime.diff(x, "day") + " Days remaining";

                        if (parseInt(single) == 0 || parseInt(single) == NaN || parseInt(single) == undefined)
                            single = tasktime.diff(x, "hours") + " hours remaining"
                        if (parseInt(single) == 0 || parseInt(single) == NaN || parseInt(single) == undefined)
                            single = tasktime.diff(x, "minute") + " minute remaining";
                        console.log(parseInt(single));

                    } else
                        single = "time past"

                    return readableDate + " " + single;
                }

            })

})