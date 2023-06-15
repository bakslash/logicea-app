import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/table";
import Loader from "../components/loader/loader";
import { getJokes } from "../services/apis";
import ReusableButton from "../components/button/button";
import { useNavigate } from 'react-router-dom';
import JokesLayout from "../layouts/layout";


type CustomTableColumn = {
  label: string;
  name: string;
  size: number;
  field: string;
  options: {
    filter: boolean;
    style?: React.CSSProperties;
    customBodyRender?: (value: any, tableMeta: any) => React.ReactNode;
  };
};

const Jokes = () => {
  const [jokes, setJokes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);

  const getAllJokes = async () => {
    setLoading(true);
    try {
      const response = await getJokes();
      if (response) {
        console.log('cjheck',response);
        
        const tempData = response.map((el: any, index: number) => ({
          jokeId: el.id,
          Author: el.Author,
          Title: el.Title,
          Views: el.Views,
          CreatedAt: formatDate(el.CreatedAt),
          action: el._id,
        }));
        setJokes(tempData);
      }
    } catch (err) {
      console.log("get courier err", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    getAllJokes();
  }, []);

  const columns: CustomTableColumn[] = [
    {
      label: "Author",
      name: "Author",
      size: 100,
      field: "Author",
      options: {
        filter: true,
      },
    },
    {
      label: "Title",
      name: "Title",
      size: 200,
      field: "Title",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const joke = jokes[tableMeta.rowIndex];
          return (
            <Link
              to={`/jokes/${joke.jokeId}`}
              state={{
                Title: joke.Title,
                Author: joke.Author,
                Created_at: joke.CreatedAt,
                Views: joke.Views
              }}
            >
              {value}
            </Link>


          );
        },
      },
    },
    {
      label: "Views",
      name: "Views",
      size: 100,
      field: "Views",
      options: {
        filter: true,
        customBodyRender: (value: any) => {
          let color = "";
          if (value >= 0 && value <= 25) {
            color = "tomato";
          } else if (value >= 26 && value <= 50) {
            color = "orange";
          } else if (value >= 51 && value <= 75) {
            color = "yellow";
          } else if (value >= 76 && value <= 100) {
            color = "green";
          }

          return <span style={{ color }}>{value}</span>;
        },
      },
    },
    {
      label: "Created At",
      name: "CreatedAt",
      size: 150,
      field: "created_at",
      options: {
        filter: true,
      },
    },
  ];
  const navigate = useNavigate();
  const handleAddjoke = () => {
    navigate('/addjoke');
  }
  const token = localStorage.getItem('token');
  return (
    <>
      {loading && <Loader loading={loading} />}
      {!loading && (
        <>

          <JokesLayout  token={token}>
            <ReusableButton
              variant="contained"
              style={{ margin: 10 }}
              size="small"
              label={"Add Joke"}
              color="success"
              onClick={handleAddjoke}  
                       >

            </ReusableButton>
            {jokes.length > 0 ? (

              <Table
              
                data={jokes}
                columns={columns}
                loading={loading}
                count={0}
                setPage={() => { }}
                page={0}
                setRowsPerPage={() => { }}
              />
            ) : (
              <p>No jokes available.</p>
            )}
          </JokesLayout>

        </>
      )}
    </>
  );
};

export default Jokes;
