/*

This is an child controller of taskView controller.
   So it will inherit all the data view 
It will work as showing edit input when clicked on edit through editSingle()

Also later it will Format the data through formatData()






*/


Meteor.startup(function() {

    angular.module("task").controller("viewEdit", ['$scope', '$stateParams', '$meteor',

        function($scope, $stateParams, $meteor) {
            $scope.today = moment.utc().format("YYYY-MM-DD"); //it will set the min date input


            $scope.editSingle = function($event, editItem, id) {
                parentTask = $("#task_show_" + id); // getting the main parent div for each li
                findRandId = parentTask.attr("data-tag");
                resultDiv = parentTask.find('.result');
                parentTask.addClass('editRunnig');
                dataP = parentTask.find("." + editItem); // getiing the P where data is displaying Edititem can be name,des,date etc
                dataPtext = dataP.text(); // get the inner text of the element 

                //set the input value from dataPtex
                dataP.parent(".dataHouse").find("input").removeClass('hide').next("button").removeClass('hide'); //set the input value and show the input and button

            }

            $scope.editProcess = function($event, EditData, dataType, taskId) {

                FindEditDic = $(".editRunnig"); //get the main editing folder
                findEditItem = FindEditDic.find('.' + dataType); //find wht is editing like name,descr,date,time and find tht div
                getResultSpan = FindEditDic.find('.result'); //Find the result div where result will published
                FindEditDic.find(".editInput").addClass('hide'); //hide the input and button again
                FindEditDic.find(".editButton").addClass('hide');
                console.log(findEditItem.attr("data-old"));

                if (EditData == undefined && dataType == "dateTime") {
                    EditData = {};
                    dateTime = $(findEditItem).attr("data-old");
                    spilt = dateTime.split(" "); //divide the date and time into two arry
                    spiltDate = spilt[0].split("-"); //will spilt the date and make a new arry
                    changeFromat = spiltDate[1] + "-" + spiltDate[0] + "-" + spiltDate[2];
                    changeTime = changeFromat + " " + spilt[1];
                    EditData.date = new Date(changeFromat);
                    EditData.time = new Date(changeTime);
                    console.log(EditData);


                } else
                    EditData = EditData == undefined ? findEditItem.attr("data-old") : EditData;
                console.log(EditData);


                formatData = function(taskData, dataType) {

                    processedData = {}; //it will save all the data formatted



                    if (dataType == "dateTime") {
                        //we borrow this function from parent controller task view which will fortmat
                        //date to save data
                        processedData = formatDate(taskData.date, taskData.time);


                    } else {
                        // Else the data will come row as name,description so no need to format. just send
                        processedData[dataType] = taskData;

                    }
                    console.log("data processing active through FormatData() in viewEdit controller in line 54" + processedData);
                    return processedData;
                }

                dataFormated = formatData(EditData, dataType)

                saveEditItem = function() {
                    console.log(EditData + dataType + findRandId);

                    getData = $meteor.call("editUpdate", dataType, findRandId, dataFormated)
                        .then(function(data) {
                            console.log(data);

                            if (data != 0) {
                                resultDiv.text("Task Updated Successfully");
                            }
                            console.log(data);
                            return data;

                        }, function(err) {
                            resultDiv.text("Updated failed.Try later");
                            console.log('failed', err.reason);
                        });
                    setTimeout(function() {
                        resultDiv.text("");
                    }, 10000)
                }
                saveEditItem();
            }
        }

    ])
});