/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.work.problem')
        .controller('ProblemBarChartCtrl', ProblemBarChartCtrl);

    /** @ngInject */
    function ProblemBarChartCtrl($scope, baConfig, $element, layoutPaths) {
        var dataArray =
            [
                {
                    name: "mantis1",
                    data: [
                        {
                            type: '未解决',
                            count: 24,
                            color: layoutColors.danger
                        },
                        {
                            country: '已解决',
                            count: 59,
                            color: layoutColors.success

                        },
                        {
                            country: '已关闭',
                            count: 11,
                            color: layoutColors.info
                        }
                    ]
                },
                {
                    name: "mantis2",
                    data: [
                        {
                            type: '未解决',
                            count: 10,
                            color: layoutColors.danger
                        },
                        {
                            country: '已解决',
                            count: 36,
                            color: layoutColors.success

                        },
                        {
                            country: '已关闭',
                            count: 7,
                            color: layoutColors.info
                        }
                    ]
                }
            ];

        function findData(array,name) {
            var data;
            array.forEach(function(value) {
                if(value.name == name){data = value.data;}
            });
            return data;
        }


        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');
        var plateform = $element[0].getAttribute("title");
        var barChart = AmCharts.makeChart(id, {
            type: 'serial',
            theme: 'blur',
            color: layoutColors.defaultText,
            dataProvider:findData(dataArray,plateform),
            valueAxes: [
                {
                    axisAlpha: 0,
                    position: 'left',
                    title: 'Visitors from country',
                    gridAlpha: 0.5,
                    gridColor: layoutColors.border,
                }
            ],
            startDuration: 1,
            graphs: [
                {
                    balloonText: '<b>[[category]]: [[value]]</b>',
                    fillColorsField: 'color',
                    fillAlphas: 0.7,
                    lineAlpha: 0.2,
                    type: 'column',
                    valueField: 'count'
                }
            ],
            chartCursor: {
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false
            },
            categoryField: 'type',
            categoryAxis: {
                gridPosition: 'start',
                labelRotation: 45,
                gridAlpha: 0.5,
                gridColor: layoutColors.border,
            },
            export: {
                enabled: true
            },
            creditsPosition: 'top-right',
            pathToImages: layoutPaths.images.amChart
        });
    }
})();
