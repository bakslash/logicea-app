export const getJokes = async (): Promise<any> => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/jokes`, {
    method: "GET",
  });

  return await res.json();
};

export const getSingleJoke = async (id: any): Promise<any> => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/jokes/${id}`, {
    method: "GET",
  });

  return await res.json();
};

export const editJoke = async (id: any, data: any): Promise<any> => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/jokes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const addJoke = async (formData: any): Promise<any> => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/jokes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return await res.json();
};

export const deleteJoke = async (id: any): Promise<any> => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/jokes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};
