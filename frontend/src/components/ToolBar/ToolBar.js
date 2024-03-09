import React from 'react'
import styles from './styles.module.css'



export const ToolBar = ({ filters, onSelectFilter }) => {

    const handelClick = (filter) => {
        onSelectFilter(filter)
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
                    return (
                        <li key={filter}
                            className={styles.filterElement}
                            onClick={() => handelClick(filter)}
                        > {upperCase(filter)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}