import { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../Header/Header";

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
  return (
    <div>
      <Header title="My Bids:" highlight={bids?.length}></Header>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>SL NO</th>
              <th>Buyer</th>
              <th>Buyer Email</th>
              <th>Bid Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map((bid, index) => {
              return (
                <tr key={bid?._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
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
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
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
