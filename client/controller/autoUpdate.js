    Meteor.startup(function() {

        angular.module("task").controller("autoUpdate", ['$scope', '$stateParams', '$meteor',
            function($scope, $stateParams, $meteor) {

                setSorting = function(context, time) {
                    context.addClass('all');//cuz al
                    taskTime = moment(parseInt(time));
                    //console.log(taskTime);
                    now = moment();
                    isPast = taskTime.isBefore(now);
                    context.removeClass('past', "isToday", "isInweek");
                    isPast == true ? $(context).addClass('isPast') : context.removeClass('past');
                    nextDay = now.endOf("d");
                    //console.log(nextDay);
                    isToday = taskTime.isBefore(nextDay);
                    isToday == true ? $(context).addClass('isToday') : context.removeClass('isToday');
                    nextWeek = now.add(1, "w"); //adding a week to current time
                    isInweek = taskTime.isBefore(nextWeek);
                    isInweek == true ? $(context).addClass('isInweek') : context.removeClass('isInweek');
                     //console.log("task is today: "+isToday+ "  task in week: "+isInweek +"  task is past: "+isPast);

                }




                autoUpdate = function() {

                    main = $(".upcomingTask")
                    allLI = main.find('.taskLi');

                    //for each task Li configure the autoUpdate
                    allLI.each(function(index, el) {
                        thisLi = $(this);
                        theMainView = thisLi.find(".viewData");
                        getThetag = theMainView.attr("data-tag"); // the time parse for task finished
                        //Based on the time we will see is the task past and can hide or delete it 
                        if (moment(parseInt(getThetag)).isBefore()) {
                            resultHidingDeleting = [];
                            if (globalSet.hidePastTask)
                                return thisLi.addClass('hiddenTask').hide();
                            if (globalSet.deletPastTask)
                                return thisLi.remove();

                        }
                        
                        setSorting(thisLi,getThetag);

                        timeHouse = theMainView.find('.timeHouse');
                        pDateTime = timeHouse.find('p.dateTime');

                        getData = $meteor.call("autoUpdate", getThetag, getThetag)
                            .then(function(data) {
                                console.log("auto Updating running well")
                                return data;

                            }, function(err) {
                                // Handle error
                                console.log('failed', err);
                            });

                    });
                }




                setInterval(function() {
                    autoUpdate()

                    // method to be executed;
                }, 60000);

            }
        ]);
    })
