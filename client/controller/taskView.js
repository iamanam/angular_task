Meteor.startup(function() {

    SetClass = function(wid) {
        if (wid >= 500)
            return "col-md-7"


        else
            return "col-md-9";
    }


    $(document).ready(function() {
        $('.iconOpen').sidr({
            displace: true
        });
    });

    angular.module("task").controller("taskView", ['$scope', '$stateParams', '$meteor',
        function($scope, $stateParams, $meteor) {

            $scope.screenWidth = screen.width;
            console.log(SetClass(screen.width));
            $scope.setClass = SetClass(screen.width);

            //this function will sort
            sortTable=$(".sortTable");
            sortButton=sortTable.find('button');
            sortButton.on('click', function(event) {
                sortTask=$(".upcomingTask").find("ul");
                console.log(sortTask);

                event.preventDefault();
                sortType=$(this).attr("class");
                console.log($(this).attr("class"));
                sortTask.find('.all').hide();
                sortTask.find("."+sortType).show();
                console.log(sortTask.find("."+sortType));

                /* Act on the event */
            });

            $meteor.subscribe('tasklistSub').then(function() {
                AllTask = $meteor.collection(tasklist);
/*

                var something = (function() {
                    var executed = false;
                    return function() {
                        if (!executed) {
                            executed = true;
                            keys = ["name", "description", "date", "time", "dateCreated", "offset", "timeParse", "randomId", "displayTime", "_id"];
                            console.log(keys);
                            sortByParse = _.map(_.sortByOrder(AllTask, ["timeParse"], ['asc']), _.values);
                            withKey = [];
                            _.forEach(sortByParse, function(val) {
                                makeKey = _.zipObject(keys, val);
                                return withKey.push(makeKey);
                            });
                            $scope.tasks = withKey;
                        }
                        return;
                    };
                })();
*/

                //$scope.tasks = withKey;
                $scope.totalCount = AllTask.length;
                $scope.tasks = AllTask;




            });

            $scope.delete = function(data) {
                $meteor.call('deleteTaskWith', data).then(function(data) {
                    console.log("data");

                }, function(error) {
                    console.log(error.reason)
                });
            }



        }
    ]);

})
