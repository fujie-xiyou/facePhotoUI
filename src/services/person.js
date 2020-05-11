import request from "@/utils/request";

export async function fetch() {
  return request('/api/face_album/fetch');
}

export async function modify(payload) {
  return request('/api/face_album/modify', {
    method: 'POST',
    data: payload
  })
}
