import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import GenreService from "../../../src/services/GenreService";

function ShowGenre() {
  const router = useRouter()
  const { id } = router.query

  const [genre, setGenre] = useState(null);

  useEffect(() => {
    GenreService.getById(id).then((data) => {
      setGenre(data)
    })
  }, [id])

  if (!genre) return `Carregando...`

  return (
    <>
      <p>Exibindo o Gênero: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.genres.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{genre.id}</dd>

        <dt>Name</dt>
        <dd>{genre.title}</dd>

        <dt>Created At</dt>
        <dd>{genre.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowGenre;