Meteor.startup(function() {


    angular.module("task").controller("addTask", ['$scope', '$stateParams', '$meteor',

        function($scope, $stateParams, $meteor) {

            /* this will be global function which will format the date from the user input
@return an object 
@dependent date and time from input
@controller dependant addtask and viewEdit
*/
            formatDate = function(date, time) {
                dateTime = {};

                date = new Date(date);
                timex = new Date(time);

                monthFwd = date.getMonth() + 1;
                //we need 1 based month so 
                dateTime.date = date.getDate() + "-" + monthFwd + "-" + date.getFullYear();
                //time parse work as o based month so unadvance

                dateTime.time = timex.getHours() + ":" + timex.getMinutes();
                dateTime.timeParse = Date.parse(new Date(date.getFullYear() + "-" + monthFwd + "-" + date.getDate()+ " " + dateTime.time));

                dateTime.offsett = date.getTimezoneOffset();
                //console.log(useAbleDate);
                //console.log(useAbleTime)
                dateTime.taskTime = new Date().getTime();

                //console.log(taskMadeTime);
                console.log(dateTime);

                return dateTime;

            }

            $scope.addNewTask = function(newTask) {



                validFormat = formatDate(newTask.date, newTask.time);

                bundle = {
                    "validFormat": validFormat,
                    "newTask": newTask,
                }

                saveNew = function() {
                    sendData = $meteor.call("insertNew", bundle).then(function(data) {

                        return data;

                    }, function(err) {
                        // Handle error
                        console.log('failed', err);
                    });

                    return sendData;
                }

                console.log(saveNew());

                //console.log(validJson);
            }
        }
    ]);
})