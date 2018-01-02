/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.work.problem')
        .controller('ProblemPieChartCtrl', ProblemPieChartCtrl);

    /** @ngInject */
    function ProblemPieChartCtrl($scope, $element, layoutPaths, baConfig) {

        var dataArray = [
            {
                name: "mantis1",
                data: [
                    {
                        company: ' 浙商中拓',
                        count: 8
                    },
                    {
                        company: '江苏亚星',
                        count: 25
                    },
                    {
                        company: '传化运维',
                        count: 5
                    },
                    {
                        company: '沈阳中光',
                        count: 9
                    },
                    {
                        company: '远大铝业',
                        count: 15
                    },

                ]
            },
            {
                name: "mantis2",
                data: [
                    {
                        company: ' 浙商中拓',
                        count: 399
                    },
                    {
                        company: '江苏亚星',
                        count: 44
                    },
                    {
                        company: '传化运维',
                        count: 50
                    },
                    {
                        company: '沈阳中光',
                        count: 90
                    },
                    {
                        company: '远大铝业',
                        count: 11
                    },

                ]
            },
        ];

        function findData(array,name) {
            var data;
            array.forEach(function(value) {
                if(value.name == name){data = value.data;}
            });
            return data;
        }


        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute("id");
        var plateform = $element[0].getAttribute("title");
        var pieChart = AmCharts.makeChart(id, {
            type: 'pie',
            startDuration: 0,
            theme: 'blur',
            addClassNames: true,
            color: layoutColors.defaultText,
            labelTickColor: layoutColors.borderDark,
            legend: {
                position: 'right',
                marginRight: 100,
                autoMargins: false,
            },
            innerRadius: '30%',
            defs: {
                filter: [
                    {
                        id: 'shadow',
                        width: '200%',
                        height: '200%',
                        feOffset: {
                            result: 'offOut',
                            in: 'SourceAlpha',
                            dx: 0,
                            dy: 0
                        },
                        feGaussianBlur: {
                            result: 'blurOut',
                            in: 'offOut',
                            stdDeviation: 5
                        },
                        feBlend: {
                            in: 'SourceGraphic',
                            in2: 'blurOut',
                            mode: 'normal'
                        }
                    }
                ]
            },
            dataProvider: findData(dataArray,plateform),
            valueField: 'count',
            titleField: 'company',
            export: {
                enabled: true
            },
            creditsPosition: 'bottom-left',

            autoMargins: false,
            marginTop: 10,
            alpha: 0.8,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            pullOutRadius: 0,
            pathToImages: layoutPaths.images.amChart,
            responsive: {
                enabled: true,
                rules: [
                    // at 900px wide, we hide legend
                    {
                        maxWidth: 900,
                        overrides: {
                            legend: {
                                enabled: false
                            }
                        }
                    },

                    // at 200 px we hide value axis labels altogether
                    {
                        maxWidth: 200,
                        overrides: {
                            valueAxes: {
                                labelsEnabled: false
                            },
                            marginTop: 30,
                            marginBottom: 30,
                            marginLeft: 30,
                            marginRight: 30
                        }
                    }
                ]
            }
        });

        pieChart.addListener('init', handleInit);

        pieChart.addListener('rollOverSlice', function (e) {
            handleRollOver(e);
        });

        function handleInit() {
            pieChart.legend.addListener('rollOverItem', handleRollOver);
        }

        function handleRollOver(e) {
            var wedge = e.dataItem.wedge.node;
            wedge.parentNode.appendChild(wedge);
        }
    }

})();
