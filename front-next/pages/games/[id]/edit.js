import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import GameService from "../../../src/services/GameService";
import GenreService from "../../../src/services/GenreService";
import FormField from "../../../src/components/FormField";
import FormFieldSelect from "../../../src/components/FormFieldSelect";
import FormFieldDate from "../../../src/components/FormFieldDate";
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
  width: 50%;

  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 1%;
  margin: 1%;
  cursor: pointer;
  background-color: #265611;
  border: 0;
  height: 50px;
  border-radius: 8px;
  color: #e0e0e0;
`;

function EditGame() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);
  const [genres, setGenres] = useState([]);

  const genresOptions = genres && genres.map((x) => {
    return (
      <option key={x.id} value={x.id}>
        {x.title}
      </option>
    );
  })

  useEffect(() => {
    GameService.getById(id).then((data) => {
      setGame(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateGame = (game) => {
    GameService.update(id, game).then((data) => {
      router.push(ROUTES.games.list)
      toast.success(`Game successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating game: ${e.message}`)
    })
  }

  useEffect(() => {
    GenreService.getAll().then((data) => setGenres(data));
  }, []);

  console.log(game)

  if (!game || !genres.length) return `Carregando...`

  console.log(genres)

  return (
    <Wrapper>
      <p>Página de Edição do game: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.genres.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <Form onSubmit={handleSubmit((data) => updateGame(data))}>
        <FormField label='Title' name='title' register={register} error={errors.title} defaultValue={game.title} />

        <FormFieldSelect label='Genre' name='genre_id' firstValue='Select Genre' register={register} options={genresOptions} error={errors.genre_id} defaultValue={game.genre_id}/>

        <FormFieldDate label={'Data de Lançamento'} name={'releaseDate'} register={register} error={errors.releaseDate} defaultValue={game.releaseDate} /> 

        <Button type="submit">Salvar Edição</Button>
      </Form>
    </Wrapper>
  );
}

export default EditGame;
