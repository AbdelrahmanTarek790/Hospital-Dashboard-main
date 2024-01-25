import DoughnutChart from "./DoughnutChart";
import GaugeChart from "./GaugeChart";

function Charts() {
  return (
    <div className="py-6 px-8 flex flex-col gap-6 items-center lg:flex-row-reverse bg-[#f8f9fa] lg:items-stretch lg:justify-between">
      <DoughnutChart />
      <GaugeChart title={"تانك السولار"} />
      <GaugeChart title={"تانك الاكسجين"}/>
    </div>
  );
}

export default Charts;
