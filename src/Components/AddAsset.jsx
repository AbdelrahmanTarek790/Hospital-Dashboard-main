import Header from "./Header";

function AddOperation() {
  

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">اضافة اصل</h2>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">ID (CODE)</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">المكان في المستشفى</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">نوع الجهاز</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">معلومات اضافية</p>
            <input className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col-reverse md:items-start gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الوصف</p>
            <textarea className="focus:outline-none border w-[98%] h-full block ml-auto border-black p-3 rounded-lg text-right" name="" id=""></textarea>
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">صورة ان وجدت</p>
            <input className="cursor-pointer focus:outline-none border w-[98%] ml-auto block  border-black p-3 rounded-lg text-right" type="file" />
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

export default AddOperation;
