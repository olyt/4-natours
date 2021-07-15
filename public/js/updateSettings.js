/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const route = type === 'password' ? 'updatePassword' : 'updateMe';
    const res = await axios.patch(`/api/v1/users/${route}`, data);

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};
