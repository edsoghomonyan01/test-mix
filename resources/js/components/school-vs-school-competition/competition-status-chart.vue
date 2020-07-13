<template>
    <div>
        <h4 class="text-center">% of incoming class</h4>
        <canvas id="competition_status_chart" width="400" height="200"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    // noinspection ES6UnusedImports
    import ChartDataLabels from 'chartjs-plugin-datalabels';


    export default {
        props: ['competition'],
        mounted() {

            const roundNumberUp = (num, increment) => {
                return Math.ceil(num / increment) * increment;
            }

            console.log(this.competition);

            let data = [];
            data[0] = 0;
            data[1] = 0;

            this.competition.entrants.forEach(element => {
                if(element.colloquial_slug === this.competition.colloquial_slug_one){
                   data[0]++;
               }
               if(element.colloquial_slug === this.competition.colloquial_slug_two){
                    data[1]++;
               }
            });

            let percentages = [];
            percentages[0] = Math.round( data[0] / this.competition.class_size_one * 100 * 10) / 10;
            percentages[1] = Math.round( data[1] / this.competition.class_size_two * 100 * 10) / 10;


            let ctx = document.getElementById('competition_status_chart');

            let chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [this.competition.colloquial_name_one, this.competition.colloquial_name_two],
                    datasets: [{
                        datalabels:{
                            align: 'top',
                            anchor: 'end',
                            font:{
                                size: 16
                            },
                            formatter: function(value, context){
                                return data[context.dataIndex] + ' students'
                            }
                        },
                        data: percentages,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                        ]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                max: roundNumberUp( Math.max(percentages[0], percentages[1]) + 0.5  , 0.5) ,
                                callback: function(value, index, values){
                                    return value.toFixed(1) + '% '
                                },
                                min: 0
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                drawOnChartArea: false,
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    tooltips:{
                        enabled: false
                    }
                }
            })
        }
    }
</script>
