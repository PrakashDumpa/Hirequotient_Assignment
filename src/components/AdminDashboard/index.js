import React, { useEffect } from "react";
import "./index.css";
import { useState } from "react";
import TableRows from "../TableRows";

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);
  let [userShowList, setUserShowList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeUser, setActiveUser] = useState({});
  const [checkboxList, setCheckboxList] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const getUserList = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserShowList(data.slice(0, 10));
        setUserList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleSearchButton = (e) => {
    setActivePage(1);
    e.preventDefault();
    let searchList = userList.filter(
      (each) =>
        each.name.toLowerCase().includes(searchInput) ||
        each.email.toLowerCase().includes(searchInput) ||
        each.role.toLowerCase().includes(searchInput)
    );
    setUserShowList(searchList.slice(0, 10));
    setUserList(searchList);
    setSearchInput("");
  };

  const handleDeletebutton = (id) => {
    let updatedList = userShowList.filter((each) => each.id !== id);
    setCheckboxList(checkboxList.filter((e) => e !== id));
    console.log("++++++++++++++++++++", updatedList);
    setUserShowList(updatedList);
  };

  const handleEditButton = (id) => {
    setActiveUser(userShowList.filter((each) => each.id === id)[0]);
    let updatedList = userShowList.map((e) => {
      if (id === e.id) {
        return { ...e, isEdit: true };
      }
      return { ...e, isEdit: false };
    });
    setUserShowList(updatedList);
  };

  const handleSaveButton = (obj) => {
    let updatedList = userShowList.map((e) => {
      if (obj.id === e.id) {
        return { ...obj, isEdit: false };
      }
      return e;
    });
    setUserShowList(updatedList);
  };

  const handleMultipleDeleteButton = () => {
    setUserShowList(userShowList.filter((e) => !checkboxList.includes(e.id)));
  };

  const handleMultipleCheckbox = (id) => {
    if (!checkboxList.includes(id)) {
      setCheckboxList([...checkboxList, id]);
    } else {
      setCheckboxList(checkboxList.filter((i) => i !== id));
    }
  };

  let totalPages = Math.ceil(userList.length / 10);
  let totalArrayPages = [...Array(totalPages).keys()].map((i) => i + 1);

  const onClickPageNationButton = (event) => {
    setActivePage(parseInt(event.target.value));
  };

  useEffect(() => {
    let startIndex = activePage * 10 - 10;
    let endIndex = startIndex + 10;
    setUserShowList(userList.slice(startIndex, endIndex));
    console.log("------------------", userShowList, startIndex, endIndex);
  }, [activePage]);

  console.log("activePage", activePage);
  return (
    <div className="p-5 d-flex flex-column">
      <div className="h-50 w-100 d-flex justify-content-between align-items-center">
        <form className="w-25 form_container" onSubmit={handleSearchButton}>
          <input
            type="search"
            placeholder="Enter Value..."
            className="search_input rounded text-lg "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-3">
            <i className=" fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleMultipleDeleteButton}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
      <div className="table_body">
        <table className="table mt-5 ">
          <thead className="">
            <tr>
              <th>
                <input type="checkbox" className="" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {userShowList.map((e) => (
              <TableRows
                styles={checkboxList.includes(e.id) ? "bg_color" : ""}
                key={e.id}
                row={e}
                handleDeleteButton={handleDeletebutton}
                handleEditButton={handleEditButton}
                handleSaveButton={handleSaveButton}
                activeUser={activeUser}
                handleMultipleCheckbox={handleMultipleCheckbox}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex align-items-center justify-content-end">
        <p className="mr-5">
          Pages {totalArrayPages[0]} to{" "}
          {totalArrayPages[totalArrayPages.length - 1]}
        </p>
        <ul className="d-flex list-unstyled justify-content-end">
          <li className="mr-2">
            <button
              type="button"
              className="rounded"
              onClick={() =>
                setActivePage((prev) => {
                  if (prev <= 1) {
                    return prev;
                  }
                  return prev - 1;
                })
              }
            >
              Previous
            </button>
          </li>
          {totalArrayPages.map((e) => (
            <li key={e} className="mr-2">
              <button
                value={e}
                type="button"
                className="rounded"
                onClick={onClickPageNationButton}
              >
                {e}
              </button>
            </li>
          ))}
          <li className="ml-2">
            <button
              className="rounded"
              onClick={() =>
                setActivePage((prev) => {
                  if (prev >= totalArrayPages.length) {
                    return prev;
                  }
                  return prev + 1;
                })
              }
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
