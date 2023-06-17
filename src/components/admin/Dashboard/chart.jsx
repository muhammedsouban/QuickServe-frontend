import React from "react";
import Chart from "react-apexcharts";

const MainChart = ({value}) => {
    const data = {
        series: [
            {
                name: "Rupees",
                data: value,
            },
        ],
        options: {
            chart: {
                type: "area",
                height: "auto",
                toolbar: {
                    tools: {
                        download: false,
                        selection: false,
                        zoom: false,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                    },
                },
            },
            fill: {
                colors: ["#1891c3"],
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["#1891c3"],
            },

            grid: {
                show: false,
            },
            xaxis: {
                type: "month",
                categories: [
                    "Jan",
                    "feb",
                    "mar",
                    "Apr",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
            },
            yaxis: {
                show: false,
            },
        },
    };

    return (
        <div className=" bg-white rounded-md pt-5">
            <Chart options={data.options} series={data.series}  type="area" />
        </div>
    );
};

export default MainChart;
