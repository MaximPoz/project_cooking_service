import style from "./style.module.css";


export const FootBar = () => {
    return(
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <div className={style.menu}>
                    <ul>
                        <li>О нас</li>
                        <li>Контакты</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
