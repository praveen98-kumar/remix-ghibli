import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/react/routeModules";
import { Film, getFilms } from "~/api/films";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Films | Studio Ghibli",
  viewport: "width=device-width,initial-scale=1",
  description: "List of films",
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center mb-4">
        Studio Ghibli Films
      </h1>

      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search{" "}
          <input
            type={"text"}
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 ml-2 text-white py-2 px-4 rounded shadow-lg"
        >
          Search
        </button>
      </Form>
      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            to={film.id}
            key={film.id}
            title={film.title}
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer transition duration-300 ease-in-out"
            prefetch="intent"
          >
            <p>{film.title}</p>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
