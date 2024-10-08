import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchGetMyPlaylists = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/playlist/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.playlists;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCreateMyPlaylist = async (playlistName) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${VITE_API_URL}/playlist/create`,
      { name: playlistName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchDeleteMyPlaylist = async (playlistId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${VITE_API_URL}/playlist/delete/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUpdateSongsToMyPlaylist = async (playlistId, songs) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${VITE_API_URL}/playlist/change/${playlistId}`,
      { songs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUpdateNameMyPlaylist = async (playlistId, playlistName) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${VITE_API_URL}/playlist/update/${playlistId}`,
      { name: playlistName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
