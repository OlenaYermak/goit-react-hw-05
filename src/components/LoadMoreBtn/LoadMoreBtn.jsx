import style from "./LoadMoreBtn.module.css"

export default function LoadMoreBtn({ onLoadMore }) {
    return (
        
        <button className={style.loadMoreBtn} onClick={onLoadMore} type="button">Load more</button>
    )
}