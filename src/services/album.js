import request from "@/utils/request";

export async function createAlbum(params) {
  return request('/api/album/create',
    {
      method: 'POST',
      data: params
    });
}

export async function fetchUserAlbums() {
  return request('/api/album/fetchUserAlbums');
}
