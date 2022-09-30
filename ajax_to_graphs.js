// Yearly User Count graph
  $.ajax({
    method: "get",
    dataType: 'JSON',
    url: "/getUserCount",
  })
    .done(function (data) {
      var userCount = [];

      data.forEach(function (entry) {
        let values = Object.values(entry);
        userCount.push(values[0]);
      });

      // Total Revenue Report Chart - Bar Chart
      // --------------------------------------------------------------------
      const basicLineChartEl = document.querySelector('#YearlyUserCount'),
        basicLineChartOptions = {
          series: [{
            name: "Users",
            data: userCount
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'User registerations by month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          }
        };


      if (typeof basicLineChartEl !== undefined && basicLineChartEl !== null) {
        const basicLineChart = new ApexCharts(basicLineChartEl, basicLineChartOptions);
        basicLineChart.render();
      }


      // let text = $('text.apexcharts-title-text').length;
      // for (let i = 0; i <= text; i++) {
      //   console.log("H", i);
      //   console.log($('text.apexcharts-title-text')[i]);
      // }

    });
