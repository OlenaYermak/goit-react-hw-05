import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader"

import css from "./Layout.module.css"

export default function Layout({ children }) {
  return (
    <>
    
      <header className={css.header}> <Navigation /></header>
      <div className={css.container}>
        <Suspense fallback={<Loader/>}>
          {children}
          </Suspense>
      </div>
      </>
  );
}