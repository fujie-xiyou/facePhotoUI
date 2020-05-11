import request from "@/utils/request";

export async function fetchByAlbum(albumID) {
  return request(`/api/photo/fetch_by_album/${albumID}`);
}

export async function fetchUserPhoto() {
  return request(`api/photo/fetch_user_photo`);
}

export async function fetchByPersonAlbum(personAlbumID) {
  return request(`/api/photo/fetch_by_face_album/${personAlbumID}`)
}

export async function del(data) {
  return request(`/api/photo/delete`,
    {
      method: 'POST',
      data,
    }
    )
}

export async function modify(data) {
  return request(
    `/api/photo/modify`,
    {
      method: 'POST',
      data
    }
  )
}
