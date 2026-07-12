import api from "./axios";

export const getArticles = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/articles?populate=*&pagination[page]=1&pagination[pageSize]=100&sort=createdAt:desc",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getArticleById = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/articles/${id}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createArticle = async (
  title: string,
  description: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/articles",
    {
      data: {
        title,
        description,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateArticle = async (
  id: string,
  title: string,
  description: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/articles/${id}`,
    {
      data: {
        title,
        description,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteArticle = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/articles/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};