import DoughnutChart from "./DoughnutChart";
import GaugeChart from "./GaugeChart";
import { useTranslation } from "react-i18next";

function Charts() {
  const { t } = useTranslation();
  return (
    <div className="py-6 px-8 flex flex-col gap-6 items-center lg:flex-row-reverse bg-[#f8f9fa] lg:items-stretch lg:justify-between">
      <DoughnutChart />
      <GaugeChart title={t("gas_tank")} />
      <GaugeChart title={t("oxygen_tank")}/>
    </div>
  );
}

export default Charts;
