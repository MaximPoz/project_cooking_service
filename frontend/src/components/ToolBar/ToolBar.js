import React from 'react'
import styles from './styles.module.css'



export const ToolBar = ({ filters, onSelectFilter }) => {
    const renamedFilters = {
        "All": "Все",
        "rooms": "Комнаты",
        "apartments": "Апартаменты",
        "hotel": "Отель"
    };

    const handleClick = (filter) => {
        onSelectFilter(filter);
    }

    const upperCase = (string) => {
        return string
          ? string.charAt(0).toUpperCase() + string.slice(1)
          : "Loading...";
    };

    return (
        <div className={styles.toolbar}>
            <ul className={styles.filter}>
                {filters.map((filter) => {
                    const displayName = renamedFilters[filter] || filter; // Если новое название есть, используйте его, в противном случае оставьте оригинальное
                    return (
                        <li key={filter}
                            className={styles.filterElement}
                            onClick={() => handleClick(filter)}
                        > {upperCase(displayName)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}