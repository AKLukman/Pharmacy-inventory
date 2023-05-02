import React from "react";
import { useQuery } from "react-query";

const Sales = () => {
  const url = `http://localhost:5000/api/v1/pharmacy/sales`;

  const { data: allSales = [] } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  const sales = allSales.slice(function (a, b) {
    return b - a;
  });
  console.log(sales);
  return (
    <div>
      <h3 className="tex-3xl mb-5">All Sales</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Coditions</th>
              <th>Price</th>
              <th>Date</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {sales?.reverse().map((sale, i) => (
              <tr key={sale._id} className="hover">
                <th>{i + 1}</th>
                <td>{sale.drugName}</td>
                <td>{sale.conditions}</td>
                <td>$20</td>
                <td>{sale.date}</td>
                <td>{sale?.time?.slice(10, 20)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
