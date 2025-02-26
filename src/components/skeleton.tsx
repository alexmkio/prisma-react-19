export default function Skeleton() {
  return (
    <>
      <div className="mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333] animate-pulse">
          Update
        </h1>
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
          <li className="w-96 h-[391px] rounded-lg bg-gray-200 animate-pulse" />
          <li className="w-96 h-[391px] rounded-lg bg-gray-200 animate-pulse" />
          <li className="w-96 h-[391px] rounded-lg bg-gray-200 animate-pulse" />
        </ul>
      </div>
      <div className="mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333] animate-pulse">
          Delete
        </h1>
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
          <li className="w-96 h-[124px] rounded-lg bg-gray-200 animate-pulse" />
          <li className="w-96 h-[124px] rounded-lg bg-gray-200 animate-pulse" />
          <li className="w-96 h-[124px] rounded-lg bg-gray-200 animate-pulse" />
        </ul>
      </div>
    </>
  );
}
