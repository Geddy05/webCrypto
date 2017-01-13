/**
 * Created by geddy on 25/11/2016.
 */

function do_request(){
    element = document.getElementById("title")
    var text = element.innerText || element.textContent;
element.innerHTML = text;
    $.ajax({
        type: 'GET',
        url: '/get_last_tick_data',
        data: { "title": text},
        dataType: 'json',
        success: function (data) {
            draw_live_ticks(data)
        }
    });
}

function twitter(){
           $.ajax({
        type: 'GET',
        url: '/twitter',
        dataType: 'json',
        success: function (data) {
            // for (var x in data) {
                 draw_live_twitter(data);
            // }
        }
    });
}

function draw_live_twitter(data) {

        var a = [];

    for (var i = 0, len = data.length; i < len; i++) {
        var tick = data[i];
        a.push({"date": tick.date,
                  "Twitter": tick.score})
    }
    console.log(a);
    AmCharts.makeChart("chart1div",
            {
              "type": "serial",
              "categoryField": "date",
              "dataDateFormat": "YYYY-MM-DD HH",
              "color": "#FFFFFF",
              "theme": "dark",
              "categoryAxis": {
                  "labelFrequency":2,
                  "minPeriod": "hh:mm",
                  "gridThickness": 0

              },
              "chartCursor": {
                "enabled": true,
                "categoryBalloonDateFormat": "JJ:NN"
              },
              "trendLines": [],
              "graphs": [
                {
                  "fillAlphas": 1,
                  "fillColors": "#90C695",
                  "id": "AmGraph-1",
                  "lineAlpha": 0,
                  "tabIndex": 0,
                  "title": "Reddit",
                  "valueField": "Reddit"
                },
                {
                  "fillAlphas": 1,
                  "fillColors": "#87D37C",
                  "id": "AmGraph-2",
                  "lineAlpha": 0,
                  "title": "Twitter",
                  "valueField": "Twitter"
                },
                {
                  "fillAlphas": 1,
                  "fillColors": "#C8F7C5",
                  "id": "AmGraph-3",
                  "lineThickness": 0,
                  "lineColor": "#C8F7C5",
                  "title": "News",
                  "valueField": "News"
                }
              ],
              "guides": [],
              "valueAxes": [
                {
                  "id": "ValueAxis-1",
                  "gridThickness": 0,
                  "stackType": "regular",
                  "tickLength": 0,
                  "title": ""
                }
              ],
              "allLabels": [],
              "balloon": {},
              "legend": {
                "enabled": true
              },
              "titles": [
                {
                  "id": "Title-1",
                  "size": 15,
                  "text": ""
                }
              ],
              "dataProvider":a
            }
          );

}

function draw_live_ticks(data) {
    var a = [];

    for (var i = 0, len = data.length; i < len; i++) {
        var tick = data[i];
        a.push({"date": tick.last_updated,
                  "Price": tick.price_usd})
    }

    AmCharts.makeChart("chart2div",
            {
              "type": "serial",
              "categoryField": "date",
              "dataDateFormat": "YYYY-MM-DD HH",
              "color": "#FFFFFF",
              "theme": "dark",
              "categoryAxis": {
                  "labelFrequency":3,
                    "minPeriod": "hh:mm",
                    //"parseDates": true,
                    "gridThickness": 0

              },
              "chartCursor": {
                "enabled": true,
                "categoryBalloonDateFormat": "JJ:NN"
              },
              "trendLines": [],
              "graphs": [

                {
                  "fillAlphas": 0.0,
                  "fillColors": "#FFFFFF",
                  "gapPeriod": 0,
                  "id": "AmGraph-4",
                  "lineColor": "#C8F7C5",
                  "lineAlpha": 1,
                  "lineThickness": 5,
                  "title": "Price",
                  "valueField": "Price"
                }
              ],
              "guides": [],
              "valueAxes": [
                {
                  "id": "ValueAxis-1",
                  "stackType": "none",
                  "tickLength": 0.1,
                  "title": "",
                  "gridThickness": 0
                }
              ],
              "allLabels": [],
              "balloon": {},
              "legend": {
                "enabled": false
              },
              "titles": [
                {
                  "id": "Title-1",
                  "size": 15,
                  "text": ""
                }
              ],
              "dataProvider": a
            }
          );
}
do_request();
twitter();