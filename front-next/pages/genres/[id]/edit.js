import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import GenreService from "../../../src/services/GenreService";
import FormField from "../../../src/components/FormField";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

function EditGenre() {
  const router = useRouter();

  let schema = yup.object().shape({
    title: yup.string().required('Nome requerido'),
  });

  const { id } = router.query;
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    GenreService.getById(id).then((data) => {
      setGenre(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const updateGenre = (genre) => {
    GenreService.update(id, genre).then((data) => {
      router.push(ROUTES.genres.list)
      toast.success(`Genre successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating genre: ${e.message}`)
    })
  }

  if (!genre) return `Carregando...`

  console.log(genre)

  return (
    <Wrapper>
      <p>Página de Edição do Gênero: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.genres.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <Form onSubmit={handleSubmit((data) => updateGenre(data))}>
        <FormField label='Name' name='title' register={register} error={ errors.title?.message} setValueFormState={setValue} defaultValue={genre.title}/>

        <Button type="submit">Salvar Edição</Button>
      </Form>
    </Wrapper>
  );
}

export default EditGenre;
