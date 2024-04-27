import { FallingLines } from 'react-loader-spinner';

import css from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
    <FallingLines
  color="#ca563f"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
      </div>

    )
}