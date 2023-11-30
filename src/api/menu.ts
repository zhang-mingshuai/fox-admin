import axios from 'axios';

export interface MenuOptionsRes {
  menuNo: string;
  menuName: string;
}
export function getMenuOptions(params: { name: string }) {
  return axios.get<MenuOptionsRes[]>('/api/menu/options', { params });
}
