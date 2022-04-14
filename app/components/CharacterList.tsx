import { NavLink } from "@remix-run/react";
import { FilmCharacter } from "~/api/films";

type CharacterListProps = {
  characters?: FilmCharacter[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="flex-1 max-w-md">
      <h3 className="text-3xl">Characters</h3>
      <ul className="flex flex-col space-y-5 my-3">
        {characters?.map((character) => (
          <li key={character.name}>
            <NavLink
              to={"characters/" + character.id}
              className={({ isActive }) =>
                `w-full hover:underline p-3 border rounded border-slate-400 inline-block ${
                  isActive
                    ? "bg-slate-200 text-black font-bold border-2"
                    : "text-blue-500"
                }`
              }
              prefetch="intent"
            >
              {character.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}