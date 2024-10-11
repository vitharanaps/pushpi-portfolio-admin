import Image from "next/image";

const CategoryCard = ({ type , img, count }: { type: string , img: string  , count: number}) => {
    console.log(img)
  return (
    <div className="rounded-2xl  p-4 flex-1 min-w-[130px] bg-white shadow-lg  ">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024
        </span>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4 text-center">{count}</h1>
      <div className="flex justify-between items-center">
        <Image src={img} alt="category" width={25} height={25} />
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
