import Header from "./Header";

function Maintenance() {
  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-2 lg:m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">اضافة صيانة وقائية</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الصيانة الوقائية</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الوصف</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">المكان</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الاصل</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الاولوية</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">التوقعات</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الموقع</p>
            <input className="focus:outline-none border w-[98%] block ml-auto border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">ملاحظات</p>
            <input className="focus:outline-none border w-[98%] block ml-auto border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-6 mt-6">
          <button className="border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg">اضافة</button>
          <button className="border-[2px]  text-[#FF5656] hover:text-white hover:bg-[#FF5656] duration-300 border-[#FF5656] py-2 px-12 group rounded-lg">الغاء</button>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
