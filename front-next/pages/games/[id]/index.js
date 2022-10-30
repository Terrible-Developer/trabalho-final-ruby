import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import GameService from "../../../src/services/GameService";

function ShowArticle() {
  const router = useRouter()
  const { id } = router.query

  const [game, setGame] = useState(null);

  useEffect(() => {
    GameService.getById(id).then((data) => {
      setGame(data)
    })
  }, [id])

  if (!game) return `Carregando...`

  return (
    <>
      <p>Exibindo o game: {id}</p>

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
        <dd>{game.id}</dd>

        <dt>Title</dt>
        <dd>{game.title}</dd>

        <dt>Genre</dt>
        <dd>{game.genre.name}</dd>

        <dt>Data de Lançamento</dt>
        <dd>{game.releaseDate}</dd>

        <dt>Created At</dt>
        <dd>{game.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowArticle;