import React,{Component, useState} from "react";

const SelectBox = ({items, setTeamlist}) => {
  const showItems = useState(false)
  const [selectedItem,setSelectedItem] = useState(items)
  const dropDown = () => {
      !prevState.showItems
  };

  const selectItem = (event) => {
    setSelectedItem(event.target.value)
    setTeamlist(event.target.value)
  };

  render() {
    return (
      {items.map((item) => {
          <div className="select-box--box">
            <div className="select-box--container">
              <div className="select-box--selected-item">
                 {item.label}
              </div>
              <div className="select-box--arrow" onClick={dropDown}>
                <span
                  className={`${
                    showItems
                      ? "select-box--arrow-up"
                      : "select-box--arrow-down"
                  }`}
                />
              </div>
              <div
                style={{ display: showItems ? "block" : "none" }}
                className={"select-box--items"}
              >
                {items.map(item => (
                  <div
                    key={item.id}
                    value={item.value}
                    onClick={(e) => selectItem(item) && setTeamlist(e.target.value)}
                    className={selectedItem === item ? "selected" : ""}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
      })}
    );
  };
}

export default SelectBox;
