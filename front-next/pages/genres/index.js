import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import GenreService from "../../src/services/GenreService";
import { Container } from "@mui/system";

function GenresList() {
  const { router } = useRouter();
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteGenre = (article) => {
    var accepted = confirm(`Você realmente gostaria de deletar o artigo: ${article.title}`);
    if (!accepted) return;

    setIsLoading(true);
    GenreService.destroy(article.id)
      .then((data) => {
        getGames().then(() => {
          setIsLoading(false);
          toast.success("Game destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying genre: ${e.message}`);
      });
  };

  const getGames = async () => {
    let data = await GenreService.getAll();
    console.log(data);
    setGenres(data);
  };

  useEffect(() => {
    getGames().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
            <Typography variant="h4">Genres List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.genres.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New Genre
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre) => {
                return (
                  <tr key={genre.id}>
                    <td>{genre.id}</td>
                    <td>{genre.title}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.genres.show,
                          query: {
                            id: genre.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.genres.edit,
                          query: {
                            id: genre.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteGenre(genre)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GenresList;
