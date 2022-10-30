import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import GameService from "../../src/services/GameService";
import GenreService from "../../src/services/GenreService";
import FormField from "../../src/components/FormField";
import FormFieldSelect from "../../src/components/FormFieldSelect";
import FormFieldDate from "../../src/components/FormFieldDate";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from "styled-components";

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

function NewGame() {
  const router = useRouter()
  const [genres, setGenres] = useState([]);

  let schema = yup.object().shape({
    title: yup.string().required('Título requerido'),
    genre_id: yup.number().required('Gênero requerido').positive('Selecione um Gênero').integer(),
    releaseDate: yup.string().required('Data do Lançamento requerida'),
  });

  const genresOptions = genres && genres.map((x) => {
    return (
      <option key={x.id} value={x.id}>
        {x.title}
      </option>
    );
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const insertGame = (game) => {
    GameService.create(game).then((data) => {
      router.push(ROUTES.games.list)
      toast.success(`Game successfully created!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
    GenreService.getAll().then((data) => setGenres(data))
  }, []);

  return (
    <Wrapper>
      <p>Tela de Cadastro de Games</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.genres.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <Form onSubmit={handleSubmit((data) => insertGame(data))}>

        <FormField label='Title' name='title' register={register} error={errors.title?.message} setValueFormState={setValue} />

        <FormFieldSelect label='Genre' name='genre_id' firstValue='Select Genre' register={register} options={genresOptions} error={errors.genre_id?.message} setValueFormState={setValue} />
        
        <FormFieldDate label={'Data de Lançamento'} name='releaseDate' register={register} error={ errors.releaseDate?.message} setValueFormState={setValue} />
       
        <Button type="submit" >Cadastrar</Button>
        
      </Form>
    </Wrapper>
  );
}

export default NewGame;
