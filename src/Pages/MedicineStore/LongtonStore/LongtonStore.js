import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import LongtonMedicine from "./LongtonMedicine";

const LongtonStore = () => {
  const [medicine, setMedicine] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [stock, setStock] = useState("");
  console.log(stock);

  const [search, setSearch] = useState("");
  const saerchByDrugName = search.toLocaleLowerCase();

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/pharmacy/longton-store?search=${saerchByDrugName}&page=${page}&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setMedicine(data.medicine);
      });
  }, [page, size, search]);

  const pages = Math.ceil(count / size);
  const onPageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="ml-10">
      <div className="text-center mt-11">
        <input
          type="text"
          placeholder="Search by medicine name"
          className="input input-bordered input-info w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <h2 className="text-center font-bold text-2xl mt-8 uppercase">
        Longton Medicine store
      </h2>

      <h2 className="text-center">
        {medicine.length === 0 && "No Records Found"}
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-10">
        {medicine.map((medicine) => (
          <LongtonMedicine
            medicine={medicine}
            key={medicine._id}
          ></LongtonMedicine>
        ))}
      </div>
      <div
        className="pagination"
        style={{ marginLeft: "200px", marginBottom: "50px" }}
      >
        <p className="text-center">
          Current page: {page + 1} and size: {size}
        </p>
        <p className="text-center font-bold">Set The page content</p>
        <div>
          <div className="text-center">
            <select
              className="select select-bordered  max-w-xs"
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10" selected>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div>
            <ReactPaginate
              prviousLabel="previous"
              nextLabel="next"
              pageCount={pages}
              onPageChange={onPageChange}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongtonStore;
