import axios from 'axios';

export interface MenuOptionsRes {
  menuNo: string;
  menuName: string;
  children: MenuOptionsRes[];
}

export interface Menu {
  path: string;
  name: string;
  menuName: string;
  icon: string;
  parentNo: string;
  sort: number;
}
export function getMenuOptions(params: { name: string }) {
  return axios.get<MenuOptionsRes[]>('/api/menu/tree/options', { params });
}

export function editMenu(data: Menu) {
  return axios.post('/api/menu/edit', { ...data });
}
