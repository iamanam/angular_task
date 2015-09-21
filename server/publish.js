Meteor.startup(function() {
    helperFunction = [];
    relTime = function(dateTime) {

        tasktime = moment(parseInt(dateTime));

        readableDate = tasktime.format("dddd, MMM Do YY, h:mm a");

            single=tasktime.fromNow();

        return readableDate + " " + single;
    }


    /*Helper function End */
    /*Now all the function here will work for insert,update and show data*/

    Meteor.publish("tasklistSub", function(options) {
        return tasklist.find({}, {
            sort: {
                timeParse: 1
            }
        }, options);
    })


    Meteor.methods({
        autoUpdate: function(taskId, data) {

            return tasklist.update({
                    randomId: parseInt(taskId)
                }, {
                    $set: {
                        displayTime: relTime(data)
                    }
                }

            )
        },
        editUpdate: function(updateType, taskId, updateData) {
            if(updateType=="dateTime"){
            timeData = {};
            timeData = updateData;
            timeData.displayTime = relTime(updateData.timeParse); 
            }

           
            //timeData[]=;
            dataTosave = updateType == "dateTime" ? timeData : updateData;
            
            x=tasklist.update({
                    randomId: parseInt(taskId)
                },{$set:dataTosave}

            )


            return x;



        }


    })

    Meteor.methods({
        insertNew: function(dataSet) {
            //return dataSet.newTask.name;

            validJson = {
                name: dataSet.newTask.name,
                description: dataSet.newTask.description,
                date: dataSet.validFormat.date,
                time: dataSet.validFormat.time,
                dateCreated: dataSet.validFormat.taskTime,
                offset: dataSet.validFormat.offsett,
                timeParse: dataSet.validFormat.timeParse,
                randomId: dataSet.validFormat.taskTime,
                displayTime: relTime(dataSet.validFormat.timeParse),
                tags:dataSet.newTask.tags,
            }
            c = tasklist.insert(validJson);
            console.log(c);
            return c;


        },
        deleteTaskWith : function(taskRandomid) {
        result = tasklist.remove({
                    randomId: parseInt(taskRandomid)
                });
        return (result);
    }
    })
})