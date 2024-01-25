import Header from "./Header";
import Select from "react-select";

function AddPlan() {
  const options = [
    { value: "option1", label: "المؤسسة 1" },
    { value: "option2", label: "المؤسسة 2" },
    { value: "option3", label: "المؤسسة 3" },
  ];

  const handleChange = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid black",
      borderRadius: "8px",
      padding: "6px",
      boxShadow: state.isFocused ? "0 0 0 2px #2868c7" : null,
      outline: "none",
      textAlign: "right",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#2868c7" : null,
      color: state.isSelected ? "#fff" : null,
      textAlign: "right",
    }),
  };

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">اضافة خطة عمل</h2>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">خطة العمل</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الوصف</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">المدة</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الحالة</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الموقع</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">المراجعة</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">نوع القالب</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">المؤسسة</p>
            <Select styles={customStyles} options={options} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-6 mb-6">
          <button className="border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg">اضافة</button>
          <button className="border-[2px] text-[#FF5656] hover:text-white hover:bg-[#FF5656] duration-300 border-[#FF5656] py-2 px-12 group rounded-lg">الغاء</button>
        </div>
      </div>
    </div>
  );
}

export default AddPlan;
