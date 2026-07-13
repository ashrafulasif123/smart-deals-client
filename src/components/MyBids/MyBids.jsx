import { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../Header/Header";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids/?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBids(data);
        });
    }
  }, [user?.email]);

  /* const handleRemoveBid = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/bids/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have Successfully Deleted This bid",
            showConfirmButton: false,
            timer: 2000,
          });
          const remainingBids = bids.filter((bid) => bid?._id !== id);
          setBids(remainingBids);
        }
      });
  }; */
  const handleRemoveBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid?._id !== id);
              setBids(remainingBids);
            } else {
              console.log(data);
            }
          });
      }
    });
  };
  return (
    <div>
      <Header title="My Bids:" highlight={bids?.length}></Header>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map((bid, index) => {
              return (
                <tr key={bid?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid?.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid?.buyer_email}
                    <br />
                  </td>
                  <td>{bid?.bid_price}</td>
                  <td>
                    <div
                      className={`badge badge-${
                        bid?.status === "pending" ? "warning" : "success"
                      }`}
                    >
                      {bid?.status}
                    </div>
                  </td>
                  <th>
                    <button
                      onClick={() => handleRemoveBid(bid?._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Remove Bid
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
