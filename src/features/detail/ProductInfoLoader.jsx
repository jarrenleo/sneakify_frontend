const numOfRows = new Array(12).fill(null);

export default function ProductInfoLoader() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 flex items-center ">
        <div className="h-20 w-20 rounded-full bg-muted"></div>
        <div className="flex flex-col gap-2 p-6">
          <div className="h-5 w-96 rounded-md bg-muted"></div>
          <div className="h-3.5 w-72 rounded-md bg-muted"></div>
          <div className="h-3 w-60 rounded-md bg-muted"></div>
        </div>
      </div>
      <div className="mb-8 h-[4.5rem] w-full rounded-md bg-muted"></div>
      <div className="mb-6 flex items-center justify-between">
        <div className="h-6 w-10 rounded-md bg-muted"></div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-12 rounded-full bg-muted"></div>
          <div className="h-5 w-36 rounded-full bg-muted"></div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <table className="w-1/2">
          <thead className="text-left text-sm font-semibold text-muted-foreground">
            <tr>
              <td className="py-2">Sizes</td>
              <td>Stock Levels</td>
            </tr>
          </thead>
          <tbody>
            {numOfRows.map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="h-5 w-12 rounded-full bg-muted"></div>
                </td>
                <td>
                  <div className="h-5 w-16 rounded-full bg-muted"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-8 w-14 rounded-md bg-muted"></div>
      </div>
    </div>
  );
}
