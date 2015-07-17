Meteor.startup(function() {
    angular.module("task").controller("countDown", ['$scope', '$stateParams', '$meteor',


        function($scope, $stateParams, $meteor) {
       



            countHouse = $('.showCountdown');
            spinner=countHouse.prev(".spinner");
            xy = countHouse.find(".countTaskName").removeClass('active');

            $scope.rollOver = function($index, $first, $last, $middle) {

                $(xy[$index]).removeClass('active');
                $index = $first == true ? 1 : $index;
                $index = $last == true ? 0 : $index;
                if ($middle) {
                    ++$index;
                }
                $(xy[$index]).addClass('active');

                // xy.hide();
                //xy[$index].show();


            }

            setTimeout(function() {

                interval = 1000;

                setInterval(function() {

                    xy = countHouse.find(".count").not('.hiddenTask');
                    if (!$(xy).hasClass('active')) {
                        xy.first().addClass('active');

                    }
                    xy.each(function(i, el) {

                        count = $(this);
                        taskName = $(this).children(".countTaskName");
                        parse = taskName.attr("data-parse");

                        if (parse) {
                            diff = parseInt(parse) - Date.parse(new Date());
                            x=[];
                            x.push(diff);
                            console.log(x);
                            taskName.attr("data-parse", diff);
                            var duration = moment.duration(diff, 'milliseconds');
                            count.attr("data-diff", duration);
                            taskName.removeAttr('data-parse');
                        }

                        duration = count.attr("data-diff");
                        duration = moment.duration(duration - interval, 'milliseconds');
                        count.attr("data-diff", duration);
                        count.children('.dayCount').text(duration.days() + "D");
                        count.children('.hrCount').text(duration.hours() + "H");
                        count.children('.minCount').text(duration.minutes() + "M");
                        count.children('.secCount').text(duration.seconds() + "S");
                        spinner.hide();


                        // count.text(text);
                    });

                }, interval);;


            }, 2000)


            //dataParse=document.getElementsByClassName("countTaskName");

            //dataParse=$(dataParse);
            // dataParse=angular.element(countHouse.find('h5.countTaskName'));









            /*

                for (var i = AllTask.length - 1; i >= 0; i--) {

                    endTime = AllTask[i]["timeParse"];
                    var countHouse = $('.showCountdown');
                    var eventTime = parseInt(endTime); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
                    var currentTime = Date.parse(new Date()); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
                    var diffTime = eventTime - currentTime;
                    var duration = moment.duration(diffTime, 'milliseconds');
                    var interval = 10000;

                    countHouse.find('.count:first').clone().attr("data-diff", diffTime)
                        .appendTo(countHouse).find(".countTaskName").text(AllTask[i]["name"]);

                  
                };

                singleCount = countHouse.find('.count');
                singleCount[0].remove();

                setInterval(function() {

                    for (var i = singleCount.length - 1; i >= 0; i--) {
                        count = $(singleCount[i]);

                        i==1? count.show(): count.hide();
                        duration = count.attr("data-diff");
                        duration = moment.duration(duration - interval, 'milliseconds');
                        count.attr("data-diff", duration);
                        count.children('.dayCount').text(duration.days() + "D");
                        count.children('.hrCount').text(duration.hours() + "H");
                        count.children('.minCount').text(duration.minutes() + "M");
                        count.children('.secCount').text(duration.seconds() + "S");

                        // count.text(text);
                    }
                }, interval);;
                
                            });
*/



        }

    ]);
})