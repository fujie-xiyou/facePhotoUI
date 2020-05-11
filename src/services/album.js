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

export async function del(payload) {
    return request('/api/album/delete',
        {
            method: 'POST',
            data: payload
        })
}

export async function modify(payload) {
    return request('/api/album/modify',
        {
            method: 'POST',
            data: payload
        })
}
