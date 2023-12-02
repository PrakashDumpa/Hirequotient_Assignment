import React, { useEffect, useState } from "react";

const TableRows = ({
  row,
  handleEditButton,
  handleDeleteButton,
  activeUser,
  handleSaveButton,
  handleMultipleCheckbox,
  styles,
}) => {
  const [editObj, setEditObj] = useState({});

  const { id, name, email, role, isEdit } = row;
  // console.log("active=============", activeUser);

  useEffect(() => {
    setEditObj(activeUser);
  }, [activeUser]);

  const onClickEditButton = () => {
    handleEditButton(id);
  };

  const onClickDeleteButton = () => {
    handleDeleteButton(id);
  };

  const onClickSaveButton = () => {
    // console.log(",,,,,,,,,,,,,,,,,,", editObj);
    handleSaveButton(editObj);
  };

  const handleCheckBox = (e) => {
    handleMultipleCheckbox(e.target.id);
  };

  // console.log("editObj", checkboxList);

  return (
    <>
      {isEdit ? (
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              value={editObj.name}
              onChange={(e) => setEditObj({ ...editObj, name: e.target.value })}
            />
          </td>
          <td>
            <input
              type="email"
              value={editObj.email}
              onChange={(e) =>
                setEditObj({ ...editObj, email: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editObj.role}
              onChange={(e) => setEditObj({ ...editObj, role: e.target.value })}
            />
          </td>
          <td className="">
            <button
              type="button"
              className="bg-success px-4 py-1 rounded text-light border-0"
              onClick={onClickSaveButton}
            >
              Save
            </button>
          </td>
        </tr>
      ) : (
        <tr className={styles}>
          <td>
            <input
              checked={styles ? true : false}
              id={id}
              type="checkbox"
              className=""
              onChange={handleCheckBox}
            />
          </td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
          <td className="">
            <button
              type="button"
              className="mr-3 border-0"
              onClick={onClickEditButton}
            >
              <i className="fa-regular fa-pen-to-square text-primary"></i>
            </button>
            <button
              type="button"
              className="mr-2 border-0"
              onClick={onClickDeleteButton}
            >
              <i className="fa-regular fa-trash-can text-danger"></i>
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRows;
