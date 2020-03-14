import request from "@/utils/request";

export async function fetchByAlbum(albumID) {
  return request(`/api/photo/fetch_by_album/${albumID}`);
}

export async function fetchUserPhoto() {
  return request(`api/photo/fetch_user_photo`);
}
