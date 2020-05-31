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

export async function style(data) {
  return request(
    `/api/photo/style`,
    {
      method: 'POST',
      data
    }
  )
}

export async function similarity() {
  return request(`/api/photo/similarity`)
}

export async function delSimilarity(data) {
  return request('/api/photo/similarity/delete',
    {
      method: 'POST',
      data
    })
}

export async function fetchBlurredPhotos() {
  return request('/api/photo/blurry')
}

export async function unmarkBlurred(data) {
  return request('/api/photo/blurry/unmark',
    {
      method: 'POST',
      data
    })
}
