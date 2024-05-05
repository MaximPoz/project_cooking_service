import React, { useState } from "react";
import styles from "./styles.module.css";
import {
  ImCircleRight,
  ImCircleLeft,
  ImCoinDollar,
  ImHome3,
} from "react-icons/im";

const renamedFilters = {
  All: "Все",
  rooms: "Комнаты",
  apartments: "Апартаменты",
  hotel: "Отель",
};

export const ToolBar = ({ filters, setFilters, applyFilters }) => {
  const[isOpen, setIsOpen] = useState(true)
  const { selected, minPrice, maxPrice, minArea, maxArea } = filters;

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const handleClick = (filter) => {
    setFilters({
      ...filters,
      selected: filter
    });
  };

  // const handleApplyFilters = () => {
  //   applyFilters();
  // };

  const handleTogglePanel = () => {
    setFilters({
      ...filters,
      isOpen: !filters.isOpen
    });
  };

  const upperCase = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "Loading...";
  };

  return (
    <div className={`${styles.toolbar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.btnOpen} onClick={handleTogglePanel}>
        {isOpen ? <ImCircleLeft /> : <ImCircleRight />}
      </button>
      <ul className={styles.filter}>
        {Object.keys(renamedFilters).map((filter) => {
          const displayName = renamedFilters[filter];
          return (
            <li
              key={filter}
              className={`${styles.filterElement} ${selected === filter ? styles.active : ""}`}
              onClick={() => handleClick(filter)}
            >
              {upperCase(displayName)}
            </li>
          );
        })}
      </ul>
      <div className={styles.priceFilter}>
        <div className={styles.titleFilter}>
          <ImCoinDollar /> Цена
        </div>
        <input
          className={styles.input}
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
        />
      </div>
      <div className={styles.priceFilter}>
        <div className={styles.titleFilter}>
          <ImHome3 /> Площадь
        </div>
        <input
          className={styles.input}
          type="number"
          placeholder="Min"
          value={minArea}
          onChange={(e) => handleFilterChange("minArea", e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Max"
          value={maxArea}
          onChange={(e) => handleFilterChange("maxArea", e.target.value)}
        />
      </div>
    </div>
  );
};

