import React, { useState, useEffect } from "react"
import { Chart } from "react-google-charts"

export const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
]

export const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
        title: "Total Population",
        minValue: 0,
    },
    vAxis: {
        title: "City",
    },
}

const GoogleChart = () => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        setChartData(data)
    }, [])

    return (
        <div className="flex flex-col justify-center items-center mx-auto">
            <div className="container overflow-hidden w-[100%] flex justify-center">
                <Chart chartType="ColumnChart" width="100%" height="700px" data={data} options={options} />
            </div>
        </div>
    )
}

export default GoogleChart
