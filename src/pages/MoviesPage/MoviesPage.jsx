


import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../../components/movieSearch-api";
import css from "./MoviesPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

export default function MoviesPage() {
  const [dataMovies, setDataMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get("name") ?? "";

  const handleSubmit = async (query) => {
    setQuery(query);
    setTotalPages(0);
    setDataMovies([]);
    setPage(1);
    setError(false);
    setSearchParams({ name: query });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (inputValue === "") return;

    async function getMovies() {
      try {
        setLoading(true);
        const data = await searchMovies(inputValue, page);
        setDataMovies((prevDataMovies) => [...prevDataMovies, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [page, inputValue]);

  return (
    <>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === "") {
            toast.error("Please enter data to search.", {
              autoClose: 1500,
            });
            return;
          }
          handleSubmit(values.query);
          actions.resetForm();
        }}
      >
        {({ values }) => (
          <Form className={css.form}>
            <Field
              className={css.fieldInput}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search movie"
            />
            <button className={css.btnSearch} type="submit">
              Search
            </button>
            {inputValue.trim() === "" && <Toaster />}
          </Form>
        )}
      </Formik>

      {error ? (
        <ErrorMessage />
      ) : (
        <MovieList movies={dataMovies} />
      )}
      {loading && <Loader />}
      {dataMovies.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
    </>
  );
}








